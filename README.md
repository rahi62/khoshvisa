# خوش ویزا

پلتفرم خدمات تور و ویزا با معماری مستقل فرانت‌اند و بک‌اند.

## ساختار

- `frontend`: Next.js 15 + TypeScript، صفحات SSR/SSG، متادیتای سئو، Sitemap و Schema
- `backend`: Django 5 + Django REST Framework، PostgreSQL و پنل مدیریت محتوا

## اجرای Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_content
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
- API: `http://localhost:8000/api/v1/`
- پنل مدیریت: `http://localhost:8000/admin/`

## مسیرهای API

- `GET /api/v1/settings/`
- `GET /api/v1/visa-services/`
- `GET /api/v1/visa-services/{slug}/`
- `GET /api/v1/tours/`
- `GET /api/v1/tours/{slug}/`
- `POST /api/v1/leads/`

اطلاعات ویزا باید مرتب بازبینی شوند و صدور ویزا قابل تضمین نیست.

## اجرای بدون Docker

این پروژه برای توسعه و استقرار به Docker نیاز ندارد. در توسعه از SQLite یا PostgreSQL محلی و در Production از PostgreSQL مدیریت‌شده استفاده کنید.
