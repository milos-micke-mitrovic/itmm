import type { Metadata } from "next";
import { WebNav } from "@/components/layout/WebNav";
import { WebHero } from "@/components/web/WebHero";
import { SocialProof } from "@/components/web/SocialProof";
import { Portfolio } from "@/components/web/Portfolio";
import { Process } from "@/components/web/Process";
import { Pricing } from "@/components/web/Pricing";
import { Calculator } from "@/components/web/Calculator";
import { FAQ } from "@/components/web/FAQ";
import { Testimonials } from "@/components/web/Testimonials";
import { About } from "@/components/web/About";
import { BlogPreview } from "@/components/web/BlogPreview";
import { Contact } from "@/components/web/Contact";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { BackToTop } from "@/components/layout/BackToTop";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { WebFooter } from "@/components/layout/WebFooter";

export const metadata: Metadata = {
  title: "Web Development — ITMM",
  description:
    "Fast, modern websites for small businesses. Transparent pricing, clear timelines, no disappearing after delivery.",
  openGraph: {
    title: "Web Development — ITMM",
    description:
      "Fast, modern websites for small businesses. Transparent pricing, clear timelines, no disappearing after delivery.",
  },
};

export default function WebPage() {
  return (
    <>
      <CustomCursor />
      <WebNav />
      <main>
        <WebHero />
        <SocialProof />
        <Portfolio />
        <Process />
        <Pricing />
        <Calculator />
        <FAQ />
        <Testimonials />
        <About />
        <BlogPreview />
        <Contact />
      </main>
      <WebFooter />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
