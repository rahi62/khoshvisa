/**
 * Vercel hybrid Next.js runtime.
 * Public SEO routes retain prerendering; /admin and /api run on Node.js Functions.
 * Do not restore output:'export' or dynamic API and session cookies will break.
 */
export default {
 trailingSlash: true,
 skipTrailingSlashRedirect: true,
 images: {unoptimized: true},
 reactStrictMode: true,
 poweredByHeader: false,
 async redirects() {
  const guideSlugs=[
    "canada-ircc-portal-guide","canada-visitor-visa-documents","visa-proof-of-funds","visa-documents",
    "visa-fees","schengen-travel-insurance","visa-document-translation","visa-appointment"
  ];
  return [
    ...guideSlugs.map(s=>({source:"/"+s,destination:"/visa-guides/"+s+"/",permanent:true})),
    {source:"/visa",destination:"/visa-guides/",permanent:true}
  ];
 },
 async headers() {
  return [
   {source:"/admin/:path*",headers:[
    {key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"},
    {key:"Cache-Control",value:"private, no-store, max-age=0"},
    {key:"X-Frame-Options",value:"DENY"},
    {key:"X-Content-Type-Options",value:"nosniff"},
    {key:"Referrer-Policy",value:"same-origin"}
   ]},
   {source:"/api/:path*",headers:[
    {key:"Cache-Control",value:"no-store"},
    {key:"X-Content-Type-Options",value:"nosniff"}
   ]}
  ];
 }
};
