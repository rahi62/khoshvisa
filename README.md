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
# Windows: .venv\\Scripts\\activate
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

Admin در Production فقط روی `127.0.0.1:3001` اجرا می‌شود و Nginx مسیر `https://khoshvisa.ir/cms/` را به آن proxy می‌کند. Browser مستقیماً به `api.khoshvisa.ir` درخواست نمی‌زند؛ درخواست‌ها ابتدا به `/cms/api-proxy/*` می‌روند و Next.js Admin آن‌ها را server-side به این upstream می‌فرستد:

```text
https://api.khoshvisa.ir/api/cms/v1
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

یک‌بار روی سرور setup انجام می‌شود. پس از آن GitHub Actions در هر deploy نسخه pin‌شده `@digitalafarin/cms-admin@0.4.0` را در staging scaffold و build می‌کند و فقط بعد از build، restart و health-check موفق، نسخه فعال را جایگزین نهایی می‌کند. اگر activation یا proxy health-check fail شود، نسخه قبلی Admin برمی‌گردد.

## WordPress headless integration

فرانت‌اند یک REST client مستقل و server-side در `frontend/lib/wordpress.ts` دارد. برای اتصال محلی، این مقادیر را در `frontend/.env.local` قرار بده:

```env
WORDPRESS_BASE_URL=https://cms.khoshvisa.ir
WORDPRESS_REST_API_PATH=/wp-json/wp/v2
```

اگر WordPress در مسیر دیگری نصب شده، مقدار base URL باید همان مسیر نصب را هم داشته باشد؛ مثلاً `https://example.com/cms`. مسیر REST API قابل تنظیم است و در صورت حذف، به `/wp-json/wp/v2` برمی‌گردد. این متغیرها server-only هستند و نباید `NEXT_PUBLIC_` داشته باشند.

### مسیرهای متصل

- `/blog`: فهرست نوشته‌های منتشرشده، ۱۲ نوشته در هر صفحه
- `/blog/{slug}`: صفحه مقاله، تصویر شاخص، تاریخ، نویسنده و SEO metadata
- برگه‌های WordPress: در مسیر permalink خودشان، پس از بررسی عدم وجود محتوای هم‌مسیر در DigitalAfarin CMS
- Sitemap: نوشته‌ها و برگه‌های منتشرشده WordPress به sitemap فعلی افزوده می‌شوند

محتوای DigitalAfarin CMS برای مسیرهای موجود اولویت دارد. صفحات اختصاصی `/visa/{slug}` و `/tours/{slug}` و canonical فعلی آن‌ها تغییر نمی‌کنند. اگر WordPress پاسخ ندهد یا متغیرهای اتصال تنظیم نشده باشند، مسیرهای فعلی سایت بدون وابستگی به WordPress کار می‌کنند.

### تست محلی

1. مقادیر بالا را در `frontend/.env.local` قرار بده.
2. مطمئن شو REST API روی `https://cms.khoshvisa.ir/wp-json/wp/v2` در دسترس است.
3. حداقل یک نوشته با وضعیت Published در WordPress داشته باش.
4. فرانت‌اند را با `npm run dev` اجرا کن و مسیرهای `/blog` و `/blog/{slug}` را بررسی کن.
5. یک برگه منتشرشده را با permalink خودش باز کن؛ اگر همان مسیر در DigitalAfarin CMS وجود داشته باشد، محتوای CMS نمایش داده می‌شود.

**ملاحظات مهاجرت و سئو:** این اتصال هیچ نوشته‌ای را خودکار منتقل یا منتشر نمی‌کند و هیچ slug یا canonical موجودی را تغییر نمی‌دهد. قبل از انتقال صفحات خدمات ویزا یا تور به WordPress، باید URL inventory و نگاشت slugها به‌صورت جداگانه بررسی شود. محتوای HTML خروجی WordPress به‌عنوان محتوای قابل اعتماد همان سایت رندر می‌شود؛ دسترسی و نقش کاربرانی که در WordPress محتوا منتشر می‌کنند باید کنترل شود.
