-- Fresh dedicated PostgreSQL database; transactional migration.
CREATE TABLE IF NOT EXISTS leads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 wa_id varchar(20) NOT NULL UNIQUE CHECK (wa_id ~ '^[1-9][0-9]{7,14}$'),
 name varchar(120) NOT NULL DEFAULT '',
 source varchar(24) NOT NULL CHECK (source IN ('whatsapp_webhook','whatsapp_manual')),
 stage varchar(24) NOT NULL DEFAULT 'new'
   CHECK (stage IN ('new','contacted','follow_up','qualified','referred','converted','closed','invalid')),
 destination varchar(80) NOT NULL DEFAULT '',
 purpose varchar(80) NOT NULL DEFAULT '',
 travel_window varchar(80) NOT NULL DEFAULT '',
 tracking_reference varchar(32) NOT NULL DEFAULT '',
 landing_path varchar(200) NOT NULL DEFAULT '',
 message_count integer NOT NULL DEFAULT 0 CHECK (message_count >= 0),
 first_seen_at timestamptz NOT NULL DEFAULT now(),
 last_contact_at timestamptz NOT NULL DEFAULT now(),
 follow_up_at timestamptz,
 admin_notes text NOT NULL DEFAULT '',
 partner_consent_at timestamptz,
 partner_consent_provider varchar(160) NOT NULL DEFAULT '',
 partner_consent_scope varchar(240) NOT NULL DEFAULT '',
 partner_consent_evidence varchar(190) NOT NULL DEFAULT '',
 referred_to varchar(160) NOT NULL DEFAULT '',
 referred_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 version integer NOT NULL DEFAULT 0,
 CONSTRAINT partner_consent_complete CHECK (
    partner_consent_at IS NULL OR (
       partner_consent_provider <> '' AND partner_consent_scope <> '' AND partner_consent_evidence <> ''
    )
 ),
 CONSTRAINT referral_requires_consent CHECK (
    referred_at IS NULL OR (
       partner_consent_at IS NOT NULL AND referred_to <> '' AND referred_to = partner_consent_provider
    )
 ),
 CONSTRAINT stage_referral_is_recorded CHECK (
    stage <> 'referred' OR referred_at IS NOT NULL
 )
);
CREATE INDEX IF NOT EXISTS leads_stage_due_idx ON leads(stage,follow_up_at);
CREATE INDEX IF NOT EXISTS leads_recent_idx ON leads(last_contact_at DESC);
CREATE INDEX IF NOT EXISTS leads_ref_idx ON leads(tracking_reference);
CREATE TABLE IF NOT EXISTS whatsapp_inbound_events (
 message_id varchar(190) PRIMARY KEY,
 sender_wa_id varchar(20) NOT NULL,
 lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
 kind varchar(32) NOT NULL DEFAULT '',
 received_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inbound_lead_idx ON whatsapp_inbound_events(lead_id);
CREATE TABLE IF NOT EXISTS lead_audit (
 id bigserial PRIMARY KEY,
 lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
 actor varchar(80) NOT NULL,
 action varchar(40) NOT NULL,
 old_stage varchar(24),
 new_stage varchar(24),
 occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lead_audit_history_idx ON lead_audit(lead_id,occurred_at DESC);
CREATE TABLE IF NOT EXISTS admin_login_attempts (
 ip_hash char(64) PRIMARY KEY,
 failures integer NOT NULL DEFAULT 0,
 started_at timestamptz NOT NULL DEFAULT now(),
 blocked_until timestamptz
);
