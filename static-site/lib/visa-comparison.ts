/**
 * Compact, verified public facts for client-side destination comparison.
 * Updated 2026-10-12. The canonical source is always the immigration authority.
 */
export type DestinationFacts={
 type:string;
 fee:string;
 processing:string;
 filing:string;
 official:string;
 updated:string;
 docs:string[];
 warning:string;
};
export const destinationFacts:Record<string,DestinationFacts>={
 "schengen-visa":{
  type:"شینگن کوتاه‌مدت (C)",
  fee:"۹۰ یورو برای بزرگسال",
  processing:"معمولاً ۱۵ روز تقویمی؛ تا ۴۵ روز در بررسی بیشتر",
  filing:"کشور مقصد اصلی؛ از ۶ ماه پیش از سفر",
  official:"https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en",
  updated:"۲۰۲۶/۱۰/۱۲",
  docs:["گذرنامه، فرم و عکس طبق مقررات شینگن","بیمه مسافرتی و مدارک سفر و اقامت","اسناد مالی و شغلی و شواهد بازگشت","مدارک اختصاصی سفارت کشور مقصد اصلی"],
  warning:"برای کشورهایی مانند فرانسه و آلمان، چک‌لیست نمایندگی همان کشور را هم بررسی کنید."
 },
 "canada-tourist-visa":{
  type:"Visitor Visa (TRV)",
  fee:"۱۰۰ دلار کانادا + در صورت لزوم ۸۵ دلار بیومتریک",
  processing:"متغیر براساس محل درخواست و پرونده",
  filing:"عمدتاً آنلاین از طریق حساب رسمی IRCC",
  official:"https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/portal-application-process.html",
  updated:"۲۰۲۶/۱۰/۱۲",
  docs:["گذرنامه معتبر و اطلاعات هویتی","مدارک مالی متناسب با طول سفر و منبع وجوه","اسناد واقعی شغلی، خانوادگی و قصد بازگشت","مدارک هدف سفر و دعوت‌نامه در صورت کاربرد","نامه و دستورالعمل بیومتریک، در صورت صدور"],
  warning:"زمان رسیدگی عدد ثابتی ندارد و بیومتریک به شرایط و سوابق فردی وابسته است."
 },
 "uk-tourist-visa":{
  type:"Standard Visitor",
  fee:"۱۳۵ پوند برای ویزای کوتاه‌مدت شش‌ماهه",
  processing:"استاندارد معمول خارج از بریتانیا حدود ۳ هفته",
  filing:"درخواست آنلاین و مرکز معرفی‌شده در مسیر رسمی",
  official:"https://www.gov.uk/standard-visitor/apply-standard-visitor-visa",
  updated:"۲۰۲۶/۱۰/۱۲",
  docs:["گذرنامه و برنامه واقعی سفر","شواهد درآمد، شغل، منابع مالی و قصد بازگشت","اطلاعات و مدارک میزبان در صورت حمایت مالی","ترجمه کامل و قابل تأیید مدارک غیرانگلیسی/غیرولزی"],
  warning:"معمولاً زودترین ثبت درخواست سه ماه پیش از سفر است؛ کار با Visitor محدودیت قانونی دارد."
 }
};
