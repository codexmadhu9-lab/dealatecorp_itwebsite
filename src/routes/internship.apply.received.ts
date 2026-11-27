import { createFileRoute } from "@tanstack/react-router";
import { handleInternship } from "@/features/internship/handler.mjs";

export const Route = createFileRoute("/internship/apply/received")({
  server: { handlers: { GET: ({ request }) => handleInternship(request) } },
});
