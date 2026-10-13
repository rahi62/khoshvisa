-- Standalone site-settings schema: does not create CRM/leads tables.
CREATE TABLE IF NOT EXISTS site_settings (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  brand_name varchar(120) NOT NULL DEFAULT 'خوش‌ویزا',
  brand_name_en varchar(120) NOT NULL DEFAULT 'KhoshVisa',
  tagline varchar(220) NOT NULL DEFAULT 'راهنمای فارسی ویزای توریستی',
  footer_description varchar(600) NOT NULL DEFAULT 'راهنمای فارسی ویزای توریستی؛ برای تصمیم‌گیری آگاهانه، برنامه‌ریزی دقیق و سفرهای خاطره‌انگیز.',
  logo_url text NOT NULL DEFAULT '',
  favicon_url text NOT NULL DEFAULT '',
  support_mobile varchar(11) NOT NULL DEFAULT '09351300502',
  support_landline varchar(11) NOT NULL DEFAULT '02146010788',
  whatsapp_number varchar(15) NOT NULL DEFAULT '',
  whatsapp_enabled boolean NOT NULL DEFAULT false,
  email varchar(254) NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  telegram_url text NOT NULL DEFAULT '',
  default_meta_title varchar(180) NOT NULL DEFAULT 'خوش‌ویزا | ویزای توریستی و راهنمای سفر',
  default_meta_description varchar(320) NOT NULL DEFAULT 'راهنمای تخصصی ویزای توریستی شینگن، کانادا، انگلیس، ژاپن و دیگر مقصدها؛ شرایط، مدارک، هزینه‌ها و مسیر درخواست.',
  default_og_image_url text NOT NULL DEFAULT '',
  version integer NOT NULL DEFAULT 0 CHECK (version >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_mobile_valid CHECK (support_mobile = '' OR support_mobile ~ '^09[0-9]{9}$'),
  CONSTRAINT site_landline_valid CHECK (support_landline = '' OR support_landline ~ '^0[1-8][0-9]{9}$'),
  CONSTRAINT site_has_phone CHECK (support_mobile <> '' OR support_landline <> ''),
  CONSTRAINT site_wa_valid CHECK (whatsapp_number = '' OR whatsapp_number ~ '^989[0-9]{9}$'),
  CONSTRAINT site_wa_active_has_number CHECK (NOT whatsapp_enabled OR whatsapp_number <> '')
);
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS site_settings_audit (
  id bigserial PRIMARY KEY,
  actor varchar(40) NOT NULL,
  old_settings jsonb NOT NULL,
  new_settings jsonb NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);
-- Current admin login rate limiter needs this table even without the CRM migration.
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  ip_hash char(64) PRIMARY KEY,
  failures integer NOT NULL DEFAULT 0,
  started_at timestamptz NOT NULL DEFAULT now(),
  blocked_until timestamptz
);
