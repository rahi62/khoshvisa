from django.test import TestCase
from rest_framework.test import APIClient

from .models import LandingPage


class PublicApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.page = LandingPage.objects.create(
            page_type="visa",
            title="ویزای فرانسه",
            slug="france",
            excerpt="راهنما",
            body="متن",
            meta_title="ویزای فرانسه",
            meta_description="توضیحات ویزای فرانسه",
        )

    def test_visa_list_only_returns_published_visa_pages(self):
        response = self.client.get("/api/v1/visa-services/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["slug"], "france")

    def test_valid_lead_is_created(self):
        response = self.client.post("/api/v1/leads/", {"full_name": "کاربر تست", "phone": "09123456789"}, format="json")
        self.assertEqual(response.status_code, 201)

    def test_invalid_phone_is_rejected(self):
        response = self.client.post("/api/v1/leads/", {"full_name": "کاربر تست", "phone": "123"}, format="json")
        self.assertEqual(response.status_code, 400)

