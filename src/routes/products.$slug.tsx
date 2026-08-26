import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { projectBySlug, projects, type Project } from "@/data/projects";
import { LaptopMockup } from "@/components/ui/LaptopMockup";
import { SectionHead } from "./index";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = projectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.name} — Dealatecorp Innovations` },
      { name: "description", content: loaderData?.project.tagline ?? "" },
      { property: "og:image", content: loaderData?.project.heroImage ?? "" },
      { property: "og:title", content: `${loaderData?.project.name} — Dealatecorp Innovations` },
      { property: "og:description", content: loaderData?.project.tagline ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-semibold">Project not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary">
        Back to products
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-70" />
        <div className="container-x pt-8 pb-20">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={14} /> All products
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {p.category}
              </div>
              <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-6xl">{p.name}</h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">{p.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-glow"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  Learn More <ArrowRight size={14} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-medium"
                >
                  Request demo
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <LaptopMockup src={p.heroImage} alt={p.name} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-x mt-16">
        <div className="grid gap-10 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Overview</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{p.description}</h2>
            <p className="mt-4 text-muted-foreground">{p.purpose}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-foreground/10 bg-background p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Target users</div>
              <ul className="mt-3 space-y-2 text-sm">
                {p.users.map((u) => (
                  <li key={u} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: `var(--${p.accent})` }} />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-background p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tech stack</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-2.5 py-1 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {p.functionalities && (
        <section className="container-x mt-24">
          <SectionHead
            eyebrow="Complete project functionality"
            title={<>What <span className="text-gradient">{p.name}</span> includes</>}
            subtitle="Every capability requested for this product, organized for quick understanding."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {p.functionalities.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.05 }}
                className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-card"
              >
                <div className="grid h-9 w-9 place-items-center rounded-xl text-sm font-semibold text-white" style={{ background: "var(--gradient-brand)" }}>
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{section.title}</h3>
                <ul className="mt-3 space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <Check size={14} className="mt-1 shrink-0 text-primary" /> {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section id="features" className="container-x mt-24">
        <SectionHead
          eyebrow={`${p.features.length} complete functional modules`}
          title={<>Everything <span className="text-gradient">{p.name}</span> does</>}
          subtitle="The full functionality included in this project — from the first login through daily operations, reporting and follow-up."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6 shadow-card transition-all hover:-translate-y-1"
            >
              <div
                className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow"
                style={{ background: `linear-gradient(135deg, var(--${p.accent}), var(--indigo))` }}
              >
                <Check size={16} />
              </div>
              <div className="font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="container-x mt-24">
        <SectionHead eyebrow="Workflow" title={<>How <span className="text-gradient">{p.name}</span> works</>} />
        <div className="mt-12 grid gap-3 md:grid-cols-4 lg:grid-cols-4">
          {p.workflow.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-2xl border border-foreground/10 bg-background p-5 shadow-card"
            >
              <div
                className="grid h-8 w-8 place-items-center rounded-lg text-xs font-semibold text-white"
                style={{ background: "var(--gradient-brand)" }}
              >
                {i + 1}
              </div>
              <div className="mt-3 font-medium">{step}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <SectionHead
          eyebrow="Project functionality, explained"
          title={<>Inside the <span className="text-gradient">{p.name}</span> experience</>}
          subtitle="A visual view of the workflows your team and customers use every day."
        />
        <div className="mt-12 space-y-10">
          {p.gallery.map((src, imageIndex) => {
            const modules = p.features.slice(imageIndex * 3, imageIndex * 3 + 3);
            return (
              <motion.article
                key={`${src}-explained`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-card lg:grid-cols-2 ${imageIndex % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative min-h-72 overflow-hidden">
                  <img src={src} alt={`${p.name} functionality ${imageIndex + 1}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/45 to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {imageIndex === 0 ? "Daily control centre" : imageIndex === 1 ? "Team & customer workflows" : imageIndex === 2 ? "Operations made simple" : "Reporting & business growth"}
                  </div>
                </div>
                <div className="p-7 md:p-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Module {imageIndex + 1}</div>
                  <h3 className="mt-2 text-2xl font-semibold">{imageIndex === 0 ? "Manage everything from one dashboard" : imageIndex === 1 ? "Keep people, bookings and records connected" : imageIndex === 2 ? "Complete daily work without manual follow-up" : "Make better decisions with complete records"}</h3>
                  <div className="mt-6 space-y-4">
                    {modules.map((module) => (
                      <div key={module.title} className="border-l-2 border-primary/40 pl-4">
                        <div className="font-medium">{module.title}</div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="container-x mt-24">
        <SectionHead eyebrow="Business benefits" title={<>Outcomes that <span className="text-gradient">show up in your P&L</span></>} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass flex items-start gap-3 rounded-2xl p-5"
            >
              <div
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Check size={12} />
              </div>
              <div className="text-sm font-medium">{b}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual walkthrough */}
      <section className="container-x mt-24">
        <SectionHead eyebrow="Visual walkthrough" title={<>A closer look at the <span className="text-gradient">product experience</span></>} subtitle="From the daily control centre to the people-facing workflows, every screen is designed to keep work clear, fast and human." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {p.gallery.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 shadow-soft"
            >
              <img src={src} alt={`${p.name} screenshot ${i + 1}`} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {i === 0 ? "A focused daily dashboard" : i === 1 ? "People and service workflows" : i === 2 ? "Information at a glance" : "Built for confident decisions"}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Other projects */}
      <section className="container-x mt-32">
        <SectionHead eyebrow="More products" title={<>Explore other <span className="text-gradient">solutions</span></>} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {projects
            .filter((x) => x.slug !== p.slug)
            .map((o) => (
              <Link
                key={o.slug}
                to="/products/$slug"
                params={{ slug: o.slug }}
                className="group overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-card transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={o.heroImage} alt={o.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{o.category}</div>
                  <div className="mt-1 font-semibold">{o.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{o.tagline}</div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
