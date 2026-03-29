import type { Metadata } from "next";
import { MarketingFullPage } from "@/components/marketing/MarketingPage";

export const metadata: Metadata = {
  title: "Digital Marketing — ITMM",
  description:
    "Social media management, content creation, visual design, and digital marketing education. Marija Miletić — your digital marketing specialist.",
  openGraph: {
    title: "Digital Marketing — ITMM",
    description:
      "Social media management, content creation, visual design, and digital marketing education.",
  },
};

export default function MarketingPage() {
  return <MarketingFullPage />;
}
