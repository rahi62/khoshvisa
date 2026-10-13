import fs from "node:fs";
import path from "node:path";
import pg from "pg";

// Deliberately separate from db:migrate: only site settings + auth prerequisite.
const url=process.env.DATABASE_URL;
if(!url){console.error("DATABASE_URL is required");process.exit(1)}
const parsed=new URL(url);
if(!["postgresql:","postgres:"].includes(parsed.protocol))throw Error("Invalid PostgreSQL URL");
const sslRequested=parsed.searchParams.get("sslmode");
parsed.searchParams.delete("sslmode");
parsed.searchParams.delete("sslrootcert");
const ca=process.env.PG_TLS_CA_PEM?.replace(/\\n/g,"\n");
if(process.env.NODE_ENV==="production"&&!sslRequested&&!ca){
 console.error("In production, enable TLS and provide PG_TLS_CA_PEM or sslmode=verify-full.");
 process.exit(1);
}
const ssl=ca?{rejectUnauthorized:true,ca}:sslRequested&&sslRequested!=="disable"?{rejectUnauthorized:true}:false;
if(process.env.NODE_ENV==="production"&&ssl===false)throw Error("TLS required");
const client=new pg.Client({connectionString:parsed.toString(),ssl,connectionTimeoutMillis:8000});
try{
 await client.connect();
 await client.query("BEGIN");
 await client.query("SELECT pg_advisory_xact_lock(174200311)");
 await client.query("CREATE TABLE IF NOT EXISTS site_settings_schema_migrations (filename text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())");
 const dir=path.join(process.cwd(),"db","site-settings");
 for(const file of fs.readdirSync(dir).filter(f=>/^[0-9]{4}_[a-z0-9_]+\.sql$/.test(f)).sort()){
   if((await client.query("SELECT 1 FROM site_settings_schema_migrations WHERE filename=$1",[file])).rowCount)continue;
   await client.query(fs.readFileSync(path.join(dir,file),"utf8"));
   await client.query("INSERT INTO site_settings_schema_migrations(filename) VALUES($1)",[file]);
   console.log("Applied",file);
 }
 await client.query("COMMIT");
 console.log("Site settings migrations complete.");
}catch(error){
 await client.query("ROLLBACK").catch(()=>{});
 console.error("Site settings migration failed:",error instanceof Error?error.message:String(error));
 process.exitCode=1;
}finally{await client.end().catch(()=>{})}
