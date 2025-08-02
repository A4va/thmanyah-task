import HeroSection from "@/components/hero-section";
import ResultsSection from "@/components/results-section";


export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 relative overflow-hidden">
      <HeroSection />
      <ResultsSection />
    </div>
  );
}
