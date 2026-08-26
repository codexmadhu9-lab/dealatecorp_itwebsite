import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Lightbulb,
  ShieldCheck,
  Heart,
  Award,
  GraduationCap,
} from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { SectionHead } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dealatecorp Innovations Pvt Ltd" },
      {
        name: "description",
        content:
          "Established in 2020 in Visakhapatnam, Dealatecorp Innovations Pvt Ltd delivers enterprise software, Salesforce, Java, AI, Cloud and digital transformation.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-x">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              About Dealatecorp
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              An IT & consulting company{" "}
              <span className="text-gradient">built for global scale.</span>
            </h1>
            <p className="mt-5 text-muted-foreground">
              Dealatecorp Innovations Pvt Ltd is an Information Technology and Consulting company
              headquartered in Visakhapatnam. Established in 2020, we provide enterprise software,
              application development, consulting services, customer support outsourcing,
              Salesforce, Java, Artificial Intelligence, Cloud Technologies, Digital
              Transformation and Business Consulting to domestic and global clients.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { n: 6, s: "+", l: "Years" },
                { n: 40, s: "+", l: "Clients" },
                { n: 2020, s: "", l: "Founded" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-semibold">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                alt="Software engineers collaborating"
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="glass absolute -left-6 bottom-10 hidden rounded-2xl p-4 shadow-soft md:block"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">HQ</div>
              <div className="font-medium">Visakhapatnam, India</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="glass absolute -right-6 top-10 hidden rounded-2xl p-4 shadow-soft md:block"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Since</div>
              <div className="font-display text-2xl font-semibold">2020</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container-x mt-32">
        <div className="grid gap-6 md:grid-cols-2">
          <MVCard
            icon={Target}
            title="Our Mission"
            body="Empowering businesses through innovative technology solutions that unlock measurable growth."
            tone="from-purple/20 to-indigo/20"
          />
          <MVCard
            icon={Eye}
            title="Our Vision"
            body="To become one of India's most trusted IT consulting and digital transformation companies."
            tone="from-emerald/20 to-cyan/20"
          />
        </div>
      </section>

      <section className="container-x mt-32">
        <SectionHead
          eyebrow="Core values"
          title={<>Principles that shape <span className="text-gradient">how we work</span></>}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: Lightbulb, title: "Innovation" },
            { icon: ShieldCheck, title: "Integrity" },
            { icon: Heart, title: "Customer Success" },
            { icon: Award, title: "Quality" },
            { icon: GraduationCap, title: "Continuous Learning" },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-foreground/10 bg-background p-6 text-center shadow-card"
            >
              <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow" style={{ background: "var(--gradient-brand)" }}>
                <v.icon size={18} />
              </div>
              <div className="font-medium">{v.title}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x mt-32">
        <SectionHead eyebrow="Timeline" title={<>A journey of <span className="text-gradient">building</span></>} />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/15 md:left-1/2" />
          {[
            { y: "2020", t: "Founded in Visakhapatnam", d: "Dealatecorp began with a mission to build practical, enterprise-grade software from India." },
            { y: "2021", t: "First client partnerships", d: "Delivered focused Salesforce, Java and application-development engagements." },
            { y: "2023", t: "Cloud & AI practice", d: "Expanded into Cloud, AI/ML and data-led digital transformation." },
            { y: "2026", t: "Products & platforms", d: "Built Doctor Connect, MediStock, Visakha Beauty and Venture+ platforms." },
          ].map((e, i) => (
            <motion.div
              key={e.y}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative mb-8 pl-12 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:pl-0 md:text-right"}`}
            >
              <div
                className={`absolute top-1 h-3 w-3 rounded-full ring-4 ring-background left-[10px] md:left-auto ${
                  i % 2 ? "md:-left-1.5" : "md:-right-1.5"
                }`}
                style={{ background: "var(--gradient-brand)" }}
              />
              <div className="font-display text-sm font-semibold text-primary">{e.y}</div>
              <div className="mt-1 font-medium">{e.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{e.d}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

function MVCard({
  icon: Icon,
  title,
  body,
  tone,
}: {
  icon: typeof Target;
  title: string;
  body: string;
  tone: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br ${tone} p-8 shadow-card`}>
      <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-background/70 backdrop-blur">
        <Icon size={20} />
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-foreground/80">{body}</p>
    </div>
  );
}
