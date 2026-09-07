import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Bot, BrainCircuit, Briefcase, Check, Cloud, Code2, Cpu, Database, Globe2, Handshake, Headphones, Layers3, LineChart, MonitorSmartphone, Network, Package, Plug, RefreshCw, Rocket, Smartphone, Users, WalletCards, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { SectionHead } from "./index";
import { SiGoogleanalytics, SiHtml5, SiPostman, SiPython, SiReact, SiSpringboot, SiTensorflow, SiZapier, SiZendesk } from "react-icons/si";
import { FaAws, FaSalesforce } from "react-icons/fa";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Solutions — Dealatecorp Innovations Pvt Ltd" },
      {
        name: "description",
        content:
          "Explore Dealatecorp's product portfolio — Doctor Connect, MediStock, Visakha Beauty, MotoStock and Venture+ — plus enterprise business and technology services.",
      },
    ],
  }),
  component: ProductsPage,
});

const services = [
  { title: "Salesforce Development", desc: "Sales, Service, Marketing & custom Apex/LWC.", icon: FaSalesforce },
  { title: "Java Development", desc: "Enterprise-grade Spring Boot backends.", icon: SiSpringboot },
  { title: "Python Development", desc: "APIs, automation and data pipelines.", icon: SiPython },
  { title: "Machine Learning", desc: "Predictive models tuned to your data.", icon: SiTensorflow },
  { title: "Artificial Intelligence", desc: "Intelligent automation & generative AI.", icon: BrainCircuit },
  { title: "Cloud Computing", desc: "AWS, Azure & GCP architecture.", icon: FaAws },
  { title: "Business Intelligence", desc: "Dashboards that drive decisions.", icon: SiGoogleanalytics },
  { title: "Application Development", desc: "Custom software from idea to launch.", icon: SiReact },
  { title: "Web Development", desc: "High-performance modern web apps.", icon: SiHtml5 },
  { title: "Mobile App Development", desc: "iOS, Android & cross-platform apps.", icon: Smartphone },
  { title: "API Integration", desc: "Connect systems, data and partners.", icon: SiPostman },
  { title: "Digital Transformation", desc: "Reimagine processes end-to-end.", icon: SiZapier },
  { title: "Business Consulting", desc: "Strategy and IT advisory.", icon: Handshake },
  { title: "Customer Support Solutions", desc: "24/7 multi-channel support.", icon: SiZendesk },
];

const business = [
  { title: "CRM Software", desc: "Convert more leads and retain more customers.", icon: Users },
  { title: "ERP Solutions", desc: "Unified operations across all departments.", icon: Network },
  { title: "HRMS", desc: "Hire, engage and manage your workforce.", icon: Briefcase },
  { title: "Inventory Management", desc: "Real-time stock, orders and warehousing.", icon: Package },
  { title: "Accounting Software", desc: "Books, GST and financial reporting.", icon: WalletCards },
  { title: "Project Management", desc: "Plan, track and deliver projects on time.", icon: MonitorSmartphone },
  { title: "Enterprise Applications", desc: "Custom apps tailored to your workflows.", icon: Database },
  { title: "Customer Support Outsourcing", desc: "24×7 multichannel support desks." },
];

const productGroups = [
  { title: "Healthcare Solutions", description: "Doctor Connect and MediStock ” complete platforms for patients, doctors and pharmacies.", slugs: ["doctor-connect", "medistock"] },
  { title: "Salon & Automotive", description: "Visakha Beauty and MotoStock — connected operations for salons and motorcycle dealerships.", slugs: ["visakha-beauty", "motostock"] },
  { title: "Real Estate", description: "Venture+ — property, customer, sales and employee management.", slugs: ["venture-plus"] },
];

function ProductsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Products & Solutions
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
            Enterprise-grade products, <span className="text-gradient">crafted end to end.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Five flagship products across healthcare, wellness, automotive and real estate — plus deep
            business and technology services for global clients.
          </p>
        </div>
      </section>

      <section className="container-x mt-16 space-y-20">
        {productGroups.map((group) => (
          <section key={group.title}>
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Our products</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{group.title}</h2>
              <p className="mt-2 text-muted-foreground">{group.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.filter((p) => group.slugs.includes(p.slug)).map((p, index) => (
                <motion.article
                  key={p.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-card transition-transform hover:-translate-y-1"
                >
                  <img src={p.heroImage} alt={p.name} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{p.category}</div>
                    <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(p)}
                      className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      View Project <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="container-x mt-32">
        <SectionHead
          eyebrow="Technology services"
          title={<>Full-spectrum <span className="text-gradient">engineering</span></>}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/35"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
                <s.icon size={18} />
              </div>
              <div className="font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div
                className="mt-4 h-px w-8 transition-all group-hover:w-16"
                style={{ background: "var(--gradient-brand)" }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <SectionHead
          eyebrow="Business management solutions"
          title={<>Streamline every function — from <span className="text-gradient">CRM to ERP, HR and finance.</span></>}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {business.filter((s) => s.title !== "Customer Support Outsourcing").map((s, i) => {
            const Icon = s.icon ?? Headphones;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
                  <Icon size={18} />
                </div>
                <div className="font-semibold">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {selectedProject && <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}

function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const modules = project.functionalities ?? project.features.map((feature) => ({ title: feature.title, points: [feature.description] }));
  const story = project.category === "Healthcare"
    ? [
        { title: "A clear command centre for everyday care", text: "The dashboard brings the essential information into one focused view, so staff can act quickly without switching between spreadsheets, calls and paper records." },
        { title: "A connected experience for people and teams", text: "From a patient looking for a doctor to a pharmacist verifying a prescription, every step keeps the right information connected to the right person." },
        { title: "Accurate records that support better decisions", text: "Bookings, prescriptions, sales, stock and history stay organized, making follow-up simpler and giving managers a reliable picture of the business." },
      ]
    : project.category === "Real Estate"
      ? [
          { title: "One view of every property and opportunity", text: "Venture+ combines listings, inquiries, prices and availability so sales teams always know what can be offered to a customer." },
          { title: "A structured path from inquiry to booking", text: "Leads are assigned, follow-ups are recorded and bookings are confirmed in a single workflow designed to prevent missed opportunities." },
          { title: "Secure control after the sale", text: "Documents, performance information and ownership-transfer history stay available to authorized teams as the organization grows." },
        ]
      : project.slug === "motostock"
        ? [
            { title: "One connected dealership dashboard", text: "MotoStock brings motorcycle inventory, stock alerts, customers, bookings and revenue into one view, with visibility across showrooms and staff." },
            { title: "From bike selection to payment and finance", text: "Connect each customer to a motorcycle and booking, record payments, manage finance applications and track EMI schedules. Invoices and KYC documents stay with the transaction." },
            { title: "A complete journey through vehicle delivery", text: "Track pre-delivery inspection, registration and final payment before scheduling the handover. Delivery documents and a timestamped audit timeline preserve the complete transaction history." },
          ]
      : [
          { title: "A calm, organized salon command centre", text: "Visakha Beauty gives the front desk a live view of appointments, customers, services and team schedules for a smooth daily operation." },
          { title: "Every guest receives a connected experience", text: "Customer preferences, previous visits, selected services and bills remain connected, helping the team offer more personal service." },
          { title: "Turn daily operations into clear business insight", text: "Billing, employee activity, service performance and earnings are captured automatically for accurate reporting and better decisions." },
        ];
  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] h-[100dvh] overflow-y-auto overscroll-contain bg-slate-950/60 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
      onWheel={(event) => event.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.35 }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-background shadow-2xl"
      >
        <div className="relative h-64 overflow-hidden md:h-96">
          <img src={project.heroImage} alt={project.name} className="h-full w-full object-cover" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button onClick={onClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25" aria-label="Close project details">
            <X size={18} />
          </button>
          <div className="absolute bottom-7 left-7 text-white md:bottom-10 md:left-10">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{project.category}</div>
            <h2 className="mt-2 text-4xl font-semibold md:text-6xl">{project.name}</h2>
            <p className="mt-2 max-w-2xl text-white/80">{project.tagline}</p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <section className="grid gap-8 rounded-3xl bg-foreground/[0.03] p-6 md:grid-cols-2 md:p-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Purpose</div>
              <p className="mt-3 text-lg leading-relaxed">{project.purpose}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Workflow</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.workflow.map((step, index) => <span key={step} className="rounded-full border border-foreground/10 bg-background px-3 py-1.5 text-sm"><b>{index + 1}.</b> {step}</span>)}
              </div>
            </div>
          </section>

          <section className="mt-14">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">How the project works</div>
            <h3 className="mt-2 text-3xl font-semibold">Built around real daily workflows</h3>
            <div className="mt-8 space-y-10">
              {story.map((chapter, index) => (
                <article key={chapter.title} className={`grid overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] md:grid-cols-2 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <img src={project.gallery[index]} alt={`${project.name} workflow ${index + 1}`} className="h-72 w-full object-cover md:h-full" loading="lazy" decoding="async" />
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <div className="text-sm font-semibold text-primary">0{index + 1}</div>
                    <h4 className="mt-2 text-2xl font-semibold">{chapter.title}</h4>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{chapter.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Complete functionality</div>
            <h3 className="mt-2 text-3xl font-semibold">Everything {project.name} can do</h3>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {modules.map((module, index) => (
                <article key={module.title} className="rounded-2xl border border-foreground/10 p-6 shadow-card">
                  <div className="grid h-9 w-9 place-items-center rounded-xl text-sm font-semibold text-white" style={{ background: "var(--gradient-brand)" }}>{index + 1}</div>
                  <h4 className="mt-4 text-lg font-semibold">{module.title}</h4>
                  <ul className="mt-3 space-y-2">
                    {module.points.map((point) => <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted-foreground"><Check size={15} className="mt-1 shrink-0 text-primary" />{point}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Project walkthrough</div>
            <h3 className="mt-2 text-3xl font-semibold">A visual look at the experience</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">These views show the kind of clean, people-first experience the platform provides across daily operations, customer interactions and management reporting.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {project.gallery.map((image, index) => <img key={image} src={image} alt={`${project.name} visual ${index + 1}`} className="h-64 w-full rounded-2xl object-cover" loading="lazy" decoding="async" />)}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
