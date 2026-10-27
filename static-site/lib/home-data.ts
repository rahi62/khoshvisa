export type Destination = {
  name: string;
  route: string;
  note: string;
  href: string;
};

export const destinations: Destination[] = [
  { name: "شینگن", route: "بسته به کشور مقصد اصلی", note: "کشور اقدام را با ماده ۵ و قانون ۹۰ در ۱۸۰ روز تعیین کن.", href: "/schengen-visa/" },
  { name: "کانادا", route: "پورتال IRCC", note: "حساب IRCC و بیومتریک را از قبل بشناس.", href: "/canada-tourist-visa/" },
  { name: "انگلیس", route: "فرم آنلاین UKVI", note: "اثبات Genuine Visitor مهم‌ترین بخش پرونده است.", href: "/uk-tourist-visa/" },
  { name: "ژاپن", route: "JVAC تهران", note: "تحویل پرونده بدون نوبت قبلی انجام می‌شود.", href: "/japan-tourist-visa/" },
  { name: "فرانسه", route: "France-Visas", note: "فرم آنلاین و بعد تحویل مدارک در ایران.", href: "/france-tourist-visa/" },
  { name: "ایتالیا", route: "VisaMetric", note: "وقت را از قبل رزرو کن؛ ودیعه رزرو جداست.", href: "/italy-tourist-visa/" },
  { name: "آلمان", route: "VIDEX و TLScontact", note: "فرم VIDEX را چاپ و امضا کن؛ نوبت جداگانه است.", href: "/germany-tourist-visa/" },
  { name: "استرالیا", route: "ImmiAccount (Visitor 600)", note: "درخواست از خارج کشور از طریق ImmiAccount ثبت می‌شود.", href: "/australia-tourist-visa/" },
];

export const categories = ["همه", "مدارک", "هزینه", "ریجکتی", "وقت سفارت"] as const;
export type Category = (typeof categories)[number];

export type Article = {
  title: string;
  category: Exclude<Category, "همه">;
  slug: string;
  excerpt?: string;
};

// Replace with a CMS fetch (e.g. in page.tsx) once the endpoint is wired.
export const articles: Article[] = [
  { title: "مدارک ویزای توریستی برای ایرانیان؛ چک‌لیست ۸ مقصد", category: "مدارک", slug: "visa-documents", excerpt: "مدارک، تمکن مالی، ترجمه و تفاوت‌های شینگن، کانادا و انگلیس در یک چک‌لیست." },
  { title: "ریجکتی ویزا؛ دلایل رد، اعتراض و درخواست مجدد", category: "ریجکتی", slug: "visa-rejection" },
  { title: "هزینه ویزای توریستی ۲۰۲۶؛ جدول رسمی ۸ مقصد", category: "هزینه", slug: "visa-fees" },
  { title: "تمکن مالی و گردش حساب ویزای توریستی", category: "مدارک", slug: "visa-proof-of-funds" },
  { title: "وقت سفارت ویزای توریستی؛ مسیر نوبت‌دهی کشورها", category: "وقت سفارت", slug: "visa-appointment" },
  { title: "ترجمه مدارک ویزای توریستی؛ قوانین کشورها", category: "مدارک", slug: "visa-document-translation" },
];

export const GUIDE_COUNT = 23;
