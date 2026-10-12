import Link from "next/link";
import {visas,guides} from "../lib/content";
import ScenicHero from "../components/ScenicHero";
import {DestinationDeck,StoryJourney,AnimatedSteps,HorizontalFilmStrip,ScrollTextReveal} from "../components/KV3Journey";
import WebGLGlobe from "../components/WebGLGlobe";
import {Reveal,WordReveal} from "../components/CinematicMotion";
export const metadata={alternates:{canonical:"/"},title:"خوش‌ویزا | راهنمای ویزا و تجربه سفر"};
const featured=[visas[0],visas[1],visas[2],visas[3],visas[4]];
export default function Home(){
 return <main className="kv3-home">
 <ScenicHero destinations={featured}/>
 <section className="kv3-trustline"><div className="kv3-container"><span>✧ سفر آگاهانه</span><i/><span>◈ راهنمای مقصدها</span><i/><span>✦ اطلاعات مستند</span><i/><span>⌁ مسیرهای رسمی ویزا</span></div></section>
 <section id="destinations" className="kv3-destination-section"><div className="kv3-container"><div className="kv3-section-heading"><Reveal><span className="kv3-eyebrow">01 / DESTINATIONS — DISCOVER</span><h2>مقصد بعدی‌ات<br/><em>کجای جهان است؟</em></h2><p>کارت‌ها را حرکت بده، مقصدت را انتخاب کن و راهنمای ویزای آن را ببین.</p></Reveal><Link className="kv3-text-action" href="/destinations/">همه مقصدها <span>↗</span></Link></div><DestinationDeck items={featured}/></div></section>
 <section className="kv3-statement"><div className="kv3-container"><div className="kv3-statement-mark">“</div><span>DISCOVER MORE THAN DESTINATIONS</span><ScrollTextReveal text="ما به تو کمک می‌کنیم پیش از بستن چمدان، مسیر سفر و مدارک ویزا را بهتر بشناسی."/><Link href="/visa-readiness/">بررسی اولیه برای سفر ←</Link></div></section>
 <StoryJourney items={[visas[2],visas[1],visas[0],visas[3]]}/>
 <HorizontalFilmStrip items={[visas[4],visas[3],visas[1],visas[2]]}/>
 <section className="kv3-roadmap"><div className="kv3-container"><div className="kv3-section-heading"><Reveal><span className="kv3-eyebrow">02 / THE PROCESS</span><h2>هر سفر بزرگ،<br/><em>با یک تصمیم شروع می‌شود.</em></h2><p>پنج گام متداول در مسیر درخواست ویزای توریستی؛ قابل بررسی و انتخاب.</p></Reveal></div><AnimatedSteps steps={visas[0].steps}/></div></section>
 <WebGLGlobe items={visas}/>
 <section className="kv3-consult"><div className="kv3-consult-photo" role="img" aria-label="دریاچه و کوهستان در مسیر سفر"/><div className="kv3-consult-content"><Reveal><span className="kv3-eyebrow">PERSONAL GUIDANCE</span><h2>سفر رویایی تو،<br/><em>از یک انتخاب آگاهانه.</em></h2><p>با بررسی مقصد، شناخت الزامات، مدارک و مراجع رسمی، برای سفر بعدی آماده‌تر باش.</p><div className="kv3-consult-actions"><Link href="/visa-readiness/" className="kv3-button kv3-button-gold">بررسی اولیه شرایط ←</Link><Link href="/consultation/" className="kv3-button kv3-button-light">صفحه درخواست مشاوره ↗</Link></div><small>امکان ثبت آنلاین درخواست مشاوره پس از راه‌اندازی مسیر امن ارسال فعال خواهد شد.</small></Reveal></div></section>
 <section className="kv3-journal"><div className="kv3-container"><div className="kv3-section-heading"><Reveal><span className="kv3-eyebrow">03 / THE JOURNAL</span><h2>قصه سفر،<br/><em>از دانستن شروع می‌شود.</em></h2><p>راهنماهای کوتاه و کاربردی برای تصمیم بهتر پیش از سفر.</p></Reveal><Link className="kv3-text-action" href="/visa-guides/">همه راهنماها ↗</Link></div><div className="kv3-journal-grid">{guides.map((g,i)=><Link href={"/visa-guides/"+g.slug+"/"} className="kv3-journal-card" key={g.slug}><div className={"kv3-journal-photo kv3-journal-photo-"+i}><span>۰{i+1}</span></div><div><small>راهنمای ویزا / TRAVEL NOTES</small><h3>{g.title}</h3><p>{g.summary}</p><strong>ادامه مطلب ←</strong></div></Link>)}</div></div></section>
 <section className="kv3-end"><div className="kv3-container"><span>BEYOND BORDERS, BEYOND EXPECTATIONS</span><h2>جهان منتظر توست.</h2><p>برای شروع، مقصد و مسیر درخواست ویزای خود را بشناس.</p><Link className="kv3-button kv3-button-gold" href="/visa-explorer/">جهان را کشف کن ←</Link><Link className="kv3-motion-link" href="/motion-lab/">دیدن آزمایشگاه ۱۴ انیمیشن ↗</Link></div></section>
 </main>;
}