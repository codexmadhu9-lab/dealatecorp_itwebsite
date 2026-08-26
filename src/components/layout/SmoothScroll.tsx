import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let lenis: Lenis | undefined;
    let raf = 0;
    const start = window.setTimeout(() => {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }, 650);
    return () => {
      window.clearTimeout(start);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}
