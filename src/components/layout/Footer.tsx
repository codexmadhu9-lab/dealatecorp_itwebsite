import { Link } from "@tanstack/react-router";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#071827] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(14,116,144,.45),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(13,148,136,.28),transparent_42%)]" />
      <div className="container-x py-8">
        <div className="grid items-center gap-7 md:grid-cols-[1.4fr_1fr_auto]">
          <div>
            <Link to="/" className="flex items-center gap-3">
  <img src={logo} alt="Dealatecorp" className="h-10 w-10 object-contain" />

  <div className="leading-tight">
    <div
      className="text-[20px] font-bold tracking-tight text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      Dealatecorp Innovations
    </div>

    <div
      className="text-[11px] uppercase tracking-[0.35em] text-white/55 font-medium"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      Pvt Ltd
    </div>
  </div>
</Link>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
              Enterprise software, AI and digital transformation from Visakhapatnam.
            </p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Products", "/products"],
                ["Careers", "/careers"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-white/70 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
              {[
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/dealatecorp/posts/?feedView=all", label: "LinkedIn" },
                { icon: FaFacebookF, href: "https://www.facebook.com/Dealatecorp/", label: "Facebook" },
                { icon: FaInstagram, href: "https://www.instagram.com/dealatecorp/", label: "Instagram" },
                { icon: FaYoutube, href: "https://www.youtube.com/@DealatecorpInnovations/shorts", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-white/15 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Dealatecorp Innovations Pvt Ltd. All Rights Reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 backdrop-blur transition-colors hover:border-white/40 hover:text-white"
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
