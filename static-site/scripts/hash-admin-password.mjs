import {randomBytes,scryptSync} from "node:crypto";
if(!process.stdin.isTTY||typeof process.stdin.setRawMode!=="function"){
 console.error("For safety, generate the admin password hash in an interactive private terminal.");
 process.exit(1);
}
process.stdout.write("Strong admin password (hidden input): ");
let password="";
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data",buffer=>{
 for(const char of buffer.toString("utf8")){
  if(char==="\u0003"){process.stdin.setRawMode(false);process.stdout.write("\n");process.exit(130)}
  if(char==="\u007f"||char==="\b"){password=password.slice(0,-1);continue}
  if(char==="\r"||char==="\n"){
   process.stdin.setRawMode(false);process.stdin.pause();process.stdout.write("\n");
   if(password.length<16||password.length>256){console.error("Use a strong password with 16–256 characters.");process.exitCode=1;return}
   const salt=randomBytes(32);
   const digest=scryptSync(password,salt,64,{N:16384,r:8,p:1});
   password="";
   process.stdout.write("ADMIN_PASSWORD_SCRYPT=scrypt:"+salt.toString("hex")+":"+digest.toString("hex")+"\n");
   process.stdout.write("Store this hash securely on the VPS, never in Git.\n");
   return;
  }
  if(password.length<256)password+=char;
 }
});
