# خوش ویزا

پلتفرم خدمات تور و ویزا با معماری مستقل فرانت‌اند، بک‌اند و پنل مدیریت محتوای DigitalAfarin CMS.

## ساختار

- `frontend`: Next.js 15 + TypeScript، صفحات SSR/SSG، متادیتای سئو، Sitemap و Schema
- `backend`: Django 5 + Django REST Framework + PostgreSQL + APIهای DigitalAfarin CMS
- `khoshvisa.ir/cms`: پنل مدیریتی Next.js از پکیج `@digitalafarin/cms-admin`

Django Admin همچنان برای امور فنی و نگهداری در دسترس است، اما مدیریت روزمره محتوا باید از `/cms` انجام شود.

## اجرای Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_content
python manage.py seed_cms --domain localhost:3000
python manage.py createsuperuser
python manage.py runserver
```

## اجرای Frontend

```bash
cd frontend
npm install
npm run dev
```

- سایت: `http://localhost:3000`
- API عمومی: `http://localhost:8000/api/v1/`
- CMS API: `http://localhost:8000/api/cms/v1/`
- Django Admin فنی: `http://localhost:8000/admin/`

## اجرای CMS Admin در توسعه

از ریشه پروژه:

```bash
npx @digitalafarin/cms-admin@0.4.0 scaffold \
  --dir .cms-admin \
  --base-path /cms \
  --api-url http://127.0.0.1:8000/api/cms/v1 \
  --port 3001
```

سپس:

```bash
cd .cms-admin
npm run dev
```

پنل روی آدرس زیر در دسترس است:

```text
http://localhost:3001/cms/
```

مرورگر برای درخواست‌های CMS از proxy داخلی `/cms/api-proxy/*` استفاده می‌کند و خود Next.js Admin درخواست‌ها را server-side به Django می‌فرستد.

## مسیرهای API عمومی

- `GET /api/v1/settings/`
- `GET /api/v1/visa-services/`
- `GET /api/v1/visa-services/{slug}/`
- `GET /api/v1/tours/`
- `GET /api/v1/tours/{slug}/`
- `POST /api/v1/leads/`

اطلاعات ویزا باید مرتب بازبینی شوند و صدور ویزا قابل تضمین نیست.

## اجرای بدون Docker

این پروژه برای توسعه و استقرار به Docker نیاز ندارد. در توسعه از SQLite یا PostgreSQL محلی و در Production از PostgreSQL استفاده می‌شود.

## DigitalAfarin CMS rollout

برای rollout پنل جدید، Backend و Admin روی v0.4 هستند:

- Backend: `digitalafarin-cms[all]==0.4.0`
- Admin: `@digitalafarin/cms-admin@0.4.0`
- Frontend SDK عمومی: فعلاً `@digitalafarin/cms-next@0.2.1` باقی مانده تا ارتقای آن جداگانه با regression test انجام شود
- API: `/api/cms/v1/`
- پنل اصلی مدیریت محتوا: `/cms/`

برای Production فرانت‌اند:

```env
DIGITALAFARIN_CMS_URL=https://api.khoshvisa.ir/api/cms/v1
DIGITALAFARIN_CMS_SITE=khoshvisa.ir
```

Admin در Production روی پورت داخلی `3001` اجرا می‌شود و Nginx مسیر `https://khoshvisa.ir/cms/` را به آن proxy می‌کند. Admin برای اتصال به Django از آدرس داخلی زیر استفاده می‌کند:

```text
http://127.0.0.1:8000/api/cms/v1
```

مدل قبلی لندینگ در دوره مهاجرت به‌عنوان fallback باقی مانده است. صفحات داخلی ابتدا محتوای CMS و در صورت عدم دسترسی، API قبلی را دریافت می‌کنند.

## مدیریت محتوا

از پنل `/cms` قابل مدیریت است:

- صفحات، مقالات، تورها و خدمات ویزا
- Media Library
- دسته‌ها و Taxonomy
- منوها
- SEO Meta و Schema
- Redirectها و Internal Links
- SEO Audit و Audit Trends
- Search Performance و Content Decay
- SEO Opportunities
- Site Settings و تنظیمات SEO سایت

تنظیمات یا عملیات زیر همچنان ماهیت فنی دارند و در صورت نیاز می‌توانند از Django Admin مدیریت شوند:

- کاربران سطح سیستم و Superuser
- بررسی مستقیم مدل‌های دیتابیس برای عیب‌یابی
- عملیات اضطراری و نگهداری

طبق تصمیم محصول، مدل مستقل شعب فعلاً ایجاد نشده و نشانی‌های فعلی فقط در تنظیمات عمومی نگهداری می‌شوند.

## استقرار `/cms` روی VPS

فایل‌های آماده استقرار:

```text
deploy/khoshvisa-cms-admin.service
deploy/nginx.cms.conf
deploy/install-cms-admin.sh
```

یک‌بار روی سرور setup انجام می‌شود. پس از آن GitHub Actions در هر deploy نسخه pin‌شده `@digitalafarin/cms-admin@0.4.0` را در staging scaffold و build می‌کند و فقط بعد از build موفق، نسخه فعال را جایگزین می‌کند.
