import pg from "pg";
const url=process.env.DATABASE_URL;
if(!url){console.error("DATABASE_URL is required");process.exit(1)}
const days=Number(process.env.RETENTION_DAYS||180);
if(!Number.isSafeInteger(days)||days<30||days>3650)throw Error("Invalid retention days");
const apply=process.argv.includes("--apply");
const db=new pg.Client({connectionString:url});
try{
 await db.connect();
 // Only resolved leads are eligible. This does NOT delete active/new/follow-up leads.
 const condition="stage IN ('closed','invalid') AND last_contact_at < now() - ($1::integer * interval '1 day')";
 const count=await db.query("SELECT count(*)::integer AS count FROM leads WHERE "+condition,[days]);
 console.log((apply?"APPLY":"DRY RUN"),"eligible",count.rows[0].count,"older than",days,"days");
 if(apply){
   await db.query("BEGIN");
   const result=await db.query("DELETE FROM leads WHERE "+condition,[days]);
   await db.query("COMMIT");
   console.log("Deleted",result.rowCount,"closed/invalid records and dependent audit/events.");
 }
}catch(e){await db.query("ROLLBACK").catch(()=>{});console.error("Retention task failed:",e.message);process.exitCode=1}finally{await db.end().catch(()=>{})}
