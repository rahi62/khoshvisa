import "server-only";
import {Pool, type PoolClient} from "pg";
let pool:Pool|undefined;
export function database():Pool{
 if(pool)return pool;
 const url=process.env.DATABASE_URL;
 if(!url)throw new Error("DATABASE_URL is required");
 const parsed=new URL(url);
 if(process.env.NODE_ENV==="production"){
   if(!["postgresql:","postgres:"].includes(parsed.protocol))throw new Error("Invalid PostgreSQL URL");
   if(["localhost","127.0.0.1","::1"].includes(parsed.hostname))throw new Error("A Vercel Function cannot reach a VPS localhost database");
 }
 // pg's connection string may contain sslmode which overrides the supplied SSL config.
 // We always use the independently verified server certificate configuration.
 parsed.searchParams.delete("sslmode");
 parsed.searchParams.delete("sslrootcert");
 const tls=process.env.NODE_ENV==="production"?{
  rejectUnauthorized:true,
  ...(process.env.PG_TLS_CA_PEM?{ca:process.env.PG_TLS_CA_PEM.replace(/\\n/g,"\n")}:{})
 }:false;
 pool=new Pool({connectionString:parsed.toString(),ssl:tls,max:2,idleTimeoutMillis:10000,connectionTimeoutMillis:5000,application_name:"khoshvisa_vercel_admin"});
 pool.on("error",err=>console.error("PostgreSQL idle pool:",err.name));
 return pool;
}
export async function transaction<T>(fn:(client:PoolClient)=>Promise<T>):Promise<T>{
 const client=await database().connect();
 try{await client.query("BEGIN");const result=await fn(client);await client.query("COMMIT");return result}
 catch(error){await client.query("ROLLBACK").catch(()=>{});throw error}
 finally{client.release()}
}
