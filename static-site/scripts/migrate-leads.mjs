import fs from "node:fs";
import path from "node:path";
import pg from "pg";
const url=process.env.DATABASE_URL;
if(!url){console.error("DATABASE_URL is required");process.exit(1)}
const client=new pg.Client({connectionString:url,connectionTimeoutMillis:8000});
try{
 await client.connect();
 await client.query("BEGIN");
 await client.query("SELECT pg_advisory_xact_lock(312808184)");
 await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (filename text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())");
 const dir=path.join(process.cwd(),"db","migrations");
 for(const file of fs.readdirSync(dir).filter(f=>/^[0-9]{4}_[a-z0-9_]+\.sql$/.test(f)).sort()){
   if((await client.query("SELECT 1 FROM schema_migrations WHERE filename=$1",[file])).rowCount)continue;
   await client.query(fs.readFileSync(path.join(dir,file),"utf8"));
   await client.query("INSERT INTO schema_migrations(filename) VALUES($1)",[file]);
   console.log("Applied",file);
 }
 await client.query("COMMIT");console.log("Migrations complete.");
}catch(e){await client.query("ROLLBACK").catch(()=>{});console.error("Migration failed:",e.message);process.exitCode=1}finally{await client.end().catch(()=>{})}
