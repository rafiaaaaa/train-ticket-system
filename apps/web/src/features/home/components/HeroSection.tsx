import { Section } from "@/components/ui/section";
import { SearchForm } from "./SearchForm";
import { Sparkles, Shield, Clock } from "lucide-react";

const features = [
  { icon: Clock, text: "Real-time schedules" },
  { icon: Shield, text: "Secure booking" },
  { icon: Sparkles, text: "Best prices guaranteed" },
];

export function HeroSection() {
  return (
    <Section className="min-h-screen flex items-center overflow-visible text-primary">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/assets/hero-train.jpg")` }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-secondary/70 via-secondary/60 to-secondary/90" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-background mb-6 animate-fade-in text-balance drop-shadow-lg">
            Your Journey Starts Here
          </h1>
          <p
            className="text-lg md:text-xl text-primary/90 max-w-2xl mx-auto mb-8 animate-fade-in drop-shadow"
            style={{ animationDelay: "0.1s" }}
          >
            Book train tickets to over 10,000 destinations across the country.
            Fast, simple, and affordable.
          </p>

          {/* Feature Badges */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 px-4 py-2 bg-background/15 backdrop-blur-md rounded-full border border-primary/25"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Form */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <SearchForm />
        </div>
      </div>
    </Section>
  );
}
