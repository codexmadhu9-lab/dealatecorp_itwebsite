import { createFileRoute } from "@tanstack/react-router";

const RECIPIENT = "dealatecorphr@gmail.com";

type Application = {
  position: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  message?: string;
  resumeLink: string;
};

function isApplication(value: unknown): value is Application {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return ["position", "name", "email", "phone", "qualification", "experience", "resumeLink"]
    .every((key) => typeof data[key] === "string" && data[key].trim().length > 0);
}

export const Route = createFileRoute("/api/career-application")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let data: unknown;
        try {
          data = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }

        if (!isApplication(data) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          return Response.json({ error: "Please provide all required application details" }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.RESEND_FROM_EMAIL;
        if (!apiKey || !from) {
          console.error("Career application email is not configured: RESEND_API_KEY and RESEND_FROM_EMAIL are required");
          return Response.json({ error: "Email service is not configured" }, { status: 503 });
        }

        const emailBody = [
          "New Job Application",
          `Position: ${data.position}`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Qualification: ${data.qualification}`,
          `Experience: ${data.experience}`,
          `Message: ${data.message?.trim() || "-"}`,
          `Resume link: ${data.resumeLink}`,
        ].join("\n");

        try {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to: [RECIPIENT],
              reply_to: data.email,
              subject: `Job application: ${data.position} — ${data.name}`,
              text: emailBody,
            }),
          });

          if (!response.ok) {
            console.error("Career application email provider returned an error", response.status, await response.text());
            return Response.json({ error: "Could not send application email" }, { status: 502 });
          }

          return Response.json({ success: true });
        } catch (error) {
          console.error("Career application email request failed", error);
          return Response.json({ error: "Could not send application email" }, { status: 502 });
        }
      },
    },
  },
});
