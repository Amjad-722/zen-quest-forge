import React from "react";
import { ZenButton } from "@/components/ui/zen-button";
import heroImage from "@/assets/hero-forest-island.jpg";

interface HeroSectionProps {
  onStartQuest?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuest }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Enhanced Shadows */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-accent-glow/60 to-primary-glow/40 animate-float shadow-lg"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: `0 0 ${
                Math.random() * 20 + 10
              }px hsl(var(--accent-glow) / 0.4)`,
            }}
          />
        ))}
      </div>

      {/* Hero Content with Glass Morphism */}
      <div className="relative z-10 mt-24 text-center max-w-5xl mx-auto px-6">
        <div className="backdrop-blur-xl bg-gradient-glass rounded-3xl p-12 shadow-glass border border-primary/20 animate-fade-in-up">
          <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-shimmer drop-shadow-2xl">
            ZenQuest
          </h1>

          <div className="space-y-6 mb-12">
            <p className="text-2xl md:text-3xl font-bold text-foreground drop-shadow-lg">
              Defeat Stress. Build Resilience.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your mental wellness journey into an epic adventure.
              Master breathing techniques, conquer stress monsters, and build
              unshakeable inner peace. 🌸
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <ZenButton
              variant="hero"
              size="xl"
              onClick={onStartQuest}
              className="text-xl px-16 py-6 shadow-2xl hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
            >
              Start Your Quest ✨
            </ZenButton>

            <ZenButton
              variant="outline"
              size="lg"
              className="backdrop-blur-sm border-primary/30 text-foreground hover:bg-primary/20 px-12 py-4 shadow-xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300"
            >
              Learn More 🌿
            </ZenButton>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="backdrop-blur-sm bg-gradient-to-br from-healing/20 to-healing/10 rounded-2xl p-4 border border-healing/30 shadow-neon">
              <div className="text-2xl font-bold text-healing">1000+</div>
              <div className="text-sm text-muted-foreground">Lives Transformed</div>
            </div>
            <div className="backdrop-blur-sm bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-4 border border-primary/30 shadow-glow">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Stress Reduction</div>
            </div>
            <div className="backdrop-blur-sm bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl p-4 border border-secondary/30 shadow-mystical">
              <div className="text-2xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>

        {/* Floating Breathing Reminder */}
        <div className="mt-16 opacity-90">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 animate-deep-breathe shadow-glow backdrop-blur-sm border border-primary/30 flex items-center justify-center">
            <div className="text-3xl">🫁</div>
          </div>
          <p className="mt-6 text-muted-foreground font-medium">
            Take a deep breath and begin your transformation
          </p>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/40 rounded-full flex justify-center backdrop-blur-sm bg-primary/10 shadow-glow">
          <div className="w-1.5 h-4 bg-primary/60 rounded-full mt-3 animate-pulse shadow-sm" />
        </div>
      </div>
    </section>
  );
};
