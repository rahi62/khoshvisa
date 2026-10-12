import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,isAdmin,safeOrigin} from "@/lib/auth";
import {transaction} from "@/lib/db";
import {stages,type LeadRow,type Stage} from "@/lib/types";
export const runtime="nodejs";
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const text=(v:FormDataEntryValue|null,max:number)=>typeof v==="string"?v.replace(/[\u0000-\u001f]+/g," ").trim().slice(0,max):"";
function parseTehran(value:string):Date|null{
 if(!value)return null;
 if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))throw Error("invalid_due_date");
 // Admin form uses Tehran civil time, explicit offset avoids server timezone ambiguity.
 const date=new Date(value+"+03:30");
 if(Number.isNaN(date.getTime()))throw Error("invalid_due_date");
 return date;
}
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 if(!await isAdmin())return NextResponse.redirect(adminRedirect("/admin/login"),303);
 const {id}=await params;if(!uuid.test(id))return NextResponse.json({error:"invalid_id"},{status:400});
 const form=await req.formData();
 const stage=text(form.get("stage"),24) as Stage;
 const version=Number(form.get("version"));
 const notes=text(form.get("admin_notes"),2000);
 const consentAdd=form.get("confirm_partner_consent")==="yes";
 const referralDone=form.get("confirm_actual_referral")==="yes";
 const provider=text(form.get("partner_provider"),160);
 const scope=text(form.get("partner_scope"),240);
 const evidence=text(form.get("partner_evidence"),190);
 let due:Date|null;
 try{due=parseTehran(text(form.get("follow_up_at"),30))}catch{return NextResponse.redirect(adminRedirect("/admin/leads/"+id+"?error=invalid_date"),303)}
 if(!stages.includes(stage)||!Number.isSafeInteger(version)||version<0)return NextResponse.json({error:"invalid_request"},{status:400});
 if(stage==="follow_up"&&!due)return NextResponse.redirect(new URL("/admin/leads/"+id+"?error=due_required",req.url),303);
 const back=(error:string)=>NextResponse.redirect(adminRedirect("/admin/leads/"+id+"?error="+error),303);
 try{
 const result=await transaction(async db=>{
  const current=await db.query<LeadRow>("SELECT * FROM leads WHERE id=$1 FOR UPDATE",[id]);
  if(!current.rowCount)return "not_found";
  const row=current.rows[0];
  if(row.version!==version)return "conflict";
  let consentAt=row.partner_consent_at;
  let consentProvider=row.partner_consent_provider,consentScope=row.partner_consent_scope,consentEvidence=row.partner_consent_evidence;
  let referredTo=row.referred_to,referredAt=row.referred_at;
  if(consentAdd&&!consentAt){
    if(!provider||!scope||!evidence)return "consent_incomplete";
    consentAt=new Date();consentProvider=provider;consentScope=scope;consentEvidence=evidence;
  }
  if(referralDone&&!referredAt){
    // Staff attest that a permitted transfer ACTUALLY occurred, never automatically sends data.
    if(!consentAt||!consentProvider||!consentEvidence||!consentScope)return "consent_required";
    if(!provider||provider!==consentProvider)return "provider_mismatch";
    referredTo=provider;referredAt=new Date();
  }
  if(stage==="referred"&&!referredAt)return "transfer_required";
  await db.query(\`
    UPDATE leads SET stage=$2,follow_up_at=$3,admin_notes=$4,
      partner_consent_at=$5,partner_consent_provider=$6,partner_consent_scope=$7,
      partner_consent_evidence=$8,referred_to=$9,referred_at=$10,version=version+1,updated_at=now()
    WHERE id=$1
  \`,[id,stage,due,notes,consentAt,consentProvider,consentScope,consentEvidence,referredTo,referredAt]);
  if(row.stage!==stage)await db.query("INSERT INTO lead_audit(lead_id,actor,action,old_stage,new_stage) VALUES($1,'admin','stage_changed',$2,$3)",[id,row.stage,stage]);
  if(consentAt&&!row.partner_consent_at)await db.query("INSERT INTO lead_audit(lead_id,actor,action) VALUES($1,'admin','partner_consent_recorded')",[id]);
  if(referredAt&&!row.referred_at)await db.query("INSERT INTO lead_audit(lead_id,actor,action) VALUES($1,'admin','actual_referral_recorded')",[id]);
  return "saved";
 });
 return result==="saved"?NextResponse.redirect(adminRedirect("/admin/leads/"+id+"?saved=1"),303):back(result);
 }catch(e){console.error("Lead update failed",e instanceof Error?e.name:"UnknownError");return back("unavailable")}
}
