import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { QuoteModal } from "@/components/layout/QuoteModal";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Dealatecorp" className="h-9 w-9 object-contain drop-shadow" />
          <div className="leading-tight">
  <div
    className="text-[15px] font-bold tracking-tight text-foreground"
    style={{ fontFamily: "'Montserrat', sans-serif" }}
  >
    Dealatecorp
  </div>

  <div
    className="-mt-0.5 text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground"
    style={{ fontFamily: "'Montserrat', sans-serif" }}
  >
    INNOVATIONS
  </div>
</div>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
            return (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => setQuoteOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
          >
            Get a Quote
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 right-4 top-20 md:hidden"
          >
            <div className="glass rounded-2xl p-3 shadow-soft">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-foreground/5"
                >
                  {n.label}
                </Link>
              ))}
              <button onClick={() => { setOpen(false); setQuoteOpen(true); }} className="mt-1 block w-full rounded-xl bg-foreground px-4 py-3 text-center text-sm font-medium text-background">Get a Quote</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </motion.header>
  );
}
