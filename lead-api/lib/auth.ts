import "server-only";
import {createHmac,randomBytes,scryptSync,timingSafeEqual,createHash} from "node:crypto";
import {cookies} from "next/headers";
import type {NextRequest} from "next/server";
import {database} from "@/lib/db";

export const COOKIE="khoshvisa_lead_admin";
const DURATION=8*60*60; // 8 hours
function secret(){const s=process.env.SESSION_SECRET||"";if(s.length<32)throw Error("SESSION_SECRET must be at least 32 characters");return s}
const hmac=(text:string)=>createHmac("sha256",secret()).update(text).digest("base64url");
export function issueSession(){
 const raw=Buffer.from(JSON.stringify({sub:"owner",exp:Math.floor(Date.now()/1000)+DURATION,nonce:randomBytes(12).toString("hex")})).toString("base64url");
 return raw+"."+hmac(raw);
}
export function verifySession(token:string|undefined):boolean{
 if(!token||token.length>2048)return false;
 const [body,signature,...rest]=token.split(".");
 if(rest.length||!body||!signature)return false;
 try{
   const expected=hmac(body);
   const a=Buffer.from(signature),b=Buffer.from(expected);
   if(a.length!==b.length||!timingSafeEqual(a,b))return false;
   const payload=JSON.parse(Buffer.from(body,"base64url").toString("utf8"));
   return payload.sub==="owner"&&Number.isInteger(payload.exp)&&payload.exp>Math.floor(Date.now()/1000);
 }catch{return false}
}
export async function isAdmin(){
 const jar=await cookies();
 return verifySession(jar.get(COOKIE)?.value);
}
export function adminRedirect(path:string):URL{
 const origin=process.env.PUBLIC_ORIGIN;
 if(!origin)throw Error("PUBLIC_ORIGIN is required");
 return new URL(path,origin);
}
export function safeOrigin(req:NextRequest):boolean{
 const expected=process.env.PUBLIC_ORIGIN;
 const origin=req.headers.get("origin");
 if(!expected||!origin)return false;
 try{return new URL(expected).origin===new URL(origin).origin}catch{return false}
}
export function verifyPassword(candidate:string):boolean{
 const configured=process.env.ADMIN_PASSWORD_SCRYPT||"";
 const [algo,salt,digest,...extra]=configured.split(":");
 if(algo!=="scrypt"||extra.length||!/^[a-f0-9]{32,128}$/i.test(salt||"")||!/^[a-f0-9]{128}$/i.test(digest||""))return false;
 if(candidate.length>256)return false;
 try{
  const computed=scryptSync(candidate,Buffer.from(salt,"hex"),64,{N:16384,r:8,p:1});
  return timingSafeEqual(computed,Buffer.from(digest,"hex"));
 }catch{return false}
}
export function cookieOptions(){
 return {httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict" as const,path:"/",maxAge:DURATION};
}
function ipKey(req:NextRequest){
 // Only use X-Real-IP from a trusted reverse proxy, after stripping incoming user-supplied headers.
 const ip=(req.headers.get("x-real-ip")||"unknown").slice(0,72);
 return createHash("sha256").update(ip+"|"+secret()).digest("hex");
}
export async function blockedLogin(req:NextRequest):Promise<boolean>{
 const key=ipKey(req);
 const q=await database().query("SELECT blocked_until FROM admin_login_attempts WHERE ip_hash=$1",[key]);
 return Boolean(q.rows[0]?.blocked_until&&new Date(q.rows[0].blocked_until).getTime()>Date.now());
}
export async function recordLoginFailure(req:NextRequest){
 const key=ipKey(req);
 await database().query(`
 INSERT INTO admin_login_attempts(ip_hash,failures,started_at,blocked_until)
 VALUES($1,1,now(),NULL)
 ON CONFLICT(ip_hash) DO UPDATE SET
  failures=CASE WHEN admin_login_attempts.started_at<now()-interval '15 minutes' THEN 1 ELSE admin_login_attempts.failures+1 END,
  started_at=CASE WHEN admin_login_attempts.started_at<now()-interval '15 minutes' THEN now() ELSE admin_login_attempts.started_at END,
  blocked_until=CASE WHEN admin_login_attempts.started_at>=now()-interval '15 minutes' AND admin_login_attempts.failures>=6 THEN now()+interval '15 minutes' ELSE NULL END
 `,[key]);
}
export async function clearLoginFailures(req:NextRequest){
 await database().query("DELETE FROM admin_login_attempts WHERE ip_hash=$1",[ipKey(req)]);
}
