import React, { useState, useEffect, useCallback } from 'react';
import { BreathingOrb } from '@/components/ui/breathing-orb';
import { ZenButton } from '@/components/ui/zen-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import stressMonsterImage from '@/assets/stress-monster.jpg';

type BattlePhase = 'ready' | 'inhale' | 'hold' | 'exhale' | 'victory' | 'defeat';

interface BreathingBattleProps {
  onComplete?: (success: boolean) => void;
}

export const BreathingBattle: React.FC<BreathingBattleProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<BattlePhase>('ready');
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [breathCount, setBreathCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const phaseInstructions = {
    ready: 'Press Start to begin your breathing battle!',
    inhale: 'Breathe in slowly... 4 seconds',
    hold: 'Hold your breath... 1 second',
    exhale: 'Breathe out slowly... 6 seconds',
    victory: '🎉 You defeated the stress monster! Well done!',
    defeat: 'The stress grew stronger. Try again with deeper breaths.'
  };

  const handlePhaseComplete = useCallback(() => {
    if (phase === 'inhale') {
      setPhase('hold');
    } else if (phase === 'hold') {
      setPhase('exhale');
    } else if (phase === 'exhale') {
      // Complete one breath cycle
      const damage = Math.random() * 25 + 15; // 15-40 damage per breath
      const newHealth = Math.max(0, monsterHealth - damage);
      setMonsterHealth(newHealth);
      setBreathCount(prev => prev + 1);
      
      if (newHealth <= 0) {
        setPhase('victory');
        setIsActive(false);
        toast({
          title: "Victory! 🌟",
          description: "You've successfully calmed your stress. Take a moment to appreciate this feeling of peace.",
        });
        onComplete?.(true);
      } else if (breathCount >= 8) {
        // Max 8 breaths before showing defeat
        setPhase('defeat');
        setIsActive(false);
        onComplete?.(false);
      } else {
        setPhase('inhale');
      }
    }
  }, [phase, monsterHealth, breathCount, toast, onComplete]);

  const startBattle = () => {
    setPhase('inhale');
    setIsActive(true);
    setMonsterHealth(100);
    setBreathCount(0);
  };

  const resetBattle = () => {
    setPhase('ready');
    setIsActive(false);
    setMonsterHealth(100);
    setBreathCount(0);
  };

  const monsterOpacity = Math.max(0.2, monsterHealth / 100);
  const monsterScale = 0.5 + (monsterHealth / 100) * 0.5;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-calm border-primary/20 shadow-mystical">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Breathing Battle
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          {phaseInstructions[phase]}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Monster Health */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Stress Level</span>
            <span className="text-sm text-muted-foreground">{Math.round(monsterHealth)}%</span>
          </div>
          <Progress 
            value={monsterHealth} 
            className="h-3 bg-muted/50"
          />
        </div>

        {/* Battle Area */}
        <div className="flex items-center justify-center min-h-[300px] relative">
          {/* Stress Monster */}
          <div 
            className="absolute left-8 transition-all duration-500"
            style={{
              opacity: monsterOpacity,
              transform: `scale(${monsterScale})`,
              filter: phase === 'victory' ? 'blur(2px)' : 'none'
            }}
          >
            <img 
              src={stressMonsterImage} 
              alt="Stress Monster" 
              className="w-32 h-32 object-cover rounded-full shadow-lg animate-float"
            />
            {phase === 'victory' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl animate-bounce">💫</div>
              </div>
            )}
          </div>

          {/* Breathing Orb */}
          <BreathingOrb
            isActive={isActive}
            phase={phase === 'inhale' ? 'inhale' : phase === 'exhale' ? 'exhale' : 'hold'}
            onPhaseComplete={handlePhaseComplete}
            className="mx-auto"
          />

          {/* VS Text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-primary/60 pointer-events-none">
            VS
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-secondary">{breathCount}</div>
            <div className="text-sm text-muted-foreground">Breaths Taken</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{Math.max(0, 100 - monsterHealth).toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Stress Reduced</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {phase === 'ready' && (
            <ZenButton variant="hero" size="lg" onClick={startBattle}>
              Start Your Quest 🌟
            </ZenButton>
          )}
          
          {(phase === 'victory' || phase === 'defeat') && (
            <ZenButton variant="zen" size="lg" onClick={resetBattle}>
              Try Again 🔄
            </ZenButton>
          )}
          
          {isActive && (
            <ZenButton variant="outline" onClick={resetBattle}>
              Reset
            </ZenButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};