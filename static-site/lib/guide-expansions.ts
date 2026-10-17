/**
 * Supporting editorial clusters. These answer procedural/informational intent,
 * and link towards country money pages without competing for the same head terms.
 */
import {visaDocumentsGuide} from "./visa-documents-guide";
import {visaRejectionGuide} from "./visa-rejection-guide";
import {visaFeesGuide} from "./visa-fees-guide";
import {visaProofOfFundsGuide} from "./visa-cluster-visa-proof-of-funds";
import {visaWithoutTravelHistoryGuide} from "./visa-cluster-visa-without-travel-history";
import {visaAppointmentGuide} from "./visa-cluster-visa-appointment";
import {visaDocumentTranslationGuide} from "./visa-cluster-visa-document-translation";
import {visaInvitationLetterGuide} from "./visa-cluster-visa-invitation-letter";
import {singleVsMultipleEntryVisaGuide} from "./visa-cluster-single-vs-multiple-entry-visa";
import {visaBiometricsGuide} from "./visa-cluster-visa-biometrics";
import {schengenTravelInsuranceGuide} from "./visa-cluster-schengen-travel-insurance";
import {visaFlightHotelReservationsGuide} from "./visa-cluster-visa-flight-hotel-reservations";
import {visaApplicationFormMistakesGuide} from "./visa-cluster-visa-application-form-mistakes";
export type GuideExpansion={
 intro:string;
 lead?:string;
 decisionAid?:{title:string;intro:string;steps:{title:string;body:string}[];conclusion:string;sourceUrl:string;accessibleSummary:string};
 contextualLinks?:{section:string;slug:string;label:string;before:string;after:string}[];
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
 "visa-fees":visaFeesGuide,
 "visa-proof-of-funds":visaProofOfFundsGuide,
 "visa-without-travel-history":visaWithoutTravelHistoryGuide,
 "visa-appointment":visaAppointmentGuide,
 "visa-document-translation":visaDocumentTranslationGuide,
 "visa-invitation-letter":visaInvitationLetterGuide,
 "single-vs-multiple-entry-visa":singleVsMultipleEntryVisaGuide,
 "visa-biometrics":visaBiometricsGuide,
 "schengen-travel-insurance":schengenTravelInsuranceGuide,
 "visa-flight-hotel-reservations":visaFlightHotelReservationsGuide,
 "visa-application-form-mistakes":visaApplicationFormMistakesGuide

};
