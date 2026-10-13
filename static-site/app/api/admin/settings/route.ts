import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,isAdmin,safeOrigin} from "@/lib/crm-auth";
import {cleanSettingsForm} from "@/lib/site-settings";
import {saveSiteSettings} from "@/lib/site-settings-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const back=(key:string)=>NextResponse.redirect(adminRedirect("/admin/settings?error="+encodeURIComponent(key)),303);
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 if(!await isAdmin())return NextResponse.redirect(adminRedirect("/admin/login?next=%2Fadmin%2Fsettings"),303);
 let form:FormData;
 try{form=await req.formData()}catch{return back("invalid")}
 const version=Number(form.get("version"));
 if(!Number.isSafeInteger(version)||version<0)return back("invalid");
 const data=cleanSettingsForm(form);
 if(!data)return back("invalid");
 try{
  const saved=await saveSiteSettings(data,version);
  if(saved==="saved")return NextResponse.redirect(adminRedirect("/admin/settings?saved=1"),303);
  return back(saved);
 }catch(error){
  console.error("Site settings update failed",error instanceof Error?error.name:"UnknownError");
  return back("unavailable");
 }
}
