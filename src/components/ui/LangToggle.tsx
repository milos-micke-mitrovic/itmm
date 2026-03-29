"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const next = locale === "en" ? "sr" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={switchLocale}
      className="px-2.5 py-1.5 text-sm font-medium rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200 uppercase tracking-wider cursor-pointer"
      aria-label={`Switch to ${locale === "en" ? "Serbian" : "English"}`}
    >
      {locale === "en" ? "SR" : "EN"}
    </button>
  );
}
