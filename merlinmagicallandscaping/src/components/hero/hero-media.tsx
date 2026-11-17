"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { film } from "@/data/site";

type ConnectionInfo = { saveData?: boolean; effectiveType?: string };

export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [eligible, setEligible] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [windowVisible, setWindowVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(min-width: 940px) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
    function update() {
      setEligible(Boolean(film.source) && preference.matches && !connection?.saveData && !["slow-2g", "2g", "3g"].includes(connection?.effectiveType || ""));
    }
    function onVisibility() { setWindowVisible(!document.hidden); }
    update();
    onVisibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", onVisibility);
    const target = video.current;
    const observer = target && "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.12 }) : null;
    if (target) observer?.observe(target);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!eligible || !visible || !windowVisible || started) return;
    // Give the poster and essential typography priority over the optional media download.
    const timer = window.setTimeout(() => setStarted(true), 2200);
    return () => window.clearTimeout(timer);
  }, [eligible, started, visible, windowVisible]);

  const active = eligible && started && !failed;
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (active && visible && windowVisible && !paused) void player.play().catch(() => undefined);
    else player.pause();
  }, [active, paused, visible, windowVisible]);

  function toggle() {
    if (playing) {
      video.current?.pause();
      setPaused(true);
    } else {
      setStarted(true);
      setPaused(false);
      if (active) void video.current?.play().catch(() => undefined);
    }
  }

  return (
    <>
      <div className="hero-media" aria-hidden="true">
        <picture>
          {film.mobilePoster && <source media="(max-width: 649px)" type="image/avif" srcSet={film.mobilePoster} />}
          {film.mediumPoster && <source media="(max-width: 1199px)" type="image/avif" srcSet={film.mediumPoster} />}
          {film.avifPoster && <source type="image/avif" srcSet={film.avifPoster} />}
          <Image src={film.poster} alt="" fill unoptimized fetchPriority="high" sizes="100vw" />
        </picture>
        <video
          className={active && hasFrame ? "is-visible" : ""}
          ref={video}
          src={active ? film.source : undefined}
          poster={active ? film.avifPoster || film.poster : undefined}
          preload="none"
          muted
          loop
          playsInline
          tabIndex={-1}
          onPlaying={() => { setPlaying(true); setHasFrame(true); }}
          onPause={() => setPlaying(false)}
          onError={() => { if (active) { setFailed(true); setPlaying(false); } }}
        />
      </div>
      <div className="hero-tone" aria-hidden="true" />
      <div className="hero-film">
        <span className="film-caption"><span className="film-caption-label">{film.isReference ? "The garden study" : "The garden film"}</span>{film.isReference && <span className="film-caption-context">{active && hasFrame ? "Reference footage" : "Reference photography"}</span>}</span>
        {eligible && !failed && <button type="button" className="film-control" aria-label={playing ? "Pause garden film" : "Play garden film"} onClick={toggle}>
          {playing ? <Pause size={16} strokeWidth={1.6} aria-hidden="true" /> : <Play size={16} strokeWidth={1.6} aria-hidden="true" />}
        </button>}
      </div>
    </>
  );
}
