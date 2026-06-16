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

  const label = useMemo(() => "Nis i juzna Srbija", []);

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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl flex-col items-center justify-end gap-7 px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-20 lg:items-start lg:px-8 lg:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.title}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.85, ease: fadeEase }}
            className="w-full max-w-3xl space-y-5"
          >
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-white/25 bg-black/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/95 backdrop-blur-sm">
                {activeSlide.kicker}
              </span>
              <h1 className="text-4xl font-bold leading-[0.98] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.72)] sm:text-6xl lg:text-7xl">
                {activeSlide.title}
              </h1>
              <p className="mx-auto max-w-2xl text-base font-medium text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)] sm:text-xl lg:mx-0">
                {activeSlide.description}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">{label}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href={activeSlide.ctaHref}
                className="inline-flex items-center rounded-full bg-[#0f6ecf] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(15,110,207,0.35)] transition hover:translate-y-[-3px] hover:bg-[#0b5cb0]"
              >
                {activeSlide.ctaLabel}
              </Link>
              <Link
                href="/usluge"
                className="inline-flex items-center rounded-full border border-white/35 bg-black/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-dark"
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

