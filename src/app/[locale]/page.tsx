import { LandingNav } from "@/components/layout/LandingNav";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { LandingHero } from "@/components/landing/LandingHero";
import { TwoDoors } from "@/components/landing/TwoDoors";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <>
      <LoadingScreen />
      <LandingNav />
      <main>
        <LandingHero />
        <TwoDoors />
      </main>
      <LandingFooter />
    </>
  );
}
