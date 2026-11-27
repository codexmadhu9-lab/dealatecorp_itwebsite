import {
  additionalProfiles,
  cohort,
  collegeName,
  courses,
  partnerColleges,
  studentColleges,
  tracks,
} from "./catalog.mjs";
import { application, applicationReceived, home, privacy } from "./views.mjs";

const assets = "/internship-assets";
const availableCourses = courses.map(([id, name, normal, advanced]) => ({
  id,
  name,
  normal,
  advanced,
}));
const data = {
  courses: availableCourses,
  colleges: [
    { id: "gmrit", name: collegeName, localUrl: `${assets}/assets/gmrit.png` },
    ...partnerColleges.map(([id, name, asset, type]) => ({
      id,
      name,
      localUrl: type ? `${assets}/assets/${asset}` : asset,
    })),
  ],
  testimonials: [
    ...cohort.map(([id, name, department], index) => ({
      id: `gmrit-${id}`,
      name,
      department,
      college: studentColleges[index % studentColleges.length],
      hasImage: true,
      localUrl: `${assets}/portraits/${id}.jpg`,
    })),
    ...additionalProfiles.map(([id, name, department]) => ({
      id,
      name,
      department,
      college: partnerColleges[0][1],
      hasImage: true,
      localUrl: `${assets}/portraits/${id}.webp`,
    })),
  ],
  hero: [],
  certificates: [],
};

function html(markup, status = 200) {
  // Keep the imported site's URLs and styles inside its own namespace.
  const body = markup
    .replace(/(["'])\/(?!\/)([^"']*)/g, (_, quote, path) => {
      if (path.startsWith("internship-assets/")) return `${quote}/${path}`;
      if (/^(assets\/|(?:style|tokens|base)\.css|site\.js)/.test(path))
        return `${quote}${assets}/${path}`;
      return `${quote}/internship/${!path || /^[?#]/.test(path) ? "content" : ""}${path}`;
    })
    .replace('href="https://www.dealatecorp.in/"', 'href="/" target="_top"');
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

const json = (message, status) => Response.json({ message }, { status });
const emailPattern =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;
const rateBuckets = new Map();
function rate(key, max) {
  const now = Date.now();
  let bucket = rateBuckets.get(key);
  if (!bucket || bucket.end <= now) {
    for (const [id, entry] of rateBuckets) if (entry.end <= now) rateBuckets.delete(id);
    if (rateBuckets.size >= 5000) return false;
    bucket = { count: 0, end: now + 600000 };
    rateBuckets.set(key, bucket);
  }
  return ++bucket.count <= max;
}

export async function handleInternship(request, deliver = fetch) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "");
  if (request.method === "GET") {
    if (path === "/internship/content")
      return html(home(data, url.searchParams.get("course"), "", crypto.randomUUID()));
    if (path === "/internship/privacy") return html(privacy({ persistApplications: false }));
    if (path === "/internship/apply")
      return html(
        application(availableCourses, {
          course: url.searchParams.get("course"),
          track: url.searchParams.get("track"),
          requestId: crypto.randomUUID(),
        }),
      );
    if (
      path === "/internship/apply/received" &&
      /^DC-[0-9A-F]{32}$/.test(url.searchParams.get("reference") || "")
    )
      return html(applicationReceived(url.searchParams.get("reference")));
    return new Response("Page not found", { status: 404 });
  }
  if (path !== "/internship/apply" || request.method !== "POST")
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, POST" } });
  if (request.headers.get("origin") !== url.origin)
    return json("Submit the form from the Dealatecorp site.", 403);
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown";
  if (!rate(`apply/${ip}`, 100)) return json("Too many attempts. Please try again later.", 429);
  const type = request.headers.get("content-type") || "";
  if (!/^(application\/x-www-form-urlencoded|multipart\/form-data)(?:;|$)/i.test(type))
    return json("Submit the form from the website.", 415);
  // Read with a limit even when a request has no Content-Length header.
  const reader = request.body?.getReader();
  const chunks = [];
  let length = 0;
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16 * 1024) {
        await reader.cancel();
        return json("The form is too large.", 413);
      }
      chunks.push(value);
    }
  }
  let form;
  try {
    form = await new Response(new Blob(chunks), { headers: { "Content-Type": type } }).formData();
  } catch {
    return json("The form could not be read.", 400);
  }
  const values = Object.fromEntries(
    ["requestId", "course", "track", "name", "email", "college", "phone"].map((key) => [
      key,
      typeof form.get(key) === "string" ? form.get(key).trim() : "",
    ]),
  );
  const course = availableCourses.find((item) => item.id === values.course);
  let message = "";
  if (!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(values.requestId))
    message = "Reload the form before submitting.";
  else if (!course || !Object.hasOwn(tracks, values.track))
    message = "Select a valid course and duration.";
  else if (values.name.length < 2 || values.name.length > 120)
    message = "Enter a full name between 2 and 120 characters.";
  else if (values.email.length > 254 || !emailPattern.test(values.email))
    message = "Enter a valid email address.";
  else if (values.college.length < 2 || values.college.length > 160)
    message = "Enter your college or university.";
  else if (!/^\+?[0-9 ()-]{7,30}$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7)
    message = "Enter a valid phone number.";
  const wantsJson = request.headers.get("accept") === "application/json";
  if (message)
    return wantsJson
      ? json(message, 422)
      : html(application(availableCourses, values, message), 422);
  if (!rate(`email/${values.email.toLowerCase()}`, 8))
    return json("Too many attempts for this email. Please try again later.", 429);
  const reference = `DC-${crypto.randomUUID().replaceAll("-", "").toUpperCase()}`;
  try {
    const response = await deliver("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        user_id: "7jlnugNTa693uCIbD",
        service_id: "service_zej18hh",
        template_id: "template_gl9vfff",
        template_params: {
          name: values.name,
          email: values.email,
          from_name: values.name,
          reply_to: values.email,
          title: "Dealatecorp internship application",
          time: new Date().toISOString(),
          message: [
            `Application reference: ${reference}`,
            `College or university: ${values.college}`,
            `Phone: ${values.phone}`,
            `Course: ${course.name}`,
            `Duration: ${tracks[values.track].duration} — ${tracks[values.track].label}`,
          ].join("\n"),
        },
      }),
    });
    if (!response.ok) throw new Error("Email delivery failed");
  } catch {
    message = "We could not send your application. Please try again or email HR.";
    return wantsJson
      ? json(message, 502)
      : html(application(availableCourses, values, message), 502);
  }
  return wantsJson
    ? Response.json({ reference, requestId: crypto.randomUUID() }, { status: 201 })
    : new Response(null, {
        status: 303,
        headers: { Location: `/internship/apply/received?reference=${reference}` },
      });
}
