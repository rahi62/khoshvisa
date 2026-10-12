import {randomBytes,scryptSync} from "node:crypto";
import {createInterface} from "node:readline";
const cli=createInterface({input:process.stdin,output:process.stdout,terminal:true});
cli.question("Admin password (input will be visible; run in a private terminal): ",password=>{
 cli.close();
 if(password.length<16||password.length>256){console.error("Use a strong password (16-256 chars).");process.exitCode=1;return}
 const salt=randomBytes(32);
 const digest=scryptSync(password,salt,64,{N:16384,r:8,p:1});
 console.log("ADMIN_PASSWORD_SCRYPT=scrypt:"+salt.toString("hex")+":"+digest.toString("hex"));
 console.log("Copy this value to private server environment; never commit it.");
});
