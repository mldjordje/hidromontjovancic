'use client';

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const cleanupStalePwa = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      } catch {
        // Ignore unregister errors.
      }

      if ("caches" in window) {
        try {
          const keys = await caches.keys();
          await Promise.all(
            keys
              .filter((key) => key.startsWith("hidromont-"))
              .map((key) => caches.delete(key))
          );
        } catch {
          // Ignore cache cleanup errors.
        }
      }
    };

    void cleanupStalePwa();
  }, []);

  return null;
}
