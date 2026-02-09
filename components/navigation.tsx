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
    <header className="sticky top-0 z-50 border-b border-[#d7e5f8] bg-white/90 backdrop-blur-xl">
      <div className="hidden bg-gradient-to-r from-[#0c488d] to-[#0f6ecf] px-4 py-2 text-xs text-white md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between sm:px-2">
          <a href="tel:+381637012339" className="font-medium text-white/90 hover:text-white">
            Pozovite nas: +381 63 701 2339
          </a>
          <p className="font-medium text-white/85">{company.workingHours}</p>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="overflow-hidden rounded-xl border border-[#d9e8f9] bg-white p-1 shadow-sm">
            <img
              src="/brand/newlogo-withwhitebg.jpg?v=20260210"
              alt={company.name}
              className="h-12 w-auto object-contain sm:h-14"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0f6ecf]">{company.tagline}</p>
            <p className="text-sm font-semibold text-dark">{company.name}</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                active[link.href]
                  ? "bg-[#e8f1fd] text-[#0f6ecf]"
                  : "text-gray-700 hover:bg-[#edf4fc] hover:text-[#0f6ecf]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt#forma"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-[#0f6ecf] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,110,207,0.3)] transition hover:bg-[#0b5cb0]"
          >
            Posalji upit
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c9dcf4] bg-[#f4f9ff] text-[#0f6ecf] shadow-sm transition hover:bg-white sm:hidden"
          aria-label="Toggle navigation"
        >
          <motion.span
            initial={false}
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className="absolute h-0.5 w-5 rounded-full bg-[#0f6ecf]"
          />
          <motion.span
            initial={false}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="absolute h-0.5 w-5 rounded-full bg-[#0f6ecf]"
          />
          <motion.span
            initial={false}
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className="absolute h-0.5 w-5 rounded-full bg-[#0f6ecf]"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[#d7e5f8] bg-white/95 px-4 pb-4 pt-3 shadow-xl sm:hidden"
          >
            <div className="mb-3 rounded-2xl bg-gradient-to-r from-[#0d4f9a] to-[#0f6ecf] px-4 py-3 text-white">
              <p className="text-sm font-semibold">{company.name}</p>
              <p className="text-xs text-white/85">{company.tagline}</p>
            </div>
            <ul className="grid gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "block rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                      active[link.href] ? "bg-[#e8f1fd] text-[#0f6ecf]" : "text-gray-700 hover:bg-[#f4f8fe]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="tel:+381637012339"
                className="inline-flex items-center justify-center rounded-xl border border-[#c8dcf5] bg-white px-3 py-2 text-sm font-semibold text-[#0f6ecf]"
              >
                Pozovi
              </a>
              <Link
                href="/kontakt#forma"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-[#0f6ecf] px-3 py-2 text-sm font-semibold text-white"
              >
                Posalji upit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
