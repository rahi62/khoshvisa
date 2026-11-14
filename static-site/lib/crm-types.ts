export const stages=["new","contacted","follow_up","qualified","referred","converted","closed","invalid"] as const;
export type Stage=(typeof stages)[number];
export const stageNames:Record<Stage,string>={
 new:"جدید",contacted:"تماس گرفته‌شده",follow_up:"نیازمند پیگیری",
 qualified:"واجد شرایط",referred:"ارجاع ثبت‌شده",converted:"نتیجه مثبت",
 closed:"بسته‌شده",invalid:"نامعتبر"
};
export type LeadRow={
 id:string;wa_id:string;name:string;source:string;stage:Stage;
 destination:string;purpose:string;travel_window:string;tracking_reference:string;
 landing_path:string;message_count:number;first_seen_at:Date;last_contact_at:Date;
 follow_up_at:Date|null;admin_notes:string;partner_consent_at:Date|null;
 partner_consent_provider:string;partner_consent_scope:string;partner_consent_evidence:string;
 referred_to:string;referred_at:Date|null;created_at:Date;updated_at:Date;version:number;
};
