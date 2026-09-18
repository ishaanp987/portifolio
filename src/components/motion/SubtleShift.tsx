"use client";

import { useEffect, useRef } from "react";

export function SubtleShift({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - 0.5) * 6;
      const y = ((event.clientY - box.top) / box.height - 0.5) * 6;
      node.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    };

    const onLeave = () => {
      node.style.transform = "translate(0px, 0px)";
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="subtle-shift">
      {children}
    </div>
  );
}
