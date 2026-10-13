/**
 * Supporting editorial clusters. These answer procedural/informational intent,
 * and link towards country money pages without competing for the same head terms.
 */
import {visaDocumentsGuide} from "./visa-documents-guide";
import {visaRejectionGuide} from "./visa-rejection-guide";
import {visaFeesGuide} from "./visa-fees-guide";
export type GuideExpansion={
 intro:string;
 updated:string;
 updatedISO?:string;
 quickAnswer?:string;
 quickAnswerTitle?:string;
 metaDescription?:string;
 comparisonTitle?:string;
 comparisonRequirementLabel?:string;
 notice?:string;
 comparisonCaption?:string;
 faqTitle?:string;
 comparison?:{intro:string;rows:{destination:string;slug:string;requirement:string;source:string;href:string}[]};
 questions?:{q:string;a:string}[];
 sections:{title:string;paragraphs:string[];bullets?:string[];sourceUrls?:string[]}[];
 related:{slug:string;title:string}[];
 sources:{name:string;url:string}[];
};
export const guideExpansions:Record<string,GuideExpansion>={
 "visa-documents":visaDocumentsGuide,
 "visa-rejection":visaRejectionGuide,
 "visa-fees":visaFeesGuide

};
