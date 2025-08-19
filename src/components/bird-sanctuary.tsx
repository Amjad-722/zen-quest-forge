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
    if (phase !== 'playing') {
      console.log('Game loop not running, phase:', phase);
      return;
    }

    console.log('Starting game loop with', birds.length, 'birds');

    const gameInterval = setInterval(() => {
      updateBirds();
    }, 50);

    const spawnInterval = setInterval(addNewBird, 2000);

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          const newPhase = caughtCount >= TARGET_BIRDS ? 'victory' : 'timeup';
          console.log('Game ending, phase:', newPhase, 'caught:', caughtCount);
          setPhase(newPhase);
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
    console.log('Bird clicked:', birdId, 'Current phase:', phase);
    setBirds(prevBirds =>
      prevBirds.map(bird => {
        if (bird.id === birdId && !bird.caught) {
          console.log('Catching bird:', birdId);
          setCaughtCount(prev => {
            console.log('Caught count updating from', prev, 'to', prev + 1);
            return prev + 1;
          });
          return { ...bird, caught: true };
        }
        return bird;
      })
    );
  };

  const startGame = () => {
    console.log('Starting bird game');
    setPhase('playing');
    setBirds([]);
    setCaughtCount(0);
    setTimeLeft(GAME_DURATION);
    
    // Add initial birds
    const initialBirds = Array.from({ length: 3 }, (_, i) => 
      createBird(`initial-${i}`)
    );
    console.log('Initial birds created:', initialBirds);
    setBirds(initialBirds);
  };

  const resetGame = () => {
    setPhase('ready');
    setBirds([]);
    setCaughtCount(0);
    setTimeLeft(GAME_DURATION);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-white via-healing/5 to-calm/10 border-0 shadow-2xl backdrop-blur-sm overflow-hidden">
      <CardHeader className="text-center pb-6 relative">
        {/* Decorative header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-healing via-calm to-secondary" />
        <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-healing/20 to-calm/20 rounded-full blur-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-lg" />
        
        <CardTitle className="text-4xl font-black mt-6 mb-4 bg-gradient-to-r from-healing via-calm to-secondary bg-clip-text text-transparent">
          Bird Sanctuary
        </CardTitle>
        <p className="text-muted-foreground text-lg font-medium">
          {phaseInstructions[phase]}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8 pb-8">
        {/* Enhanced Progress and Timer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-healing/10 to-calm/10 rounded-2xl p-6 border border-healing/20 shadow-lg backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-healing">Birds Collected</span>
              <span className="text-lg font-bold text-healing">{caughtCount}/{TARGET_BIRDS}</span>
            </div>
            <Progress 
              value={(caughtCount / TARGET_BIRDS) * 100} 
              className="h-4 bg-muted/30 shadow-inner"
            />
            <div className="mt-2 text-sm text-muted-foreground text-center">
              {caughtCount === 0 ? "🌱 Start collecting" : 
               caughtCount < TARGET_BIRDS / 2 ? "🌿 Keep going" : 
               caughtCount < TARGET_BIRDS ? "🌸 Almost there!" : "✨ Sanctuary complete!"}
            </div>
          </div>
          
          {phase === 'playing' && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 shadow-lg backdrop-blur-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-primary">Time Left</span>
                <span className="text-lg font-bold text-primary">{timeLeft}s</span>
              </div>
              <Progress 
                value={(timeLeft / GAME_DURATION) * 100} 
                className="h-4 bg-muted/30 shadow-inner"
              />
              <div className="mt-2 text-sm text-muted-foreground text-center">
                {timeLeft > 20 ? "⏰ Plenty of time" : 
                 timeLeft > 10 ? "⚡ Time is ticking" : "🔥 Final moments!"}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Game Area */}
        <div className="relative w-full h-[500px] bg-gradient-to-br from-mystical/30 via-healing/20 to-calm/30 rounded-3xl shadow-2xl overflow-hidden border-2 border-healing/30">
          {/* Enhanced background elements */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-healing/10 via-transparent to-calm/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
          </div>
          
          {/* Enhanced floating background particles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`bg-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-accent-glow/30 to-healing/40 animate-float shadow-sm"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(var(--healing) / 0.3)`
              }}
            />
          ))}

          {/* Enhanced Birds */}
          {birds.map((bird) => (
            <div
              key={bird.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 select-none ${
                bird.caught 
                  ? 'animate-bounce scale-150 opacity-30 pointer-events-none' 
                  : 'hover:scale-125 animate-float hover:drop-shadow-2xl'
              }`}
              style={{
                left: `${bird.x}%`,
                top: `${bird.y}%`,
                fontSize: `${bird.size * 2.5}rem`,
                animationDelay: `${bird.id.slice(-1)}s`,
                filter: bird.caught ? 'blur(1px)' : 'none'
              }}
              onClick={() => handleBirdClick(bird.id)}
            >
              <div className="drop-shadow-2xl relative">
                {bird.emoji}
                {/* Glow effect for uncaught birds */}
                {!bird.caught && (
                  <div className="absolute inset-0 animate-ping opacity-20">
                    <div className="w-full h-full bg-healing/30 rounded-full blur-lg" />
                  </div>
                )}
              </div>
              
              {/* Enhanced caught effect */}
              {bird.caught && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-healing text-lg font-bold animate-bounce drop-shadow-lg">+1</div>
                  <div className="absolute inset-0 bg-healing/20 rounded-full animate-ping" />
                </div>
              )}
            </div>
          ))}

          {/* Enhanced game state overlay */}
          {phase === 'ready' && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl">
              <div className="text-center p-8">
                <div className="text-8xl mb-6 animate-bounce drop-shadow-lg">🌸</div>
                <h3 className="text-2xl font-bold mb-4 text-healing">Welcome to Your Sanctuary</h3>
                <p className="text-muted-foreground text-lg mb-6 max-w-md">
                  Tap the floating birds and butterflies to collect peaceful thoughts and create your inner sanctuary
                </p>
                <div className="flex justify-center space-x-4 text-4xl">
                  {BIRD_EMOJIS.map((emoji, i) => (
                    <div key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Victory overlay */}
          {phase === 'victory' && (
            <div className="absolute inset-0 flex items-center justify-center bg-healing/20 backdrop-blur-md rounded-3xl">
              <div className="text-center p-8">
                <div className="text-8xl mb-6 animate-bounce">🎉</div>
                <h3 className="text-3xl font-bold text-healing mb-4">Sanctuary Complete!</h3>
                <p className="text-muted-foreground text-lg">You've created a beautiful sanctuary of peace in your mind</p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-healing/20 to-calm/20 rounded-2xl p-6 text-center border border-healing/30 shadow-lg backdrop-blur-sm">
            <div className="text-4xl font-black text-healing mb-2">{caughtCount}</div>
            <div className="text-sm font-medium text-muted-foreground">Collected</div>
            <div className="text-xs text-healing/70 mt-1">Peaceful thoughts</div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 text-center border border-primary/30 shadow-lg backdrop-blur-sm">
            <div className="text-4xl font-black text-primary mb-2">{birds.filter(b => !b.caught).length}</div>
            <div className="text-sm font-medium text-muted-foreground">Active</div>
            <div className="text-xs text-primary/70 mt-1">Flying around</div>
          </div>
          <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl p-6 text-center border border-secondary/30 shadow-lg backdrop-blur-sm">
            <div className="text-4xl font-black text-secondary mb-2">
              {Math.round((caughtCount / TARGET_BIRDS) * 100)}%
            </div>
            <div className="text-sm font-medium text-muted-foreground">Complete</div>
            <div className="text-xs text-secondary/70 mt-1">Sanctuary progress</div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="flex justify-center gap-6">
          {phase === 'ready' && (
            <ZenButton 
              variant="hero" 
              size="xl" 
              onClick={startGame}
              className="px-12 py-4 text-xl shadow-2xl hover:shadow-healing/30 transform hover:scale-105 transition-all duration-300"
            >
              Begin Sanctuary 🌸
            </ZenButton>
          )}
          
          {(phase === 'victory' || phase === 'timeup') && (
            <ZenButton 
              variant="zen" 
              size="lg" 
              onClick={resetGame}
              className="px-8 py-3 shadow-xl hover:shadow-calm/30 transform hover:scale-105 transition-all duration-300"
            >
              Create New Sanctuary 🔄
            </ZenButton>
          )}
          
          {phase === 'playing' && (
            <ZenButton 
              variant="outline" 
              onClick={resetGame}
              className="px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Reset
            </ZenButton>
          )}
        </div>

        {/* Game completion messages */}
        {phase === 'victory' && (
          <div className="bg-gradient-to-r from-healing/20 to-calm/20 rounded-2xl p-8 text-center border border-healing/30 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold text-healing mb-2">Sanctuary Complete!</h3>
            <p className="text-muted-foreground">You've successfully gathered peaceful thoughts and created inner harmony!</p>
          </div>
        )}

        {phase === 'timeup' && (
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 text-center border border-primary/30 shadow-2xl backdrop-blur-sm animate-fade-in-up">
            <div className="text-6xl mb-4">⏰</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Time's Up!</h3>
            <p className="text-muted-foreground">Every bird you caught brought you closer to inner peace. Well done!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};