import { createFileRoute } from "@tanstack/react-router";
import { handleInternship } from "@/features/internship/handler.mjs";

export const Route = createFileRoute("/internship/apply")({
  server: {
    handlers: {
      GET: ({ request }) => handleInternship(request),
      POST: ({ request }) => handleInternship(request),
    },
  },
});
