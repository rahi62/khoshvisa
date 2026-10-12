import {NextResponse} from "next/server";
import {database} from "@/lib/db";
export const dynamic="force-dynamic";
export async function GET(){
 try{
  await database().query("SELECT 1");
  return NextResponse.json({status:"ok"},{headers:{"cache-control":"no-store"}});
 }catch{return NextResponse.json({status:"unavailable"},{status:503,headers:{"cache-control":"no-store"}})}
}
