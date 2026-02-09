'use client';

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallAdminApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  if (installed) {
    return (
      <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        Admin aplikacija je instalirana.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-dark">Android: instalacija admin aplikacije</h2>
      <p className="mt-2 text-sm text-gray-600">
        Otvorite admin u Chrome pregledacu i dodajte ga na pocetni ekran kao aplikaciju.
      </p>

      {deferredPrompt ? (
        <button
          type="button"
          onClick={handleInstall}
          className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Instaliraj admin aplikaciju
        </button>
      ) : (
        <p className="mt-3 text-xs text-gray-500">
          Ako dugme nije dostupno, otvorite meni u Chrome-u i izaberite "Add to Home screen".
        </p>
      )}
    </div>
  );
}
