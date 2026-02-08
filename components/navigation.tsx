'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { company } from "@/content/site";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "/", label: "Pocetna" },
  { href: "/o-nama", label: "O nama" },
  { href: "/usluge", label: "Usluge" },
  { href: "/projekti", label: "Projekti" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = useMemo(() => {
    return links.reduce<Record<string, boolean>>((map, link) => {
      map[link.href] = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href) ?? false;
      return map;
    }, {});
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden border-b border-black/5 bg-dark px-4 py-2 text-xs text-white md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between sm:px-2">
          <a href="tel:+381637012339" className="text-white/90 hover:text-primary">
            Pozovite nas: +381 63 701 2339
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/HidroMontJovancic/"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-primary"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/brand/logo-transparent.png" alt={company.name} className="h-11 w-auto" />
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">{company.tagline}</p>
            <p className="text-sm font-semibold text-dark">{company.name}</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-dark shadow-sm transition hover:shadow-lg sm:hidden"
          aria-label="Toggle navigation"
        >
          <motion.span
            initial={false}
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className="absolute h-0.5 w-6 rounded-full bg-dark"
          />
          <motion.span
            initial={false}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="absolute h-0.5 w-6 rounded-full bg-dark"
          />
          <motion.span
            initial={false}
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className="absolute h-0.5 w-6 rounded-full bg-dark"
          />
        </button>

        <div className="flex flex-1 items-center justify-end gap-6">
          <div className="hidden items-center gap-6 sm:flex">
            <ul className="flex items-center gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "text-sm font-semibold transition-colors",
                      active[link.href] ? "text-dark" : "text-gray-600 hover:text-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/kontakt#forma"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-dark shadow-[0_10px_40px_rgba(244,161,0,0.3)] transition hover:translate-y-[-2px]"
            >
              Posalji upit
            </Link>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-4 right-4 top-full flex flex-col gap-4 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-2xl backdrop-blur sm:hidden"
              >
                <ul className="flex w-full flex-col items-start gap-3">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 * i }}
                      className="w-full"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={clsx(
                          "block rounded-xl px-3 py-2 text-sm font-semibold transition",
                          active[link.href] ? "bg-primary/10 text-dark" : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <Link
                    href="/kontakt#forma"
                    onClick={() => setOpen(false)}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-dark shadow-[0_12px_40px_rgba(244,161,0,0.32)] transition hover:translate-y-[-2px]"
                  >
                    Posalji upit
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
