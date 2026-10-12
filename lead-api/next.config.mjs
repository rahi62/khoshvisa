export default {
 output:"standalone",
 reactStrictMode:true,
 poweredByHeader:false,
 async headers(){
  return [
   {source:"/:path*",headers:[
    {key:"X-Content-Type-Options",value:"nosniff"},
    {key:"X-Frame-Options",value:"DENY"},
    {key:"Referrer-Policy",value:"same-origin"},
    {key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}
   ]},
   {source:"/admin/:path*",headers:[{key:"Cache-Control",value:"private, no-store, max-age=0"}]},
   {source:"/api/:path*",headers:[{key:"Cache-Control",value:"no-store"}]}
  ]
 }
};
