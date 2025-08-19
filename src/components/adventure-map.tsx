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
    <div className="min-h-screen bg-gradient-calm p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Adventure Map
        </h1>
        <p className="text-muted-foreground mb-6">
          Choose your path to inner peace and resilience
        </p>
        
        {/* Progress */}
        <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Journey Progress</span>
                <span>{completedQuests}/{totalQuests} Quests</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Map Background */}
        <div className="relative h-[600px] bg-gradient-mystical rounded-3xl shadow-mystical overflow-hidden">
          {/* Mystical Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          </div>

          {/* Quest Nodes */}
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${quest.position.x}%`,
                top: `${quest.position.y}%`
              }}
              onClick={() => handleQuestClick(quest)}
            >
              {/* Connection Lines (simplified) */}
              {quest.id !== '1' && (
                <div className="absolute w-20 h-0.5 bg-primary/30 -top-0.5 -left-10 -z-10" />
              )}

              {/* Quest Node */}
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-2xl
                  transition-all duration-300 shadow-soft hover:shadow-glow
                  ${quest.unlocked 
                    ? 'bg-gradient-to-br from-primary/80 to-secondary/80 hover:scale-110 animate-glow-pulse' 
                    : 'bg-muted/50 grayscale opacity-50'
                  }
                  ${quest.completed ? 'ring-4 ring-healing shadow-healing' : ''}
                `}
              >
                {quest.completed ? '✅' : getQuestIcon(quest.type)}
              </div>

              {/* Quest Tooltip */}
              {quest.unlocked && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Card className="w-64 bg-card/95 backdrop-blur-sm shadow-mystical">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        {quest.title}
                        <Badge className={getDifficultyColor(quest.difficulty)}>
                          {quest.difficulty}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-2">
                        {quest.description}
                      </p>
                      {quest.reward && (
                        <p className="text-xs text-primary font-medium">
                          Reward: {quest.reward}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}

          {/* Floating Elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent-glow/30 animate-float"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-healing ring-2 ring-healing" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-muted/50 opacity-50" />
                  <span>Locked</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span>Special Quest</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};