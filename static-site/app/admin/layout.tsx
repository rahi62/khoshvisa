import type {Metadata} from "next";
import "./admin.css";
export const metadata:Metadata={
 title:"داشبورد مدیریت لیدهای خوش‌ویزا",
 robots:{index:false,follow:false,noarchive:true,noimageindex:true}
};
export default function LeadAdminLayout({children}:{children:React.ReactNode}){
 return <div className="kv-admin-root">{children}</div>;
}
