"use client";

import { useEffect } from "react";

export function Plausible() {
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (!domain || document.getElementById("plausible-script")) return;

    const script = document.createElement("script");
    script.id = "plausible-script";
    script.defer = true;
    script.dataset.domain = domain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }, []);

  return null;
}
