import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,blockedLogin,clearLoginFailures,cookieOptions,COOKIE,issueSession,recordLoginFailure,safeOrigin,verifyPassword} from "@/lib/crm-auth";
export const runtime="nodejs";export const dynamic="force-dynamic";
const go=(request:NextRequest,error:string)=>NextResponse.redirect(adminRedirect("/admin/login?error="+encodeURIComponent(error)),303);
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 let form:FormData;
 try{form=await req.formData()}catch{return go(req,"invalid")}
 const email=String(form.get("email")||"").trim().toLowerCase().slice(0,180);
 const password=String(form.get("password")||"");
 const configured=process.env.ADMIN_EMAIL?.trim().toLowerCase()||"";
 if(!configured||!process.env.SESSION_SECRET||!process.env.ADMIN_PASSWORD_SCRYPT)
   return go(req,"setup");
 try{
  if(await blockedLogin(req))return go(req,"wait");
  if(email!==configured||!verifyPassword(password)){
    await recordLoginFailure(req);
    return go(req,"invalid");
  }
  await clearLoginFailures(req);
  const response=NextResponse.redirect(adminRedirect("/admin"),303);
  response.cookies.set(COOKIE,issueSession(),cookieOptions());
  response.headers.set("cache-control","no-store");
  return response;
 }catch(e){
  console.error("Admin authentication unavailable",e instanceof Error?e.name:"UnknownError");
  return go(req,"unavailable");
 }
}
