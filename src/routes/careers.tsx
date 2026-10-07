import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X, Briefcase, Code, Cloud, Cpu, Database, Users, Headphones, LineChart, Sparkles, ArrowRight } from "lucide-react";
import { SectionHead } from "./index";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Dealatecorp Innovations Pvt Ltd" },
      { name: "description", content: "Join Dealatecorp Innovations. Openings for Java, Salesforce, Python, Full Stack, AI, Cloud and support roles." },
    ],
  }),
  component: CareersPage,
});

const openings = [
  { title: "Java Developer", icon: Code, desc: "Spring Boot microservices for regulated enterprise systems." },
  { title: "Salesforce Developer", icon: Sparkles, desc: "Apex, LWC, custom integrations and managed services." },
  { title: "Python Developer", icon: Code, desc: "Backend services, data pipelines and automation." },
  { title: "Full Stack Developer", icon: Code, desc: "React, TypeScript and modern backend stacks." },
  { title: "AI Engineer", icon: Cpu, desc: "LLMs, applied ML and production-grade inference." },
  { title: "Cloud Engineer", icon: Cloud, desc: "AWS/Azure/GCP architecture, IaC and DevOps." },
  { title: "Data Analyst", icon: LineChart, desc: "SQL, BI dashboards and analytics narratives." },
  { title: "Business Analyst", icon: Briefcase, desc: "Requirements, workflows and delivery ownership." },
  { title: "Technical Support Executive", icon: Database, desc: "L1/L2 technical support for enterprise clients." },
  { title: "Customer Support Executive", icon: Headphones, desc: "24×7 multichannel customer experience." },
];

function CareersPage() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <section className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Careers</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              We're <span className="text-gradient">hiring.</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Join Dealatecorp Innovations Pvt Ltd and build your career with modern technologies.
              We welcome passionate freshers and experienced professionals ready to innovate, learn
              and grow with us.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Freshers welcome", "Experienced roles", "Hybrid setup", "Learning stipend"].map((t) => (
                <span key={t} className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelected("Open Application")}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-glow"
              style={{ background: "var(--gradient-brand)" }}
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="overflow-hidden rounded-3xl border border-foreground/10 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                alt="Team collaborating"
                className="h-[460px] w-full object-cover"
              />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="glass absolute -left-4 bottom-8 hidden rounded-2xl p-4 shadow-soft md:flex md:items-center md:gap-3">
              <Users size={18} />
              <div className="text-sm font-medium">Grow with a senior team</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container-x mt-24">
        <SectionHead eyebrow="Current openings" title={<>Roles we're <span className="text-gradient">hiring for</span></>} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {openings.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group flex flex-col rounded-2xl border border-foreground/10 bg-background p-6 shadow-card transition-all hover:-translate-y-1"
            >
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
                <o.icon size={18} />
              </div>
              <div className="font-semibold">{o.title}</div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.desc}</p>
              <button
                onClick={() => setSelected(o.title)}
                className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <ApplyModal open={!!selected} position={selected ?? ""} onClose={() => setSelected(null)} />
    </>
  );
}

const HR_EMAIL = "dealatecorphr@gmail.com";

function ApplyModal({ open, position, onClose }: { open: boolean; position: string; onClose: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const emailBody = [
      `New Job Application`,
      `Position: ${position}`,
      `Name: ${fd.get("name")}`,
      `Email: ${fd.get("email")}`,
      `Phone: ${fd.get("phone")}`,
      `Qualification: ${fd.get("qualification")}`,
      `Experience: ${fd.get("experience")}`,
      `Message: ${fd.get("message") || "-"}`,
      `Resume link: ${fd.get("resumeLink") || "Not provided"}`,
    ];
    const subject = `Job Application - ${position}`;
    const body = emailBody.join("\n");
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(HR_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-lg rounded-3xl p-6 shadow-soft md:p-8"
          >
            <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-foreground/5" aria-label="Close">
              <X size={16} />
            </button>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Apply now</div>
            <h3 className="mt-1 text-2xl font-semibold">{position}</h3>
            <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
              <Input name="name" placeholder="Full name" required />
              <Input name="email" type="email" placeholder="Email address" required />
              <Input name="phone" placeholder="Phone number" required />
              <Input name="qualification" placeholder="Qualification" required />
              <Input name="experience" placeholder="Experience (e.g. 2 years / Fresher)" required />
              <textarea
                name="message"
                placeholder="Short message"
                rows={3}
                className="w-full rounded-xl border border-foreground/15 bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <Input name="resumeLink" type="url" placeholder="Resume Link" required />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-glow"
                style={{ background: "var(--gradient-brand)" }}
              >
                Submit Application
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Submitting will open Gmail with your application details prefilled.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-foreground/15 bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
    />
  );
}
