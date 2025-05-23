"use client";

import { useRef, useEffect } from "react";

export default function ScrollProgressIndicator() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!progressRef.current) return;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPosition = window.scrollY;
      const scrollPercents = Math.min(
        100,
        Math.max(0, (scrollPosition / totalHeight) * 100)
      );

      // Use translate3d for hardware acceleration
      progressRef.current.style.transform = `translate3d(-${
        100 - scrollPercents
      }%, 0px, 0px)`;
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

  return (
    <div className="scroll-progress-container">
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        aria-hidden="true"
      />
    </div>
  );
}
