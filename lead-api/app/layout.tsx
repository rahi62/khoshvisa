import type {Metadata} from "next";
import "./style.css";
export const metadata:Metadata={
 metadataBase:new URL("https://leads.khoshvisa.ir"),
 title:{default:"مدیریت لیدهای خوش‌ویزا",template:"%s | خوش‌ویزا"},
 description:"سامانه خصوصی پیگیری درخواست‌های واتساپ خوش‌ویزا",
 robots:{index:false,follow:false,noarchive:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
