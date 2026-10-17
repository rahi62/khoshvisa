/** Manual country-topic linking; no indiscriminate all-to-all links. */
export const moneyClusterLinks:Record<string,string[]>={
  "schengen-visa": [
    "visa-proof-of-funds",
    "visa-appointment",
    "visa-document-translation",
    "single-vs-multiple-entry-visa",
    "visa-biometrics",
    "schengen-travel-insurance",
    "visa-flight-hotel-reservations",
    "visa-application-form-mistakes"
  ],
  "canada-tourist-visa": [
    "visa-proof-of-funds",
    "visa-without-travel-history",
    "visa-invitation-letter",
    "single-vs-multiple-entry-visa",
    "visa-biometrics",
    "visa-application-form-mistakes"
  ],
  "uk-tourist-visa": [
    "visa-proof-of-funds",
    "visa-without-travel-history",
    "visa-document-translation",
    "visa-invitation-letter",
    "single-vs-multiple-entry-visa",
    "visa-biometrics",
    "visa-application-form-mistakes"
  ],
  "france-tourist-visa": [
    "visa-appointment",
    "visa-document-translation",
    "visa-proof-of-funds",
    "visa-biometrics",
    "schengen-travel-insurance",
    "visa-flight-hotel-reservations",
    "visa-application-form-mistakes"
  ],
  "germany-tourist-visa": [
    "visa-appointment",
    "visa-document-translation",
    "visa-proof-of-funds",
    "visa-biometrics",
    "schengen-travel-insurance",
    "visa-flight-hotel-reservations",
    "visa-application-form-mistakes"
  ],
  "italy-tourist-visa": [
    "visa-appointment",
    "visa-document-translation",
    "visa-proof-of-funds",
    "visa-biometrics",
    "schengen-travel-insurance",
    "visa-flight-hotel-reservations",
    "visa-application-form-mistakes"
  ],
  "japan-tourist-visa": [
    "visa-appointment",
    "visa-document-translation",
    "single-vs-multiple-entry-visa"
  ],
  "australia-tourist-visa": [
    "visa-proof-of-funds",
    "visa-without-travel-history",
    "visa-document-translation",
    "visa-invitation-letter",
    "single-vs-multiple-entry-visa",
    "visa-biometrics",
    "visa-application-form-mistakes"
  ]
};
export const articleGuideLinks:Record<string,string[]>={
  "visa-documents": [
    "visa-proof-of-funds",
    "visa-document-translation",
    "visa-invitation-letter",
    "visa-biometrics",
    "schengen-travel-insurance",
    "visa-application-form-mistakes"
  ],
  "visa-rejection": [
    "visa-without-travel-history",
    "visa-proof-of-funds",
    "visa-application-form-mistakes"
  ],
  "visa-fees": [
    "visa-appointment",
    "visa-proof-of-funds",
    "schengen-travel-insurance",
    "visa-biometrics"
  ],
  "visa-proof-of-funds": [
    "visa-documents",
    "visa-invitation-letter",
    "visa-rejection"
  ],
  "visa-without-travel-history": [
    "visa-documents",
    "visa-proof-of-funds",
    "visa-rejection"
  ],
  "visa-appointment": [
    "visa-documents",
    "visa-fees",
    "visa-biometrics"
  ],
  "visa-document-translation": [
    "visa-documents",
    "visa-appointment"
  ],
  "visa-invitation-letter": [
    "visa-proof-of-funds",
    "visa-documents"
  ],
  "single-vs-multiple-entry-visa": [
    "visa-appointment",
    "visa-fees"
  ],
  "visa-biometrics": [
    "visa-appointment",
    "visa-fees",
    "visa-documents"
  ],
  "schengen-travel-insurance": [
    "visa-flight-hotel-reservations",
    "visa-documents"
  ],
  "visa-flight-hotel-reservations": [
    "schengen-travel-insurance",
    "visa-invitation-letter",
    "visa-application-form-mistakes"
  ],
  "visa-application-form-mistakes": [
    "visa-documents",
    "visa-flight-hotel-reservations",
    "visa-rejection"
  ]
};
