import {NextRequest,NextResponse} from "next/server";
import {COOKIE,safeOrigin} from "@/lib/auth";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 const result=NextResponse.redirect(new URL("/admin/login",req.url),303);
 result.cookies.set(COOKIE,"",{httpOnly:true,sameSite:"strict",secure:process.env.NODE_ENV==="production",path:"/",maxAge:0});
 return result;
}
