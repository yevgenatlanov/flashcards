"use client";

import { ArrowUp } from "lucide-react";
import { useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export default function ScrollProgressWithBackToTop() {
  const { t } = useI18n();
  const progressRef = useRef<SVGCircleElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!progressRef.current || !buttonRef.current) return;

    const update = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPosition = window.scrollY;
      const scrollPercents = Math.min(
        100,
        Math.max(0, (scrollPosition / totalHeight) * 100)
      );

      const radius = 18;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (circumference * scrollPercents) / 100;

      // Update circle progress
      progressRef.current!.style.strokeDashoffset = String(offset);

      // Update button visibility
      if (scrollPosition > 300) {
        buttonRef.current!.classList.remove(
          "opacity-0",
          "translate-y-10",
          "pointer-events-none"
        );
        buttonRef.current!.classList.add("opacity-100", "translate-y-0");
      } else {
        buttonRef.current!.classList.remove("opacity-100", "translate-y-0");
        buttonRef.current!.classList.add(
          "opacity-0",
          "translate-y-10",
          "pointer-events-none"
        );
      }
    };

    // Initial update
    update();

    // Add event listeners
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 size-12 flex items-center justify-center rounded-full shadow-lg z-30 transition-all duration-300 opacity-0 translate-y-10 pointer-events-none"
      aria-label={t("common.backToTop")}
    >
      <svg className="size-12 -rotate-90" viewBox="0 0 40 40">
        <circle
          className="opacity-25"
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          ref={progressRef}
          className="stroke-primary"
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * 18}
          strokeDashoffset={2 * Math.PI * 18}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="absolute h-4 w-4 text-foreground" />
    </button>
  );
}
