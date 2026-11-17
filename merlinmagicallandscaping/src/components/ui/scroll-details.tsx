"use client";

import { useEffect } from "react";

export function ScrollDetails() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((items) => {
      for (const item of items) {
        if (!item.isIntersecting) continue;
        item.target.classList.add("in-view");
        observer.unobserve(item.target);
      }
    }, { threshold: 0.18 });
    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}
