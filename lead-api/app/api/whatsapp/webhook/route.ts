import {NextRequest,NextResponse} from "next/server";
import {timingSafeEqual} from "node:crypto";
import {parseInbound,validSignature} from "@/lib/whatsapp";
import {transaction} from "@/lib/db";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const MAX=65536;
export async function GET(req:NextRequest){
 const secret=process.env.META_VERIFY_TOKEN||"";
 if(!secret)return NextResponse.json({error:"not_configured"},{status:503});
 const mode=req.nextUrl.searchParams.get("hub.mode");
 const token=req.nextUrl.searchParams.get("hub.verify_token");
 const challenge=req.nextUrl.searchParams.get("hub.challenge")||"";
 const equal=Boolean(token)&&Buffer.byteLength(token||"")===Buffer.byteLength(secret)&&timingSafeEqual(Buffer.from(token||""),Buffer.from(secret));
 if(mode!=="subscribe"||!equal||!/^[0-9]{1,64}$/.test(challenge))
  return new Response("Forbidden",{status:403});
 return new Response(challenge,{status:200,headers:{"content-type":"text/plain; charset=utf-8"}});
}
export async function POST(req:NextRequest){
 const appSecret=process.env.META_APP_SECRET||"";
 const businessNumberId=process.env.META_PHONE_NUMBER_ID||"";
 if(!appSecret||!businessNumberId)return NextResponse.json({error:"not_configured"},{status:503});
 const declared=Number(req.headers.get("content-length")||0);
 if(declared>MAX)return NextResponse.json({error:"payload_too_large"},{status:413});
 const raw=Buffer.from(await req.arrayBuffer());
 if(raw.length>MAX)return NextResponse.json({error:"payload_too_large"},{status:413});
 if(!validSignature(raw,req.headers.get("x-hub-signature-256"),appSecret))
  return NextResponse.json({error:"signature_invalid"},{status:403});
 let parsed:unknown;
 try{parsed=JSON.parse(raw.toString("utf8"))}catch{return NextResponse.json({error:"invalid_json"},{status:400})}
 const messages=parseInbound(parsed,businessNumberId);
 try{
  for(const m of messages)await transaction(async db=>{
   const saved=await db.query(
    "INSERT INTO whatsapp_inbound_events(message_id,sender_wa_id,kind) VALUES($1,$2,$3) ON CONFLICT(message_id) DO NOTHING RETURNING message_id",
    [m.messageId,m.waId,m.kind]);
   if(!saved.rowCount)return;
   const lead=await db.query<{id:string}>(`
     INSERT INTO leads (wa_id,name,source,destination,purpose,travel_window,tracking_reference,landing_path,message_count)
     VALUES($1,$2,'whatsapp_webhook',$3,$4,$5,$6,$7,1)
     ON CONFLICT(wa_id) DO UPDATE SET
       name=CASE WHEN leads.name='' THEN EXCLUDED.name ELSE leads.name END,
       source='whatsapp_webhook',
       destination=CASE WHEN leads.destination='' THEN EXCLUDED.destination ELSE leads.destination END,
       purpose=CASE WHEN leads.purpose='' THEN EXCLUDED.purpose ELSE leads.purpose END,
       travel_window=CASE WHEN leads.travel_window='' THEN EXCLUDED.travel_window ELSE leads.travel_window END,
       tracking_reference=CASE WHEN leads.tracking_reference='' THEN EXCLUDED.tracking_reference ELSE leads.tracking_reference END,
       landing_path=CASE WHEN leads.landing_path='' THEN EXCLUDED.landing_path ELSE leads.landing_path END,
       message_count=leads.message_count+1,
       last_contact_at=now(),updated_at=now(),version=leads.version+1
     RETURNING id
   `,[m.waId,m.name,m.destination,m.purpose,m.travelWindow,m.trackingReference,m.landingPath]);
   await db.query("UPDATE whatsapp_inbound_events SET lead_id=$1 WHERE message_id=$2",[lead.rows[0].id,m.messageId]);
   // No raw message, attachments or sensitive documents are saved.
  });
 }catch(e){
   console.error("WhatsApp webhook persistence failed",e instanceof Error?e.name:"UnknownError");
   return NextResponse.json({error:"temporarily_unavailable"},{status:503});
 }
 return NextResponse.json({received:true},{headers:{"cache-control":"no-store"}});
}
