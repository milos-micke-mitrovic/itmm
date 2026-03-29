import { LandingNav } from "@/components/layout/LandingNav";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { LandingHero } from "@/components/landing/LandingHero";
import { WhySection } from "@/components/landing/WhySection";
import { TwoDoors } from "@/components/landing/TwoDoors";
import { BothCTA } from "@/components/landing/BothCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <>
      <LoadingScreen />
      <LandingNav />
      <main>
        <LandingHero />
        <WhySection />
        <TwoDoors />
        <BothCTA />
      </main>
      <LandingFooter />
    </>
  );
}
