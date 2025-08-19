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
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white via-primary/5 to-secondary/10 border-0 shadow-2xl backdrop-blur-sm overflow-hidden">
      <CardHeader className="text-center pb-6 relative">
        {/* Decorative header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-stress/20 to-primary/20 rounded-full blur-xl" />
        
        <CardTitle className="text-4xl font-black mt-6 mb-4 bg-gradient-to-r from-stress via-primary to-secondary bg-clip-text text-transparent">
          Breathing Battle
        </CardTitle>
        <p className="text-muted-foreground text-lg font-medium text-white">
          {phaseInstructions[phase]}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8 pb-8">
        {/* Enhanced Monster Health */}
        <div className="bg-gradient-to-r from-stress/10 to-primary/10 rounded-2xl p-6 border border-stress/20 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-stress">Stress Level</span>
            <span className="text-lg font-bold text-stress">{Math.round(monsterHealth)}%</span>
          </div>
          <Progress 
            value={monsterHealth} 
            className="h-4 bg-muted/30 shadow-inner"
          />
          <div className="mt-2 text-sm text-muted-foreground text-center">
            {monsterHealth > 75 ? "🔥 High Stress" : 
             monsterHealth > 50 ? "⚡ Moderate Stress" : 
             monsterHealth > 25 ? "🌊 Calming Down" : "✨ Almost Peaceful"}
          </div>
        </div>

        {/* Enhanced Battle Area */}
        <div className="relative min-h-[400px] bg-gradient-to-br from-mystical/20 to-calm/20 rounded-3xl shadow-inner border border-primary/20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-stress/5 via-transparent to-healing/5" />
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-accent-glow/40 to-primary-glow/40 animate-float"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}

          <div className="flex items-center justify-center h-full relative p-8">
            {/* Enhanced Stress Monster */}
            <div 
              className="absolute left-12 transition-all duration-500 z-10"
              style={{
                opacity: monsterOpacity,
                transform: `scale(${monsterScale})`,
                filter: phase === 'victory' ? 'blur(2px) grayscale(100%)' : 'none'
              }}
            >
              <div className="relative">
                <img 
                  src={stressMonsterImage} 
                  alt="Stress Monster" 
                  className="w-40 h-40 object-cover rounded-full shadow-2xl animate-float border-4 border-stress/30"
                />
                {/* Monster health indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stress rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {Math.round(monsterHealth)}
                </div>
                
                {phase === 'victory' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-bounce drop-shadow-lg">💫</div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Breathing Orb */}
            <div className="mx-auto relative z-20">
              <BreathingOrb
                isActive={isActive}
                phase={phase === 'inhale' ? 'inhale' : phase === 'exhale' ? 'exhale' : 'hold'}
                onPhaseComplete={handlePhaseComplete}
                className="shadow-2xl"
              />
            </div>

            {/* Enhanced VS Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
              <div className="text-4xl font-black text-primary/80 drop-shadow-lg animate-glow-pulse">
                VS
              </div>
            </div>

            {/* Battle effects */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-healing rounded-full animate-ping"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-secondary/20 to-healing/20 rounded-2xl p-6 text-center border border-secondary/30 shadow-lg backdrop-blur-sm">
            <div className="text-4xl font-black text-secondary mb-2">{breathCount}</div>
            <div className="text-sm font-medium text-muted-foreground">Breaths Taken</div>
            <div className="text-xs text-secondary/70 mt-1">Keep breathing steadily</div>
          </div>
          <div className="bg-gradient-to-br from-healing/20 to-primary/20 rounded-2xl p-6 text-center border border-healing/30 shadow-lg backdrop-blur-sm">
            <div className="text-4xl font-black text-healing mb-2">{Math.max(0, 100 - monsterHealth).toFixed(0)}%</div>
            <div className="text-sm font-medium text-muted-foreground">Stress Reduced</div>
            <div className="text-xs text-healing/70 mt-1">You're doing great!</div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex justify-center gap-6">
          {phase === 'ready' && (
            <ZenButton 
              variant="hero" 
              size="xl" 
              onClick={startBattle}
              className="px-12 py-4 text-xl shadow-2xl hover:shadow-stress/30 transform hover:scale-105 transition-all duration-300"
            >
              Start Your Quest 🌟
            </ZenButton>
          )}
          
          {(phase === 'victory' || phase === 'defeat') && (
            <ZenButton 
              variant="zen" 
              size="lg" 
              onClick={resetBattle}
              className="px-8 py-3 shadow-xl hover:shadow-healing/30 transform hover:scale-105 transition-all duration-300"
            >
              Try Again 🔄
            </ZenButton>
          )}
          
          {isActive && (
            <ZenButton 
              variant="outline" 
              onClick={resetBattle}
              className="px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Reset
            </ZenButton>
          )}
        </div>

        {/* Victory/Defeat Messages */}
        {phase === 'victory' && (
          <div className="bg-gradient-to-r from-healing/20 to-primary/20 rounded-2xl p-8 text-center border border-healing/30 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-healing mb-2">Victory!</h3>
            <p className="text-muted-foreground">You've successfully conquered your stress through mindful breathing!</p>
          </div>
        )}

        {phase === 'defeat' && (
          <div className="bg-gradient-to-r from-stress/20 to-primary/20 rounded-2xl p-8 text-center border border-stress/30 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="text-6xl mb-4">💪</div>
            <h3 className="text-2xl font-bold text-stress mb-2">Keep Trying!</h3>
            <p className="text-muted-foreground">Every breath is progress. Let's try again with deeper, slower breaths.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};