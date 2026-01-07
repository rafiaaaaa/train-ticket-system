import { HeroSection } from "@/features/home/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
