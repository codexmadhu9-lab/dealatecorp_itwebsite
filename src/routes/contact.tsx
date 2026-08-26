import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { SectionHead } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dealatecorp Innovations Pvt Ltd" },
      { name: "description", content: "Get in touch with Dealatecorp Innovations. Offices in Dwaraka Nagar and Pendurthi, Visakhapatnam." },
    ],
  }),
  component: ContactPage,
});

const WHATSAPP = "918978764094";

function ContactPage() {
  return (
    <>
      <section className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-foreground/10 p-10 md:p-16">
          <div className="absolute inset-0 -z-10 bg-mesh opacity-70" />
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              Let's build something <span className="text-gradient">great together.</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Tell us about your product, platform or transformation goal. Our team responds within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-x mt-16">
        <SectionHead eyebrow="Our offices" title={<>Visit us in <span className="text-gradient">Visakhapatnam</span></>} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <OfficeCard
            title="Corporate Office — Dwaraka Nagar"
            lines={[
              "2nd Floor, Sri Satri Residency",
              "Opposite Shankara Matam, Sankar Matam Road",
              "Dwaraka Nagar, Visakhapatnam",
              "Andhra Pradesh 530016",
            ]}
            mapUrl="https://maps.app.goo.gl/Kw1nLdCdeMpr9UwN8"
          />
          <OfficeCard
            title="Branch Office — Pendurthi"
            lines={[
              "B Zone, Chinnamushidiwada",
              "Pendurthi, Purushottapuram Colony",
              "Visakhapatnam",
              "Andhra Pradesh 530051",
            ]}
            mapUrl="https://maps.app.goo.gl/hvBmcSxD3TwqzHzj7"
          />
        </div>
      </section>

      <section className="container-x mt-16">
        <ContactForm />
      </section>
    </>
  );
}

function OfficeCard({ title, lines, mapUrl }: { title: string; lines: string[]; mapUrl: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-foreground/10 bg-background p-8 shadow-card"
    >
      <div className="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
        <MapPin size={18} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <iframe
        title={`${title} map`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(lines.join(", "))}&output=embed`}
        className="mt-5 h-48 w-full rounded-2xl border-0 grayscale-[.25]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:border-foreground/40"
      >
        Open in Google Maps <ExternalLink size={14} />
      </a>
    </motion.div>
  );
}

function ContactForm() {
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parts = [
      `*New Contact Message*`,
      `Name: ${fd.get("name")}`,
      `Phone: ${fd.get("phone")}`,
      `Subject: ${fd.get("subject")}`,
      `Message: ${fd.get("message")}`,
      file ? `File: ${file.name} (uploaded successfully)` : `File: not attached`,
    ];
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(parts.join("\n"))}`;
    window.open(url, "_blank");
    (e.currentTarget as HTMLFormElement).reset();
    setFile(null);
  };
  return (
    <div className="grid gap-10 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:grid-cols-[1fr_1.2fr] md:p-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Send a message</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
          Have a project in mind? <span className="text-gradient">Tell us more.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Fill in the form and we'll redirect you to WhatsApp with your message prefilled so we can start the conversation instantly.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <div className="grid gap-3 md:grid-cols-2">
          <FormInput name="name" placeholder="Full name" required />
          <FormInput name="phone" placeholder="Phone number" required />
          <FormInput name="subject" placeholder="Subject" required />
        </div>
        <textarea
          name="message"
          placeholder="How can we help?"
          rows={5}
          required
          className="w-full rounded-xl border border-foreground/15 bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-foreground/25 bg-background/50 px-4 py-3 text-sm">
          <span className="text-muted-foreground">{file ? file.name : "Attach a file (optional)"}</span>
          <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs">Choose file</span>
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-glow"
          style={{ background: "var(--gradient-brand)" }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-foreground/15 bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
    />
  );
}
