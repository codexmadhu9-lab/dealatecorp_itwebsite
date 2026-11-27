import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { handleInternship } from "../src/features/internship/handler.mjs";

const origin = "http://localhost";
const valid = {
  requestId: crypto.randomUUID(),
  course: "python",
  track: "advanced",
  name: "Test Student",
  email: "student@example.com",
  college: "Test University",
  phone: "+91 9876543210",
};
const post = (values = valid, headers = {}) =>
  new Request(`${origin}/internship/apply`, {
    method: "POST",
    headers: { origin, accept: "application/json", ...headers },
    body: new URLSearchParams(values),
  });

test("portfolio contains all courses and profiles with local assets and namespaced links", async () => {
  const response = await handleInternship(new Request(`${origin}/internship/content?course=java`));
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.equal((html.match(/data-course="/g) || []).length, 8);
  assert.equal((html.match(/class="story"/g) || []).length, 12);
  assert.match(html, /data-course="java"[^>]*aria-current="true"/);
  assert.match(html, /action="\/internship\/apply"/);
  assert.doesNotMatch(html, /(?:src|href|action)="\/(?:assets|media|apply|privacy)(?:[\/"?])/);
  for (const [, path] of html.matchAll(
    /(?:src|srcset|href)="(\/internship-assets\/[^"?#]+)(?:[^" ]*)"/g,
  )) {
    assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `Missing asset: ${path}`);
  }
});

test("application and privacy support direct visits", async () => {
  const response = await handleInternship(
    new Request(`${origin}/internship/apply?course=java&track=normal`),
  );
  const html = await response.text();
  assert.match(html, /value="java" selected/);
  assert.match(html, /value="normal" selected/);
  assert.equal((await handleInternship(new Request(`${origin}/internship/privacy`))).status, 200);
  assert.equal((await handleInternship(new Request(`${origin}/internship/unknown`))).status, 404);
});

test("invalid applications and cross-origin posts never call the email service", async () => {
  const fail = () => {
    assert.fail("Unexpected email delivery");
  };
  assert.equal(
    (await handleInternship(post(valid, { origin: "https://example.com" }), fail)).status,
    403,
  );
  for (const values of [
    { ...valid, email: "invalid" },
    { ...valid, track: "__proto__" },
    { ...valid, course: "unknown" },
    { ...valid, phone: "abc" },
    { ...valid, requestId: "" },
  ]) {
    assert.equal((await handleInternship(post(values), fail)).status, 422);
  }
  assert.equal(
    (await handleInternship(post({ ...valid, name: "a".repeat(17000) }), fail)).status,
    413,
  );
});

test("valid submissions use the original EmailJS template and show confirmed delivery", async () => {
  let sent;
  const deliver = async (url, options) => {
    assert.equal(url, "https://api.emailjs.com/api/v1.0/email/send");
    sent = JSON.parse(options.body);
    return new Response("OK");
  };
  const response = await handleInternship(post(), deliver);
  assert.equal(response.status, 201);
  assert.match((await response.json()).reference, /^DC-[0-9A-F]{32}$/);
  assert.equal(sent.template_id, "template_gl9vfff");
  assert.match(sent.template_params.message, /Python Programming/);
  assert.match(sent.template_params.message, /3 Months/);
  const fallback = await handleInternship(post(valid, { accept: "text/html" }), deliver);
  assert.equal(fallback.status, 303);
  assert.equal(
    (await handleInternship(new Request(origin + fallback.headers.get("location")))).status,
    200,
  );
});

test("delivery failures keep the application available and do not show success", async () => {
  const response = await handleInternship(
    post(),
    async () => new Response("Failed", { status: 500 }),
  );
  assert.equal(response.status, 502);
  assert.match((await response.json()).message, /could not send/);
});
