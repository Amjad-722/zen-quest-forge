import React from 'react';
import { ZenButton } from '@/components/ui/zen-button';
import heroImage from '@/assets/hero-forest-island.jpg';

interface HeroSectionProps {
  onStartQuest?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartQuest }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/40" />
        <div className="absolute inset-0 bg-gradient-hero/30" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-accent-glow/40 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-shimmer">
            ZenQuest
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-primary/90 font-medium">
            Defeat Stress. Build Resilience.
          </p>
          
          <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
            One breath at a time. 🌸
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <ZenButton 
              variant="hero" 
              size="xl" 
              onClick={onStartQuest}
              className="text-xl px-12 py-4"
            >
              Start Your Quest ✨
            </ZenButton>
            
            <ZenButton 
              variant="outline" 
              size="lg"
              className="backdrop-blur-sm border-white/40 text-white hover:bg-white/10"
            >
              Learn More 🌿
            </ZenButton>
          </div>
        </div>

        {/* Breathing Reminder */}
        <div className="mt-16 opacity-75">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-breathe shadow-glow flex items-center justify-center">
            <div className="text-2xl">🫁</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Take a deep breath and begin your journey
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};