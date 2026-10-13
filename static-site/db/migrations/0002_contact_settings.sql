-- Dedicated contact settings singleton; no third-party data is stored here.
CREATE TABLE IF NOT EXISTS contact_settings (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  support_mobile varchar(15) NOT NULL CHECK (support_mobile ~ '^09[0-9]{9}$'),
  support_landline varchar(15) NOT NULL CHECK (support_landline ~ '^0[1-8][0-9]{9}$'),
  version integer NOT NULL DEFAULT 0 CHECK (version >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO contact_settings(id, support_mobile, support_landline)
VALUES (1, '09351300502', '02146010788')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS contact_settings_audit (
  id bigserial PRIMARY KEY,
  actor varchar(80) NOT NULL,
  old_mobile varchar(15) NOT NULL,
  new_mobile varchar(15) NOT NULL,
  old_landline varchar(15) NOT NULL,
  new_landline varchar(15) NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
