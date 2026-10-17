import {existsSync,readFileSync} from "node:fs";
import {join} from "node:path";
const base=join(process.cwd(),"out");
const routes=["","destinations","visa-explorer","visa-readiness","motion-lab","consultation","visa-guides","editorial-policy","schengen-visa","canada-tourist-visa","uk-tourist-visa","japan-tourist-visa","france-tourist-visa","italy-tourist-visa","germany-tourist-visa","australia-tourist-visa","visa-guides/visa-documents","visa-guides/visa-rejection","visa-guides/visa-fees"];
const missing=routes.filter(route=>!existsSync(join(base,route,"index.html")));
if(missing.length){console.error("Missing exported routes:",missing.join(", "));process.exitCode=1}
for(const route of routes){
 const file=join(base,route,"index.html");if(!existsSync(file))continue;
 const html=readFileSync(file,"utf8");if(!html.includes('lang="fa"')||!html.includes('dir="rtl"')){console.error("Missing Persian RTL on",route);process.exitCode=1}
 if(!html.includes("<title>")){console.error("Missing title on",route);process.exitCode=1}
 if(route==="motion-lab"&&!/noindex/.test(html)){console.error("Missing noindex on motion lab");process.exitCode=1}
 if(route!=="motion-lab" && !html.includes('rel="canonical"')){console.error("Missing canonical on",route);process.exitCode=1}
}
const countryContent={
 "schengen-visa":["۹۰ یورو","هزینه رسمی بزرگسال","کمیسیون اروپا"],
 "canada-tourist-visa":["۱۰۰ دلار کانادا","هزینه دولتی هر نفر","IRCC"],
 "uk-tourist-visa":["۱۳۵ پوند","هزینه پایه ۶ماهه","GOV.UK"]
};
for(const [slug,tokens] of Object.entries(countryContent)){
 const file=join(base,slug,"index.html");if(!existsSync(file))continue;
 const html=readFileSync(file,"utf8");
 for(const token of tokens)if(!html.includes(token)){console.error("Missing country pillar content",slug,token);process.exitCode=1}
 if(!html.includes("BreadcrumbList")){console.error("Missing breadcrumb schema",slug);process.exitCode=1}
}
for(const path of ["sitemap.xml","robots.txt"]){if(!existsSync(join(base,path))){console.error("Missing SEO output:",path);process.exitCode=1}}
if(!process.exitCode)console.log("KhoshVisa export smoke test passed:",routes.length,"routes + SEO assets");
