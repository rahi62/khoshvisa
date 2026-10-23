"use client";
import {usePathname} from "next/navigation";
import type {ReactNode} from "react";

/** Public content keeps SiteHeader/Footer. Admin views are a separate interface on the same domain. */
export default function SiteChrome({header,footer,children}:{header:ReactNode;footer:ReactNode;children:ReactNode}){
 const path=usePathname();
 const isAdmin=path==="/admin"||path.startsWith("/admin/");
 if(isAdmin || path==="/" || path==="/new" || path==="/new/")return <>{children}</>;
 return <>{header}{children}{footer}<div className="mobileDock"><a href="/destinations/">⌕ <span>مقصدها</span></a><a href="/consultation/">✦ <span>ارتباط</span></a></div></>;
}
