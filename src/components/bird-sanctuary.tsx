import React, { useState, useEffect, useCallback } from 'react';
import { ZenButton } from '@/components/ui/zen-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type GamePhase = 'ready' | 'playing' | 'victory' | 'timeup';

interface Bird {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji: string;
  caught: boolean;
  size: number;
}

interface BirdSanctuaryProps {
  onComplete?: (success: boolean) => void;
}

const BIRD_EMOJIS = ['🐦', '🕊️', '🦋', '🐝', '🌟'];
const GAME_DURATION = 30; // 30 seconds
const TARGET_BIRDS = 8;

export const BirdSanctuary: React.FC<BirdSanctuaryProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [birds, setBirds] = useState<Bird[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const { toast } = useToast();

  const phaseInstructions = {
    ready: 'Gather peaceful thoughts by catching the floating elements of joy!',
    playing: `Catch the floating birds and butterflies. ${caughtCount}/${TARGET_BIRDS} collected`,
    victory: '🎉 You\'ve created a sanctuary of peace in your mind!',
    timeup: 'Time\'s up! Every bird you caught brought you closer to calm.'
  };

  const createBird = useCallback((id: string): Bird => {
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;
    
    // Spawn from different sides of the screen
    switch (side) {
      case 0: // top
        x = Math.random() * 100;
        y = -5;
        vx = (Math.random() - 0.5) * 0.5;
        vy = Math.random() * 0.3 + 0.1;
        break;
      case 1: // right
        x = 105;
        y = Math.random() * 100;
        vx = -(Math.random() * 0.3 + 0.1);
        vy = (Math.random() - 0.5) * 0.5;
        break;
      case 2: // bottom
        x = Math.random() * 100;
        y = 105;
        vx = (Math.random() - 0.5) * 0.5;
        vy = -(Math.random() * 0.3 + 0.1);
        break;
      default: // left
        x = -5;
        y = Math.random() * 100;
        vx = Math.random() * 0.3 + 0.1;
        vy = (Math.random() - 0.5) * 0.5;
        break;
    }

    return {
      id,
      x,
      y,
      vx,
      vy,
      emoji: BIRD_EMOJIS[Math.floor(Math.random() * BIRD_EMOJIS.length)],
      caught: false,
      size: Math.random() * 0.5 + 0.8 // 0.8 to 1.3
    };
  }, []);

  const updateBirds = useCallback(() => {
    setBirds(prevBirds => 
      prevBirds.map(bird => {
        if (bird.caught) return bird;
        
        let newX = bird.x + bird.vx;
        let newY = bird.y + bird.vy;
        
        // Bounce off edges or remove if too far
        if (newX < -10 || newX > 110 || newY < -10 || newY > 110) {
          return { ...bird, x: -100, y: -100 }; // Move off screen
        }
        
        return { ...bird, x: newX, y: newY };
      }).filter(bird => bird.x > -50 && bird.y > -50) // Remove birds that are too far off screen
    );
  }, []);

  const addNewBird = useCallback(() => {
    if (phase === 'playing') {
      setBirds(prevBirds => {
        if (prevBirds.length < 6) { // Max 6 birds on screen
          return [...prevBirds, createBird(Date.now().toString())];
        }
        return prevBirds;
      });
    }
  }, [phase, createBird]);

  // Game loop
  useEffect(() => {
    if (phase !== 'playing') return;

    const gameInterval = setInterval(() => {
      updateBirds();
    }, 50);

    const spawnInterval = setInterval(addNewBird, 2000);

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPhase(caughtCount >= TARGET_BIRDS ? 'victory' : 'timeup');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, [phase, updateBirds, addNewBird, caughtCount]);

  // Check victory condition
  useEffect(() => {
    if (caughtCount >= TARGET_BIRDS && phase === 'playing') {
      setPhase('victory');
      toast({
        title: "Sanctuary Complete! 🌟",
        description: "You've gathered enough peaceful thoughts to create inner calm.",
      });
      onComplete?.(true);
    }
  }, [caughtCount, phase, toast, onComplete]);

  const handleBirdClick = (birdId: string) => {
    setBirds(prevBirds =>
      prevBirds.map(bird => {
        if (bird.id === birdId && !bird.caught) {
          setCaughtCount(prev => prev + 1);
          return { ...bird, caught: true };
        }
        return bird;
      })
    );
  };

  const startGame = () => {
    setPhase('playing');
    setBirds([]);
    setCaughtCount(0);
    setTimeLeft(GAME_DURATION);
    
    // Add initial birds
    const initialBirds = Array.from({ length: 3 }, (_, i) => 
      createBird(`initial-${i}`)
    );
    setBirds(initialBirds);
  };

  const resetGame = () => {
    setPhase('ready');
    setBirds([]);
    setCaughtCount(0);
    setTimeLeft(GAME_DURATION);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-calm border-primary/20 shadow-mystical">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Bird Sanctuary
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          {phaseInstructions[phase]}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress and Timer */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Birds Collected</span>
              <span className="text-sm text-muted-foreground">{caughtCount}/{TARGET_BIRDS}</span>
            </div>
            <Progress 
              value={(caughtCount / TARGET_BIRDS) * 100} 
              className="h-3 bg-muted/50"
            />
          </div>
          
          {phase === 'playing' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Time Left</span>
                <span className="text-sm text-muted-foreground">{timeLeft}s</span>
              </div>
              <Progress 
                value={(timeLeft / GAME_DURATION) * 100} 
                className="h-3 bg-muted/50"
              />
            </div>
          )}
        </div>

        {/* Game Area */}
        <div className="relative w-full h-96 bg-gradient-mystical rounded-2xl shadow-inner overflow-hidden border-2 border-primary/20">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-healing/20 via-transparent to-calm/20" />
          </div>
          
          {/* Floating background particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`bg-${i}`}
              className="absolute w-1 h-1 rounded-full bg-accent-glow/20 animate-float"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}

          {/* Birds */}
          {birds.map((bird) => (
            <div
              key={bird.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 select-none ${
                bird.caught 
                  ? 'animate-bounce scale-150 opacity-50 pointer-events-none' 
                  : 'hover:scale-110 animate-float'
              }`}
              style={{
                left: `${bird.x}%`,
                top: `${bird.y}%`,
                fontSize: `${bird.size * 2}rem`,
                animationDelay: `${bird.id.slice(-1)}s`
              }}
              onClick={() => handleBirdClick(bird.id)}
            >
              <div className="drop-shadow-lg">
                {bird.emoji}
              </div>
              
              {/* Caught effect */}
              {bird.caught && (
                <div className="absolute inset-0 flex items-center justify-center animate-ping">
                  <div className="text-healing text-xs">+1</div>
                </div>
              )}
            </div>
          ))}

          {/* Game state overlay */}
          {phase === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-6xl mb-4">🌸</div>
                <p className="text-muted-foreground mb-4">
                  Tap the floating birds and butterflies to collect peaceful thoughts
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-healing">{caughtCount}</div>
            <div className="text-sm text-muted-foreground">Collected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{birds.filter(b => !b.caught).length}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">
              {Math.round((caughtCount / TARGET_BIRDS) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {phase === 'ready' && (
            <ZenButton variant="hero" size="lg" onClick={startGame}>
              Begin Sanctuary 🌸
            </ZenButton>
          )}
          
          {(phase === 'victory' || phase === 'timeup') && (
            <ZenButton variant="zen" size="lg" onClick={resetGame}>
              Create New Sanctuary 🔄
            </ZenButton>
          )}
          
          {phase === 'playing' && (
            <ZenButton variant="outline" onClick={resetGame}>
              Reset
            </ZenButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};