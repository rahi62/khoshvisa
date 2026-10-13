-- Public contact settings. Keep provider identities, private partner arrangements and secrets out.
-- Run npm run db:migrate on the existing dedicated PostgreSQL database before releasing UI.
CREATE TABLE IF NOT EXISTS site_contact_settings (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id=1),
  mobile varchar(11) NOT NULL DEFAULT '09351300502',
  landline varchar(11) NOT NULL DEFAULT '02146010788',
  whatsapp_number varchar(15) NOT NULL DEFAULT '',
  whatsapp_enabled boolean NOT NULL DEFAULT false,
  version integer NOT NULL DEFAULT 0 CHECK (version>=0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT mobile_format CHECK (mobile='' OR mobile ~ '^09[0-9]{9}$'),
  CONSTRAINT landline_format CHECK (landline='' OR landline ~ '^0[1-8][0-9]{9}$'),
  CONSTRAINT whatsapp_format CHECK (whatsapp_number='' OR whatsapp_number ~ '^989[0-9]{9}$'),
  CONSTRAINT whatsapp_active_requires_number CHECK (NOT whatsapp_enabled OR whatsapp_number<>''),
  CONSTRAINT at_least_one_phone CHECK (mobile<>'' OR landline<>'')
);
INSERT INTO site_contact_settings (id,mobile,landline,whatsapp_number,whatsapp_enabled)
VALUES (1,'09351300502','02146010788','',false)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS site_contact_settings_audit (
 id bigserial PRIMARY KEY,
 actor varchar(30) NOT NULL DEFAULT 'admin',
 previous jsonb NOT NULL,
 current jsonb NOT NULL,
 changed_at timestamptz NOT NULL DEFAULT now()
);
