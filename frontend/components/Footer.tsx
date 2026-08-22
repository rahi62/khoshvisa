import { getSiteSettings } from "@/lib/api";

export async function Footer() {
  const settings = await getSiteSettings();
  const brand = settings?.brand_name ?? "خوش ویزا";
  const phone = settings?.phone ?? "02146010788";
  const mobile = settings?.mobile ?? "09124175574";
  return (
    <footer id="offices">
      <div className="container footerGrid">
        <div><strong>{brand}</strong><p>{settings?.brand_description ?? "مشاوره و خدمات تور و ویزا، بدون ادعای صدور تضمینی."}</p></div>
        <div><strong>دفتر شمال تهران</strong><p>{settings?.north_office ?? "قبل از پارک‌وی، روبه‌روی هتل استقلال"}</p></div>
        <div><strong>دفتر غرب تهران</strong><p>{settings?.west_office ?? "جنت‌آباد مرکزی، بلوار بعثت"}</p></div>
        <div><a href={`tel:${phone}`}>{phone}</a><br /><a href={`tel:${mobile}`}>{mobile}</a>{settings?.instagram_url && <><br /><a href={settings.instagram_url}>اینستاگرام</a></>}</div>
      </div>
    </footer>
  );
}
