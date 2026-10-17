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
const publicRoutes=["/","/destinations","/visa-explorer","/visa-readiness","/motion-lab","/consultation","/visa-guides","/editorial-policy","/schengen-visa","/canada-tourist-visa","/uk-tourist-visa","/japan-tourist-visa","/france-tourist-visa","/italy-tourist-visa","/germany-tourist-visa","/australia-tourist-visa","/visa-guides/visa-documents","/visa-guides/visa-rejection","/visa-guides/visa-fees","/visa-guides/visa-proof-of-funds","/visa-guides/visa-without-travel-history","/visa-guides/visa-appointment","/visa-guides/visa-document-translation","/visa-guides/visa-invitation-letter","/visa-guides/single-vs-multiple-entry-visa","/visa-guides/visa-biometrics","/visa-guides/schengen-travel-insurance","/visa-guides/visa-flight-hotel-reservations","/visa-guides/visa-application-form-mistakes"];
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
 "/visa-guides/visa-rejection":["Article","WebPage","BreadcrumbList","ریجکتی ویزا","بعد از ریجکتی در ۸ مقصد","ژاپن","شش ماه","IRCC","۲۰۲۶/۱۰/۱۳"],
 "/visa-guides/visa-fees":["Article","WebPage","BreadcrumbList","هزینه ویزای توریستی ۲۰۲۶","جدول هزینه رسمی","۱۳۵ پوند","۶۸٬۰۰۰٬۰۰۰ ریال","۲۵۰ دلار استرالیا","IRCC","۲۰۲۶/۱۰/۱۳"],
 "/visa-guides/visa-proof-of-funds":["Article","BreadcrumbList","تمکن مالی","گردش حساب","IRCC"],
 "/visa-guides/visa-without-travel-history":["Article","BreadcrumbList","بدون سابقه سفر","پاسپورت سفید"],
 "/visa-guides/visa-appointment":["Article","BreadcrumbList","وقت سفارت","VisaMetric","JVAC"],
 "/visa-guides/visa-document-translation":["Article","BreadcrumbList","ترجمه مدارک","مترجم","کانادا"],
 "/visa-guides/visa-invitation-letter":["Article","BreadcrumbList","دعوت‌نامه","IRCC","میزبان"],
 "/visa-guides/single-vs-multiple-entry-visa":["Article","BreadcrumbList","سینگل","مولتی","۹۰ روز"],
 "/visa-guides/visa-biometrics":["Article","BreadcrumbList","بیومتریک","BIL","۱۰ سال"],
 "/visa-guides/schengen-travel-insurance":["Article","BreadcrumbList","۳۰ هزار یورو","بیمه","بازگرداندن"],
 "/visa-guides/visa-flight-hotel-reservations":["Article","BreadcrumbList","رزرو","هتل","بلیت"],
 "/visa-guides/visa-application-form-mistakes":["Article","BreadcrumbList","اشتباهات فرم","ImmiAccount","اصلاح","با UKVI تماس بگیرید"]
};
for(const [route,tokens] of Object.entries(guideRoutes)){
 const file=join(base,"server","app",route.substring(1)+".html");
 if(!existsSync(file)){console.error("Missing statically-rendered educational guide:",route);process.exitCode=1;continue}
 const html=readFileSync(file,"utf8");
 if(!html.includes('lang="fa"')||!html.includes('dir="rtl"')){console.error("Incorrect guide language/RTL:",route);process.exitCode=1}
 if(!html.includes('rel="canonical"')){console.error("Missing guide canonical:",route);process.exitCode=1}
 for(const token of tokens)if(!html.includes(token)){console.error("Missing guide schema/content token:",route,token);process.exitCode=1}
}
// Post-deploy regression: country Money Pages and contextually relevant guides link back.
const requiredReverseLinks={
 "/visa-guides/visa-proof-of-funds":["france-tourist-visa","germany-tourist-visa","italy-tourist-visa"],
 "/visa-guides/visa-document-translation":["france-tourist-visa","germany-tourist-visa","italy-tourist-visa"]
};
for(const [route,targets] of Object.entries(requiredReverseLinks)){
 const html=readFileSync(join(base,"server","app",route.substring(1)+".html"),"utf8");
 for(const target of targets)if(!html.includes('href="/'+target+'/"')){
  console.error("Missing contextual return path",route,target);process.exitCode=1;
 }
}
// Country Money Page ⇄ informational cluster links remain crawlable in static HTML.
const newMoneyGuideRequirements={
 "/schengen-visa":["visa-biometrics","schengen-travel-insurance","visa-flight-hotel-reservations","visa-application-form-mistakes"],
 "/canada-tourist-visa":["visa-biometrics","visa-application-form-mistakes"],
 "/uk-tourist-visa":["visa-biometrics","visa-application-form-mistakes"],
 "/france-tourist-visa":["schengen-travel-insurance","visa-flight-hotel-reservations"],
 "/germany-tourist-visa":["schengen-travel-insurance","visa-flight-hotel-reservations"],
 "/italy-tourist-visa":["schengen-travel-insurance","visa-flight-hotel-reservations"],
 "/australia-tourist-visa":["visa-biometrics","visa-application-form-mistakes"]
};
for(const [route,slugs] of Object.entries(newMoneyGuideRequirements)){
 const html=readFileSync(join(base,"server","app",route.substring(1)+".html"),"utf8");
 for(const slug of slugs)if(!html.includes('href="/visa-guides/'+slug+'/')){
  console.error("Missing Money Page to cluster link:",route,slug);process.exitCode=1;
 }
}
const editorialGapChecks=[["/visa-guides/visa-proof-of-funds","شش‌ماهه"],["/visa-guides/visa-without-travel-history","گذرنامه‌های پیشین"],["/visa-guides/visa-appointment","۱۵ ژوئیه ۲۰۲۶"],["/visa-guides/visa-document-translation","نام لاتین"],["/visa-guides/visa-invitation-letter","Super Visa"],["/visa-guides/single-vs-multiple-entry-visa","برچسب شینگن"]];
for(const [route,token] of editorialGapChecks){
 const path=join(base,"server","app",route.substring(1)+".html");
 if(!existsSync(path)){console.error("Missing prerendered cluster:",route);process.exitCode=1;continue}
 const html=readFileSync(path,"utf8");
 for(const phrase of [token,"راهنمای عملی","منابع رسمی"]){
  if(!html.includes(phrase)){console.error("Cluster gap-content not rendered:",route,phrase);process.exitCode=1}
 }
}
for(const route of Object.keys(countryContent)){
 const html=readFileSync(join(base,"server","app",route.substring(1)+".html"),"utf8");
 for(const token of ["پاسخ کوتاه برای متقاضی ایرانی","rel=\"canonical\"","BreadcrumbList","WebPage"]){
  if(!html.includes(token)){console.error("Destination semantic SEO check failed:",route,token);process.exitCode=1}
 }
 for(const link of ["/visa-guides/visa-documents/","/visa-guides/visa-rejection/","/visa-guides/visa-fees/"]){
  if(!html.includes('href="'+link+'"')){console.error("Missing money-to-guide link",route,link);process.exitCode=1}
 }
}
const homeHtmlPath=join(base,"server","app","index.html");
if(!existsSync(homeHtmlPath)){console.error("Missing static homepage HTML");process.exitCode=1}
else{
 const html=readFileSync(homeHtmlPath,"utf8");
 for(const marker of ["Organization","WebSite","tel:+989351300502","tel:+982146010788","/visa-guides/visa-fees/"]){
  if(!html.includes(marker)){console.error("Homepage missing verified SEO/trust content:",marker);process.exitCode=1}
 }
 for(const slug of Object.keys(countryContent))if(!html.includes('href="'+slug+'/')){console.error("Homepage missing static destination:",slug);process.exitCode=1}
 if(html.includes('href="/motion-lab/"')){console.error("Developer-only motion-lab link found in homepage");process.exitCode=1}
}
if(!prerendered.has("/sitemap.xml")||!prerendered.has("/robots.txt")){
 console.error("Sitemap or robots.txt missing from prerendered routes");process.exitCode=1
}
if(!process.exitCode)console.log("Hybrid Next.js QA passed: "+publicRoutes.length+" static SEO routes + country content. Dynamic /admin and /api checked by Next build.");
