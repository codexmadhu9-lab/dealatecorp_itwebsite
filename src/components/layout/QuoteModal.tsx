import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SERVICES = [
  "Salesforce Development", "Java Development", "Python Development", "Machine Learning",
  "Artificial Intelligence", "Cloud Computing", "Business Intelligence", "Application Development",
  "Web Development", "Mobile App Development", "API Integration", "Digital Transformation",
  "Business Consulting", "Customer Support Solutions", "CRM Software", "ERP Solutions",
  "HRMS", "Inventory Management", "Accounting Software", "Project Management", "Enterprise Applications",
];

const WHATSAPP = "918978764094";

export function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "*New Project / Quote Request*",
      `Name: ${form.get("name")}`,
      `Company: ${form.get("company") || "-"}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email") || "-"}`,
      `Service: ${form.get("service")}`,
      `Project details: ${form.get("details") || "-"}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-background p-6 shadow-2xl md:p-8" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} onClick={(event) => event.stopPropagation()}>
            <button onClick={onClose} aria-label="Close quote form" className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-foreground/5"><X size={18} /></button>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Start a project</p>
            <h2 className="mt-2 text-3xl font-semibold">Tell us what you need.</h2>
            <p className="mt-2 text-sm text-muted-foreground">Choose a service and share your details. Submit opens WhatsApp with your request ready to send.</p>
            <form onSubmit={submit} className="mt-6 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field name="name" placeholder="Your name" required />
                <Field name="phone" placeholder="Phone number" required />
                <Field name="company" placeholder="Company name (optional)" />
                <Field name="email" type="email" placeholder="Email (optional)" />
              </div>
              <select name="service" required defaultValue="" className="w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
              <textarea name="details" rows={4} placeholder="Briefly describe your project" className="w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <button type="submit" className="mt-1 rounded-full px-5 py-3 text-sm font-medium text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>Send Request on WhatsApp</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none focus:border-primary" />;
}
