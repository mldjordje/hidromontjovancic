'use client';

import { useEffect, useMemo, useState } from "react";
import type { Service } from "@/content/site";
import { services } from "@/content/site";
import type { ServiceGalleryImage } from "@/lib/api";
import { ApiError, adminDeleteServiceGalleryImage, adminGetServiceGallery, adminUploadServiceGalleryImage } from "@/lib/admin-client";

type ViewState = "loading" | "login" | "ready" | "error";

export default function ServiceGalleriesPanel() {
  const options = useMemo(() => services as Service[], []);
  const [view, setView] = useState<ViewState>("loading");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [serviceSlug, setServiceSlug] = useState(options[0]?.slug ?? "");
  const [images, setImages] = useState<ServiceGalleryImage[]>([]);

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSlug]);

  async function refresh() {
    if (!serviceSlug) return;
    setMessage(null);
    setBusy(true);
    try {
      const res = await adminGetServiceGallery(serviceSlug);
      setImages(res.images ?? []);
      setView("ready");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setView("login");
      } else {
        setView("error");
        setMessage("Neuspesno ucitavanje galerije za uslugu.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files?.length || !serviceSlug) return;
    setBusy(true);
    setMessage(null);
    try {
      for (const file of Array.from(files)) {
        await adminUploadServiceGalleryImage(serviceSlug, file);
      }
      await refresh();
      setMessage("Slike su dodate u galeriju.");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setView("login");
      } else {
        setMessage("Neuspesan upload slika.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(mediaId: number) {
    if (!serviceSlug) return;
    if (!confirm("Obrisati sliku iz galerije?")) return;
    setBusy(true);
    setMessage(null);
    try {
      await adminDeleteServiceGalleryImage(serviceSlug, mediaId);
      await refresh();
      setMessage("Slika je obrisana.");
    } catch {
      setMessage("Neuspesno brisanje slike.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-gray-700">
          {message}
        </div>
      )}

      {view === "loading" && <p className="text-sm text-gray-600">Ucitavanje...</p>}

      {view === "login" && (
        <div className="rounded-2xl border border-black/5 bg-white p-6 text-sm text-gray-700 shadow-sm">
          Potrebna je admin prijava. Otvori prvo <a className="font-semibold text-primary" href="/admin/projects">Admin</a> i prijavi se,
          pa se vrati na ovu stranicu.
        </div>
      )}

      {(view === "ready" || view === "error") && (
        <section className="grid gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid gap-1 text-sm font-semibold text-dark">
              Usluga
              <select
                value={serviceSlug}
                onChange={(e) => setServiceSlug(e.target.value)}
                className="min-w-[260px] rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold"
                disabled={busy}
              >
                {options.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-black/20 bg-gray-50 px-4 py-3 text-sm font-semibold text-dark transition hover:border-primary/60 hover:bg-white">
              <span>{busy ? "Upload u toku..." : "Dodaj slike u galeriju"}</span>
              <span className="rounded-full bg-dark px-3 py-1 text-xs text-white">Upload</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => void handleUpload(e.target.files)}
                disabled={busy}
                className="hidden"
              />
            </label>
          </div>

          {images.length ? (
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img) => (
                <div key={img.id} className="relative overflow-hidden rounded-xl border border-black/10 bg-white">
                  <img src={img.src} alt={img.alt || "Slika"} className="h-28 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => void handleDelete(img.id)}
                    className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-xs font-semibold"
                    disabled={busy}
                  >
                    Obrisi
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Nema slika za ovu uslugu. Dodaj prve slike uploadom.</p>
          )}
        </section>
      )}
    </div>
  );
}

