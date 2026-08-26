import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Cloud,
  Cpu,
  Building2,
  Stethoscope,
  Radio,
  ShoppingBag,
  Landmark,
  Headphones,
  Briefcase,
  Layers,
  ShieldCheck,
  Rocket,
  Award,
  Users,
  Cloudy,
  Zap,
} from "lucide-react";
import {
  SiOpenjdk,
  SiPython,
  SiGoogleanalytics,
  SiTensorflow,
} from "react-icons/si";
import { Counter } from "@/components/ui/Counter";
import { QuoteModal } from "@/components/layout/QuoteModal";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dealatecorp Innovations Pvt Ltd — Enterprise Software, AI & Cloud" },
      {
        name: "description",
        content:
          "Transforming businesses through innovative technology. Enterprise software, Salesforce, Java, AI, Cloud and digital transformation from Dealatecorp.",
      },
    ],
  }),
  component: HomePage,
});

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
} as const;

function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <>
      <Hero onStartProject={() => setQuoteOpen(true)} />
      <Stats />
      <TechMarquee />
      <WhyUs />
      <Industries />
      <SuccessPillars />
      <CTA onStartProject={() => setQuoteOpen(true)} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

function Hero({ onStartProject }: { onStartProject: () => void }) {
  return (
    <section className="relative -mt-24 overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 -z-20 bg-[url('/dela.webp')] bg-cover bg-[68%_center]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background/80 to-transparent" />
      <motion.div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-[12%] -z-10 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl" animate={{ x: [0, 55, 0], y: [0, -24, 0], scale: [1, 1.12, 1] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-24 -z-10 h-56 w-56 rounded-full bg-teal-300/30 blur-3xl" animate={{ x: [0, -42, 0], y: [0, 34, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />

      {/* floating orbs */}
      <motion.div
        className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 top-48 h-64 w-64 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--gradient-mint)" }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-28 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-cyan-500/25"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 34, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_30px_8px_rgba(34,211,238,.55)]" />
        <span className="absolute bottom-12 right-6 h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_25px_6px_rgba(45,212,191,.5)]" />
      </motion.div>

      <div className="container-x relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto max-w-4xl text-center text-white [text-shadow:0_2px_18px_rgba(0,0,0,.8)]"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
            <Sparkles size={12} className="text-cyan-200" />
            <span className="text-white/85">Since 2020 · Visakhapatnam, India</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Transforming businesses through{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
  innovative technology
</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-900 md:text-lg">
            Dealatecorp Innovations Pvt Ltd is an Information Technology and Consulting company
            delivering enterprise software, Salesforce, Java, Artificial Intelligence, Cloud,
            application development and digital transformation for domestic and global clients.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-brand)" }}
            >
              Explore Services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button onClick={onStartProject} className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-black/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/35">Start a Project <ArrowRight size={16} /></button>
          </motion.div>
        </motion.div>

        {/* floating cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
          className="relative mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3"
        >
          {[
            { icon: Cloud, label: "Cloud & DevOps", tone: "from-indigo/30 to-purple/20" },
            { icon: Cpu, label: "AI & Automation", tone: "from-emerald/30 to-cyan/20" },
            { icon: Zap, label: "Salesforce Solutions", tone: "from-tangerine/30 to-rosegold/20" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/35 bg-black/25 p-5 text-white shadow-2xl backdrop-blur-sm"
            >
              <div
                className={`mb-4 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.tone} text-white`}
              >
                <c.icon size={18} />
              </div>
              <div className="font-medium">{c.label}</div>
              <div className="mt-1 text-sm text-white/60">
                Production-grade delivery, backed by senior engineers.
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: 2020, label: "Founded", suffix: "" },
    { value: 100, label: "Projects delivered", suffix: "+" },
    { value: 40, label: "Enterprise clients", suffix: "+" },
    { value: 12, label: "Technology domains", suffix: "+" },
  ];
  return (
    <section className="container-x">
      <div className="grid gap-4 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 md:grid-cols-4 md:p-10">
        {items.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const techs = [
  { Icon: Zap, name: "Salesforce" },
  { Icon: SiOpenjdk, name: "Java" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiTensorflow, name: "AI / ML" },
  { Icon: Cloudy, name: "AWS" },
  { Icon: SiGoogleanalytics, name: "Analytics" },
  { Icon: Cloud, name: "Cloud" },
  { Icon: Cpu, name: "Machine Learning" },
  { Icon: Layers, name: "Full-Stack" },
  { Icon: Building2, name: "Enterprise CRM" },
];

function TechMarquee() {
  const row = [...techs, ...techs];
  return (
    <section className="mt-24">
      <div className="container-x mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Technologies we build with
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 py-4">
          {row.map(({ Icon, name }, i) => (
            <div key={i} className="flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/[0.03] px-5 py-2.5">
              <Icon size={20} className="text-foreground/80" />
              <span className="text-sm font-medium text-foreground/80">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyItems = [
  { icon: Rocket, title: "Ship faster", desc: "Senior engineers, modern stacks, and delivery cadence that matches product velocity." },
  { icon: ShieldCheck, title: "Enterprise-grade", desc: "Security, compliance and scale are non-negotiable in every system we design." },
  { icon: Award, title: "Design-led", desc: "Every product we ship is measured against a five-star customer experience bar." },
  { icon: Users, title: "Partner mindset", desc: "We become an extension of your team — outcomes, not tickets." },
  { icon: Cpu, title: "AI at the core", desc: "Automation and intelligence baked into workflows, not bolted on afterwards." },
  { icon: Cloud, title: "Cloud-native", desc: "Elastic architectures on AWS, Azure and GCP for global performance." },
];

function WhyUs() {
  return (
    <section className="container-x mt-32">
      <SectionHead
        eyebrow="Why Dealatecorp"
        title={<>Built for the demands of a <span className="text-gradient">modern enterprise</span></>}
        subtitle="Six reasons global teams choose us to build, scale and modernise mission-critical software."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {whyItems.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6 shadow-card transition-all hover:-translate-y-1 hover:border-foreground/25"
          >
            <div
              className="absolute -inset-px -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
              <it.icon size={18} />
            </div>
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const industries = [
  { icon: Stethoscope, name: "Healthcare", desc: "Digital health platforms & pharmacy systems." },
  { icon: Radio, name: "Telecommunication", desc: "OSS/BSS & customer platforms." },
  { icon: Layers, name: "Application Development", desc: "Web, mobile and cross-platform apps." },
  { icon: Cloud, name: "Internet Service Providers", desc: "Provisioning, billing & operations." },
  { icon: Landmark, name: "Taxation", desc: "Automation for compliance workflows." },
  { icon: ShoppingBag, name: "E-Commerce", desc: "Storefronts, catalog and OMS." },
  { icon: Headphones, name: "Business Process Outsourcing", desc: "24×7 customer support platforms." },
  { icon: Briefcase, name: "Enterprise Consulting", desc: "Digital transformation strategy." },
];

function Industries() {
  return (
    <section className="container-x mt-32">
      <SectionHead
        eyebrow="Industries we serve"
        title={<>From <span className="text-gradient">healthcare to enterprise</span></>}
        subtitle="Deep domain experience across eight regulated and consumer industries."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {industries.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            className="glass group rounded-2xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-foreground/5 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
              <it.icon size={18} />
            </div>
            <h4 className="font-semibold">{it.name}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SuccessPillars() {
  const pillars = [
    { title: "Innovation", desc: "Emerging tech, applied pragmatically." },
    { title: "Quality", desc: "Craftsmanship in code and experience." },
    { title: "Customer success", desc: "Outcomes that show up in your P&L." },
    { title: "Business growth", desc: "Platforms that scale with your ambition." },
    { title: "Technology excellence", desc: "Deep expertise, seasoned engineers." },
    { title: "Digital transformation", desc: "From strategy to production, end to end." },
  ];
  return (
    <section className="container-x mt-32">
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-14" style={{ background: "linear-gradient(135deg, var(--charcoal), var(--ink))", color: "white" }}>
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Client success</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Six pillars that define every engagement we ship.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div className="font-display text-xl font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-white/70">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ onStartProject }: { onStartProject: () => void }) {
  return (
    <section className="container-x mt-32">
      <div className="grid gap-8 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:grid-cols-[1.4fr_1fr] md:p-14">
        <div>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Let's build something <span className="text-gradient">great together.</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tell us about your product, platform or transformation goal. We'll respond within one business day.
          </p>
        </div>
        <div className="flex items-center md:justify-end">
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-glow"
            style={{ background: "var(--gradient-brand)" }}
          >
            Start a Project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
