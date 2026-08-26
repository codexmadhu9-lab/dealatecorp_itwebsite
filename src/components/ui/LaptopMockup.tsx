import { type ReactNode } from "react";

export function LaptopMockup({ src, alt, children }: { src?: string; alt?: string; children?: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="rounded-t-2xl border border-foreground/10 bg-foreground/5 p-3 shadow-soft">
        <div className="mb-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="aspect-[16/10] overflow-hidden rounded-lg bg-background">
          {src ? <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" loading="lazy" /> : children}
        </div>
      </div>
      <div className="mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-b-2xl bg-foreground/10" />
      <div className="mx-auto h-1.5 w-24 rounded-b-xl bg-foreground/20" />
    </div>
  );
}
