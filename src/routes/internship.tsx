import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/internship")({
  head: () => ({
    links: [canonicalLink("/internship")],
    meta: [
      { title: "Internship — Dealatecorp Innovations Pvt Ltd" },
      {
        name: "description",
        content:
          "Explore Dealatecorp internships in programming, full stack development, AI, cloud computing and Salesforce. Compare 45-day and 3-month tracks and apply online.",
      },
    ],
  }),
  component: InternshipPage,
});

function InternshipPage() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    let animationFrame = 0;

    const updateViewport = () => {
      const doc = frame.contentDocument;
      if (!doc) return;
      const top = frame.getBoundingClientRect().top;
      const visibleTop = Math.max(0, 96 - top);
      const visibleBottom = Math.max(visibleTop, window.innerHeight - top);
      doc.documentElement.style.setProperty(
        "--page-viewport-height",
        `${window.innerHeight - 96}px`,
      );
      doc.documentElement.style.setProperty("--page-visible-top", `${visibleTop}px`);
      doc.documentElement.style.setProperty("--page-visible-bottom", `${visibleBottom}px`);
      doc.documentElement.style.setProperty(
        "--page-dialog-center",
        `${(visibleTop + visibleBottom) / 2}px`,
      );
    };

    const resize = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        updateViewport();
        const body = frame.contentDocument?.body;
        if (body) frame.style.height = `${Math.ceil(body.getBoundingClientRect().height)}px`;
      });
    };

    const connect = () => {
      observer?.disconnect();
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      if (!doc.querySelector("link[data-page-embed]")) {
        const styles = doc.createElement("link");
        styles.rel = "stylesheet";
        styles.href = "/internship-assets/embed.css";
        styles.dataset.pageEmbed = "";
        styles.addEventListener("load", resize, { once: true });
        doc.head.append(styles);
      }
      updateViewport();
      observer = new ResizeObserver(resize);
      observer.observe(doc.body);
      void doc.fonts.ready.then(resize);
      resize();
    };

    frame.addEventListener("load", connect);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateViewport, { passive: true });
    if (frame.contentDocument?.readyState === "complete") connect();
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(animationFrame);
      frame.removeEventListener("load", connect);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateViewport);
    };
  }, []);

  return (
    <>
      <h1 className="sr-only">Dealatecorp internships</h1>
      <iframe
        ref={frameRef}
        src="/internship/content"
        title="Dealatecorp internship courses and applications"
        className="block w-full border-0"
        style={{ height: "32rem", overflow: "hidden" }}
      />
    </>
  );
}
