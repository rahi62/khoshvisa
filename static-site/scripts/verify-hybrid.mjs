import {readFileSync,existsSync} from "node:fs";
import {join} from "node:path";
const base=join(process.cwd(),".next");
const prerenderFile=join(base,"prerender-manifest.json");
if(!existsSync(prerenderFile)){
 console.error("Missing Next.js prerender manifest (hybrid SSR build expected)");process.exit(1)
}
const manifest=JSON.parse(readFileSync(prerenderFile,"utf8"));
const normalize=p=>(p.replace(/\/+$/,"")||"/");
const prerendered=new Set(Object.keys(manifest.routes||{}).map(normalize));
const publicRoutes=["/","/destinations","/visa-explorer","/visa-readiness","/motion-lab","/consultation","/visa-guides","/editorial-policy","/schengen-visa","/canada-tourist-visa","/uk-tourist-visa","/japan-tourist-visa","/france-tourist-visa","/italy-tourist-visa","/germany-tourist-visa","/australia-tourist-visa","/visa-guides/visa-documents","/visa-guides/visa-rejection","/visa-guides/visa-fees"];
for(const route of publicRoutes)if(!prerendered.has(route)){console.error("SEO route is no longer prerendered:",route);process.exitCode=1}
const countryContent={
 "/schengen-visa":["۹۰ یورو","هزینه رسمی بزرگسال","کمیسیون اروپا"],
 "/canada-tourist-visa":["۱۰۰ دلار کانادا","هزینه دولتی هر نفر","IRCC"],
 "/uk-tourist-visa":["۱۳۵ پوند","هزینه پایه ۶ماهه","GOV.UK"],
 "/france-tourist-visa":["France-Visas","۲۶٫۵۰ یورو","WebPage"],
 "/germany-tourist-visa":["TLScontact","VIDEX","WebPage"],
 "/italy-tourist-visa":["VisaMetric","۵۰ میلیون ریال","WebPage"],
 "/japan-tourist-visa":["JVAC","۶۸٬۰۰۰٬۰۰۰ ریال","WebPage"],
 "/australia-tourist-visa":["ImmiAccount","۲۵۰ دلار استرالیا","WebPage"]
};
for(const [route,tokens] of Object.entries(countryContent)){
 const file=join(base,"server","app",route.substring(1)+".html");
 if(!existsSync(file)){
  console.error("Missing expected static HTML for money page:",file);process.exitCode=1;continue
 }
 const html=readFileSync(file,"utf8");
 if(!html.includes('lang="fa"')||!html.includes('dir="rtl"')){console.error("Incorrect RTL metadata:",route);process.exitCode=1}
 if(!html.includes('rel="canonical"')){console.error("Missing canonical:",route);process.exitCode=1}
 for(const token of tokens)if(!html.includes(token)){console.error("Missing country content",route,token);process.exitCode=1}
 if(!html.includes("BreadcrumbList")){console.error("Missing breadcrumb structured data",route);process.exitCode=1}
 if(!html.includes("WebPage")){console.error("Missing citeable WebPage JSON-LD",route);process.exitCode=1}
}
const guideRoutes={
 "/visa-guides/visa-documents":["Article","BreadcrumbList","مدارک ویزای توریستی","جدول مقایسه مدارک","سؤالات متداول","کمیسیون اروپا","GOV.UK"],
 "/visa-guides/visa-rejection":["Article","BreadcrumbList","نامه رد"],
 "/visa-guides/visa-fees":["Article","BreadcrumbList","هزینه"]
};
for(const [route,tokens] of Object.entries(guideRoutes)){
 const file=join(base,"server","app",route.substring(1)+".html");
 if(!existsSync(file)){console.error("Missing statically-rendered educational guide:",route);process.exitCode=1;continue}
 const html=readFileSync(file,"utf8");
 if(!html.includes('lang="fa"')||!html.includes('dir="rtl"')){console.error("Incorrect guide language/RTL:",route);process.exitCode=1}
 if(!html.includes('rel="canonical"')){console.error("Missing guide canonical:",route);process.exitCode=1}
 for(const token of tokens)if(!html.includes(token)){console.error("Missing guide schema/content token:",route,token);process.exitCode=1}
}
if(!prerendered.has("/sitemap.xml")||!prerendered.has("/robots.txt")){
 console.error("Sitemap or robots.txt missing from prerendered routes");process.exitCode=1
}
if(!process.exitCode)console.log("Hybrid Next.js QA passed: "+publicRoutes.length+" static SEO routes + country content. Dynamic /admin and /api checked by Next build.");
