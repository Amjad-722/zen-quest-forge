import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BreathingOrbProps {
  isActive: boolean;
  phase: 'inhale' | 'exhale' | 'hold';
  onPhaseComplete?: () => void;
  className?: string;
}

export const BreathingOrb: React.FC<BreathingOrbProps> = ({
  isActive,
  phase,
  onPhaseComplete,
  className
}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isActive) {
      setScale(1);
      return;
    }

    const duration = phase === 'hold' ? 1000 : phase === 'inhale' ? 4000 : 6000;
    const targetScale = phase === 'inhale' ? 1.4 : phase === 'exhale' ? 0.8 : scale;

    const startTime = Date.now();
    const startScale = scale;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use ease-in-out for smooth breathing
      const easeProgress = 0.5 * (1 - Math.cos(progress * Math.PI));
      const currentScale = startScale + (targetScale - startScale) * easeProgress;
      
      setScale(currentScale);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onPhaseComplete?.();
      }
    };

    animate();
  }, [isActive, phase, onPhaseComplete]);

  return (
    <div
      className={cn(
        "relative w-40 h-40 rounded-full transition-all duration-300",
        "bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20",
        "shadow-glow animate-glow-pulse",
        "flex items-center justify-center",
        className
      )}
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Inner core */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-glow/40 to-secondary-glow/40 shadow-healing animate-healing-pulse" />
      
      {/* Outer rings */}
      <div className="absolute w-32 h-32 rounded-full border border-primary/30 animate-breathe" />
      <div className="absolute w-36 h-36 rounded-full border border-secondary/20 animate-deep-breathe" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-2 h-2 rounded-full bg-accent-glow/60",
              "animate-float"
            )}
            style={{
              top: `${20 + Math.sin(i * 60) * 30}%`,
              left: `${20 + Math.cos(i * 60) * 30}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};