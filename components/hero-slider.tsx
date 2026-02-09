'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import type { HeroSlide } from "@/content/site";

type Props = {
  slides: HeroSlide[];
};

const fadeEase = cubicBezier(0.22, 1, 0.36, 1);

export default function HeroSlider({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeSlide = slides[index];
  const imageInitial = index === 0 ? { scale: 1, opacity: 1 } : { scale: 1.06, opacity: 0 };
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const enableAutoPlay = () => setAutoPlay(true);
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, enableAutoPlay, { once: true, passive: true })
    );

    return () => {
      events.forEach((event) => window.removeEventListener(event, enableAutoPlay));
    };
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(id);
  }, [autoPlay, slides.length]);

  // Preload narednog slajda da slike ne kasne u prelazu.
  useEffect(() => {
    if (!autoPlay) return;
    const next = slides[(index + 1) % slides.length];
    if (!next) return;
    const img = new window.Image();
    img.src = next.image;
  }, [autoPlay, index, slides]);

  const label = useMemo(
    () => "Vodovod i kanalizacija · PP mreza · zemljani radovi · Nis",
    []
  );

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-zinc-900 text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.image}
            initial={imageInitial}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.02, opacity: 0 }}
            transition={{ duration: 1.3, ease: fadeEase }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeSlide.image}-overlay`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1, ease: fadeEase }}
          className="absolute inset-0 bg-black/70"
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/78 via-black/62 to-black/35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 6 }}
        transition={{ duration: 2.4, ease: fadeEase }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 25%, rgba(15,110,207,0.34), transparent 35%), radial-gradient(circle at 85% 65%, rgba(255,255,255,0.1), transparent 35%)",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center gap-8 px-4 py-16 text-center sm:px-6 lg:items-start lg:px-8 lg:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.title}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.85, ease: fadeEase }}
            className="w-full max-w-4xl space-y-5 rounded-3xl border border-white/20 bg-black/52 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.52)] backdrop-blur-lg sm:p-8"
          >
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-white/20 bg-black/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
                {activeSlide.kicker}
              </span>
              <h1 className="text-4xl font-bold leading-[0.95] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)] sm:text-6xl lg:text-7xl">
                {activeSlide.title}
              </h1>
              <p className="mx-auto max-w-3xl text-lg font-medium text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)] sm:text-xl">
                {activeSlide.description}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/90">{label}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href={activeSlide.ctaHref}
                className="inline-flex items-center rounded-full bg-[#0f6ecf] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(15,110,207,0.35)] transition hover:bg-[#0b5cb0] hover:translate-y-[-3px]"
              >
                Zelis da radis sa nama
              </Link>
              <Link
                href="/usluge"
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-dark"
              >
                Pogledaj usluge
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-2 lg:pl-2">
          {slides.map((slide, i) => (
            <motion.button
              key={slide.title}
              type="button"
              aria-label={`Idi na slajd ${i + 1}`}
              onClick={() => setIndex(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "h-2.5 rounded-full transition-all",
                i === index ? "w-10 bg-[#0f6ecf]" : "w-3 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

