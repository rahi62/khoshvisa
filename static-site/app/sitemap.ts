import type {MetadataRoute} from "next";
import {visas,guides} from "../lib/content";
import {visaProfiles} from "../lib/visa-profiles";
import {guideExpansions} from "../lib/guide-expansions";
export const dynamic="force-static";
const root="https://khoshvisa.ir/";
const core=["","destinations","visa-explorer","visa-readiness","visa-guides","consultation","about","contact","privacy","uk-10-year-visa"];
export default function sitemap():MetadataRoute.Sitemap{
 const general=core.map(path=>({url:root+(path?path+"/":""),priority:path?0.7:1}));
 const countries=visas.map(v=>({url:root+v.slug+"/",lastModified:new Date(visaProfiles[v.slug]?.reviewedISO||"2026-10-12"),priority:0.9}));
 const articles=guides.map(g=>({url:root+"visa-guides/"+g.slug+"/",lastModified:new Date(guideExpansions[g.slug]?.updatedISO||"2026-10-12"),priority:0.8}));
 return [...general,...countries,...articles];
}