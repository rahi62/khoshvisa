import {NextResponse} from "next/server";
import {readSiteSettings,publicSiteSettings} from "@/lib/site-settings-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"private, no-store, max-age=0","X-Content-Type-Options":"nosniff"};
export async function GET(){
 const {settings,ready}=await readSiteSettings();
 if(!ready)return NextResponse.json({error:"unavailable"},{status:503,headers});
 return NextResponse.json(publicSiteSettings(settings),{headers});
}
