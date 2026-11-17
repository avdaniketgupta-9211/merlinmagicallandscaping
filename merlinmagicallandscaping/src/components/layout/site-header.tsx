"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Wordmark } from "./identity";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      setScrolled(window.scrollY > 26);
      if (!onHome) return;
      const limit = Math.min(window.innerHeight * 0.34, 230);
      const current = [...navigation].reverse().find(({ id }) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= limit);
      const processBottom = document.getElementById("process")?.getBoundingClientRect().bottom ?? Infinity;
      setActive(processBottom < limit ? "" : current?.id || "home");
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    }
    const breakpoint = window.matchMedia("(min-width: 940px)");
    function onBreakpoint() { if (breakpoint.matches) setOpen(false); }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    breakpoint.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      breakpoint.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const href = (id: string) => `${onHome ? "" : "/"}#${id}`;
  const solid = !onHome || scrolled || open;

  return (
    <header ref={headerRef} className={`site-header${solid ? " is-solid" : ""}${open ? " menu-open" : ""}`}>
      <div className="shell header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ id, label }) => <a key={id} href={href(id)} aria-current={onHome && active === id ? "location" : undefined}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-cta" href={href("contact")} onClick={() => setOpen(false)}>Get a Quote <ArrowUpRight size={15} strokeWidth={1.65} aria-hidden="true" /></a>
          <button className="menu-toggle" ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X aria-hidden="true" size={25} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={25} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        <div className="shell">
          {navigation.map(({ id, label }, index) => (
            <a key={id} href={href(id)} aria-current={onHome && active === id ? "location" : undefined} onClick={() => setOpen(false)}><span><small aria-hidden="true">0{index + 1}</small>{label}</span><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></a>
          ))}
          <a href={href("contact")} onClick={() => setOpen(false)}><span><small aria-hidden="true">06</small>Get a Quote</span><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></a>
        </div>
      </nav>
    </header>
  );
}
