import "server-only";
import {Pool, type PoolClient} from "pg";
let pool:Pool|undefined;
export function database():Pool{
 if(pool)return pool;
 const url=process.env.DATABASE_URL;
 if(!url)throw new Error("DATABASE_URL is required");
 pool=new Pool({connectionString:url,max:8,idleTimeoutMillis:30000,connectionTimeoutMillis:6000,application_name:"khoshvisa_leads"});
 pool.on("error",e=>{console.error("Postgres idle pool error",e.name)});
 return pool;
}
export async function transaction<T>(fn:(client:PoolClient)=>Promise<T>):Promise<T>{
 const client=await database().connect();
 try{await client.query("BEGIN");const result=await fn(client);await client.query("COMMIT");return result}
 catch(e){await client.query("ROLLBACK").catch(()=>{});throw e}
 finally{client.release()}
}
