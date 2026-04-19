'use client';

import { useMemo, useState } from "react";
import type { Service } from "@/content/site";
import { services } from "@/content/site";
import type { ServiceGallery } from "@/lib/api";
import clsx from "clsx";

type Props = {
  galleries: ServiceGallery[];
};

export default function ServiceGallery({ galleries }: Props) {
  const serviceList = useMemo(() => services as Service[], []);
  const [active, setActive] = useState<string>("all");

  const images = useMemo(() => {
    const bySlug = new Map(galleries.map((g) => [g.service_slug, g.images ?? []]));
    if (active === "all") {
      return serviceList.flatMap((s) => bySlug.get(s.slug) ?? []);
    }
    return bySlug.get(active) ?? [];
  }, [active, galleries, serviceList]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={clsx(
            "rounded-full px-4 py-2 text-sm font-semibold transition",
            active === "all" ? "bg-primary text-white" : "border border-black/10 bg-white text-dark"
          )}
        >
          Sve
        </button>
        {serviceList.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setActive(s.slug)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              active === s.slug ? "bg-primary text-white" : "border border-black/10 bg-white text-dark"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      {images.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <a
              key={img.id}
              href={img.src}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <img src={img.src} alt={img.alt || "Galerija"} className="h-56 w-full object-cover transition group-hover:scale-[1.02]" />
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">Nema slika za izabranu uslugu.</p>
      )}
    </div>
  );
}

