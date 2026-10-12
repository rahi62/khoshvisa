import pg from "pg";
const args=process.argv.slice(2);
const id=args[args.indexOf("--id")+1]||"";
const apply=args.includes("--apply");
if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)){
 console.error("Provide --id <lead-uuid>, after separately verifying identity and legal retention obligations.");
 process.exit(2);
}
if(!process.env.DATABASE_URL){console.error("DATABASE_URL required");process.exit(2)}
const client=new pg.Client({connectionString:process.env.DATABASE_URL});
try{
 await client.connect();
 const result=await client.query("SELECT stage,source,referred_at IS NOT NULL AS was_referred FROM leads WHERE id=$1",[id]);
 if(!result.rowCount){console.error("Lead not found.");process.exitCode=1}
 else if(!apply){
  console.log("DRY RUN: lead exists; stage",result.rows[0].stage,"source",result.rows[0].source,"was-referred",result.rows[0].was_referred);
  console.log("Run again with --apply ONLY after verified deletion request, backup/legal review, and checking external recipients.");
 }else{
  await client.query("BEGIN");
  const deleted=await client.query("DELETE FROM leads WHERE id=$1",[id]);
  await client.query("COMMIT");
  console.log("Deleted",deleted.rowCount,"lead and corresponding audit/webhook records.");
 }
}catch(e){await client.query("ROLLBACK").catch(()=>{});console.error("Erasure failed",e.message);process.exitCode=1}finally{await client.end().catch(()=>{})}
