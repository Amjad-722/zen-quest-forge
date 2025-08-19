import React, { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { AdventureMap } from '@/components/adventure-map';
import { BreathingBattle } from '@/components/breathing-battle';
import { BirdSanctuary } from '@/components/bird-sanctuary';
import { MoodCheckin } from '@/components/mood-checkin';
import { ZenButton } from '@/components/ui/zen-button';
import { Card, CardContent } from '@/components/ui/card';

type AppState = 'hero' | 'mood-checkin' | 'adventure-map' | 'breathing-battle' | 'bird-sanctuary';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [userMood, setUserMood] = useState<any>(null);

  const handleStartQuest = () => {
    setCurrentState('mood-checkin');
  };

  const handleMoodSelected = (mood: any) => {
    setUserMood(mood);
    // Slight delay to let the mood checkin animation finish
    setTimeout(() => {
      setCurrentState('adventure-map');
    }, 3500);
  };

  const handleQuestSelect = (quest: any) => {
    if (quest.type === 'breathing') {
      setCurrentState('breathing-battle');
    } else if (quest.type === 'sanctuary') {
      setCurrentState('bird-sanctuary');
    }
  };

  const handleBattleComplete = (success: boolean) => {
    // Return to adventure map after battle
    setTimeout(() => {
      setCurrentState('adventure-map');
    }, 2000);
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'hero':
        return <HeroSection onStartQuest={handleStartQuest} />;
      
      case 'mood-checkin':
        return (
          <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
            <MoodCheckin onMoodSelected={handleMoodSelected} />
          </div>
        );
      
      case 'adventure-map':
        return <AdventureMap onSelectQuest={handleQuestSelect} />;
      
      case 'breathing-battle':
        return (
          <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-6">
            <BreathingBattle onComplete={handleBattleComplete} />
          </div>
        );
      
      case 'bird-sanctuary':
        return (
          <div className="min-h-screen bg-gradient-healing flex items-center justify-center p-6">
            <BirdSanctuary onComplete={handleBattleComplete} />
          </div>
        );
      
      default:
        return <HeroSection onStartQuest={handleStartQuest} />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation Header (only show after hero) */}
      {currentState !== 'hero' && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
              onClick={() => setCurrentState('hero')}
            >
              ZenQuest
            </h1>
            
            <div className="flex gap-2">
              <ZenButton
                variant={currentState === 'adventure-map' ? 'zen' : 'ghost'}
                size="sm"
                onClick={() => setCurrentState('adventure-map')}
              >
                🗺️ Map
              </ZenButton>
              
              <ZenButton
                variant="ghost"
                size="sm"
                onClick={() => setCurrentState('mood-checkin')}
              >
                😊 Mood
              </ZenButton>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={currentState !== 'hero' ? 'pt-20' : ''}>
        {renderCurrentState()}
      </main>

      {/* Floating Help Button */}
      {currentState !== 'hero' && (
        <div className="fixed bottom-6 right-6 z-40">
          <ZenButton
            variant="mystical"
            size="floating"
            className="text-xl shadow-mystical animate-float"
            title="Need help or guidance?"
          >
            💫
          </ZenButton>
        </div>
      )}

      {/* Global Footer with User Stats (when not on hero) */}
      {currentState !== 'hero' && userMood && (
        <footer className="fixed bottom-6 left-6 z-40">
          <Card className="bg-card/80 backdrop-blur-sm shadow-soft">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="text-2xl">{userMood.emoji}</div>
              <div className="text-sm">
                <div className="font-medium">Current Mood</div>
                <div className="text-muted-foreground">{userMood.label}</div>
              </div>
            </CardContent>
          </Card>
        </footer>
      )}
    </div>
  );
};

export default Index;
