import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZenButton } from '@/components/ui/zen-button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface QuestNode {
  id: string;
  title: string;
  description: string;
  type: 'breathing' | 'meditation' | 'mindfulness' | 'reflection' | 'sanctuary';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  unlocked: boolean;
  position: { x: number; y: number };
  reward?: string;
}

interface AdventureMapProps {
  onSelectQuest?: (quest: QuestNode) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({ onSelectQuest }) => {
  const [selectedQuest, setSelectedQuest] = useState<QuestNode | null>(null);
  
  // Mock quest data - in real app this would come from Supabase
  const [quests, setQuests] = useState<QuestNode[]>([
    {
      id: '1',
      title: 'Morning Calm',
      description: 'Start your day with 3 deep breaths to center yourself.',
      type: 'breathing',
      difficulty: 'easy',
      completed: false,
      unlocked: true,
      position: { x: 20, y: 80 },
      reward: '🌅 Morning Warrior Badge'
    },
    {
      id: '2',
      title: 'Stress Monster Battle',
      description: 'Face your first stress monster using breathing techniques.',
      type: 'breathing',
      difficulty: 'medium',
      completed: false,
      unlocked: true,
      position: { x: 50, y: 60 },
      reward: '⚔️ Monster Slayer Badge'
    },
    {
      id: '3',
      title: 'Peaceful Forest Walk',
      description: 'A guided mindfulness journey through nature.',
      type: 'mindfulness',
      difficulty: 'easy',
      completed: false,
      unlocked: false,
      position: { x: 80, y: 40 },
      reward: '🌲 Forest Guardian Badge'
    },
    {
      id: '4',
      title: 'Inner Reflection',
      description: 'Take time to reflect on your emotional state.',
      type: 'reflection',
      difficulty: 'medium',
      completed: false,
      unlocked: false,
      position: { x: 30, y: 20 },
      reward: '🪞 Self-Awareness Badge'
    },
    {
      id: '5',
      title: 'Bird Sanctuary',
      description: 'Gather peaceful thoughts by catching floating birds and butterflies.',
      type: 'sanctuary',
      difficulty: 'easy',
      completed: false,
      unlocked: true,
      position: { x: 70, y: 70 },
      reward: '🐦 Peace Keeper Badge'
    }
  ]);

  const completedQuests = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const progress = (completedQuests / totalQuests) * 100;

  const getQuestIcon = (type: QuestNode['type']) => {
    switch (type) {
      case 'breathing': return '🫁';
      case 'meditation': return '🧘‍♀️';
      case 'mindfulness': return '🌸';
      case 'reflection': return '🪞';
      case 'sanctuary': return '🐦';
      default: return '✨';
    }
  };

  const getDifficultyColor = (difficulty: QuestNode['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-healing text-healing-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'hard': return 'bg-stress text-stress-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleQuestClick = (quest: QuestNode) => {
    if (!quest.unlocked) return;
    setSelectedQuest(quest);
    onSelectQuest?.(quest);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mystical/20 via-calm/10 to-healing/15 p-6">
      {/* Enhanced Header */}
      <div className="text-center mb-12 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
        
        <h1 className="text-6xl font-black mb-6 mt-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
          Adventure Map
        </h1>
        <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Choose your path to inner peace and resilience. Each quest brings you closer to mastering your mental wellness.
        </p>
        
        {/* Enhanced Progress Card */}
        <Card className="max-w-lg mx-auto bg-gradient-to-br from-white via-primary/5 to-secondary/10 border-0 shadow-2xl backdrop-blur-sm">
          <CardContent className="pt-8 pb-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-primary">Journey Progress</span>
                <span className="text-secondary">{completedQuests}/{totalQuests} Quests</span>
              </div>
              <Progress value={progress} className="h-4 bg-muted/30 shadow-inner" />
              <div className="text-sm text-muted-foreground text-center">
                {progress === 0 ? "🌱 Begin your journey" : 
                 progress < 50 ? "🌿 Making progress" : 
                 progress < 100 ? "🌸 Almost there!" : "✨ Journey complete!"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Map Container */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Enhanced Map Background */}
        <div className="relative h-[700px] bg-gradient-to-br from-mystical/40 via-healing/20 to-calm/30 rounded-3xl shadow-2xl overflow-hidden border-2 border-primary/20">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
          </div>

          {/* Enhanced Quest Nodes */}
          {quests.map((quest, index) => (
            <div
              key={quest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${quest.position.x}%`,
                top: `${quest.position.y}%`
              }}
              onClick={() => handleQuestClick(quest)}
            >
              {/* Enhanced Connection Lines */}
              {index > 0 && (
                <div className="absolute w-24 h-1 bg-gradient-to-r from-primary/40 to-secondary/40 -top-0.5 -left-12 -z-10 rounded-full shadow-sm" />
              )}

              {/* Enhanced Quest Node */}
              <div
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center text-3xl relative
                  transition-all duration-500 border-2
                  ${quest.unlocked 
                    ? 'bg-gradient-to-br from-primary/90 to-secondary/90 hover:scale-125 animate-glow-pulse shadow-2xl border-white/30 hover:shadow-primary/50' 
                    : 'bg-gradient-to-br from-muted/60 to-muted/40 grayscale opacity-60 border-muted/30'
                  }
                  ${quest.completed ? 'ring-4 ring-healing shadow-healing border-healing/50' : ''}
                `}
              >
                {/* Inner glow effect */}
                {quest.unlocked && (
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                )}
                
                <span className="relative z-10 drop-shadow-lg">
                  {quest.completed ? '✅' : getQuestIcon(quest.type)}
                </span>

                {/* Completion indicator */}
                {quest.completed && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-healing rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}

                {/* Difficulty indicator */}
                {quest.unlocked && !quest.completed && (
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty === 'easy' ? '1' : quest.difficulty === 'medium' ? '2' : '3'}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Quest Tooltip */}
              {quest.unlocked && (
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                  <Card className="w-80 bg-gradient-to-br from-white/95 to-primary/5 backdrop-blur-md shadow-2xl border-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-3">
                        <span className="text-2xl">{getQuestIcon(quest.type)}</span>
                        <div>
                          <div className="font-bold text-primary">{quest.title}</div>
                          <Badge className={`${getDifficultyColor(quest.difficulty)} mt-1`}>
                            {quest.difficulty}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {quest.description}
                      </p>
                      {quest.reward && (
                        <div className="bg-gradient-to-r from-healing/10 to-primary/10 rounded-lg p-3 border border-healing/20">
                          <p className="text-sm text-healing font-semibold">
                            🏆 Reward: {quest.reward}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}

          {/* Enhanced Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-accent-glow/40 to-primary-glow/30 animate-float shadow-sm"
              style={{
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: `0 0 ${Math.random() * 15 + 5}px hsl(var(--accent-glow) / 0.3)`
              }}
            />
          ))}

          {/* Mystical aura effects */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-healing/20 to-transparent rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Enhanced Legend */}
        <div className="mt-8 flex justify-center">
          <Card className="bg-gradient-to-br from-white/90 to-primary/5 backdrop-blur-md shadow-2xl border-0">
            <CardContent className="pt-8 pb-6">
              <h3 className="text-lg font-bold text-center mb-6 text-primary">Quest Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg" />
                  <span className="font-medium">Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-healing ring-2 ring-healing shadow-lg" />
                  <span className="font-medium">Completed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted/60 opacity-60 shadow-sm" />
                  <span className="font-medium">Locked</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl drop-shadow-sm">✨</span>
                  <span className="font-medium">Special Quest</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quest Selection Message */}
        {selectedQuest && (
          <div className="mt-8 flex justify-center animate-fade-in-up">
            <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md shadow-2xl border-0 max-w-md">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">{getQuestIcon(selectedQuest.type)}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{selectedQuest.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedQuest.description}</p>
                <div className="text-sm text-secondary font-medium">
                  Click to begin this quest!
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};