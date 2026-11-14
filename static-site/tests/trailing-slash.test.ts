import test from "node:test";
import assert from "node:assert/strict";
import {needsTrailingSlashRedirect, trailingSlashRedirectUrl} from "../middleware";

test("root and already-slashed page paths are not redirected", () => {
  assert.equal(needsTrailingSlashRedirect("/", "GET"), false);
  assert.equal(needsTrailingSlashRedirect("/uk-10-year-visa/", "GET"), false);
});

test("page path without trailing slash is redirected", () => {
  assert.equal(needsTrailingSlashRedirect("/uk-10-year-visa", "GET"), true);
  assert.equal(needsTrailingSlashRedirect("/uk-10-year-visa", "HEAD"), true);
});

test("API and admin paths are excluded", () => {
  assert.equal(needsTrailingSlashRedirect("/api/x", "GET"), false);
  assert.equal(needsTrailingSlashRedirect("/admin", "GET"), false);
  assert.equal(needsTrailingSlashRedirect("/admin/x", "GET"), false);
});

test("file-like paths and Next internals are excluded", () => {
  assert.equal(needsTrailingSlashRedirect("/sitemap.xml", "GET"), false);
  assert.equal(needsTrailingSlashRedirect("/_next/x", "GET"), false);
});

test("non-GET and non-HEAD methods are not redirected", () => {
  assert.equal(needsTrailingSlashRedirect("/x", "POST"), false);
});

test("pathname keeps an existing trailing slash and query string is preserved", () => {
  const incoming = new URL("https://khoshvisa.ir/uk-10-year-visa/?utm_source=test&page=2");
  assert.equal(incoming.pathname, "/uk-10-year-visa/");
  assert.equal(needsTrailingSlashRedirect(incoming.pathname, "GET"), false);

  const unslashed = new URL("https://khoshvisa.ir/uk-10-year-visa?utm_source=test&page=2");
  const redirected = trailingSlashRedirectUrl(unslashed);
  assert.equal(redirected.pathname, "/uk-10-year-visa/");
  assert.equal(redirected.search, "?utm_source=test&page=2");
});
