import React, { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { AdventureMap } from '@/components/adventure-map';
import { BreathingBattle } from '@/components/breathing-battle';
import { BirdSanctuary } from '@/components/bird-sanctuary';
import { MoodCheckin } from '@/components/mood-checkin';
import { Navbar } from '@/components/navbar';
import { ZenButton } from '@/components/ui/zen-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type AppState = 'home' | 'mood' | 'map' | 'breathing' | 'sanctuary';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [userMood, setUserMood] = useState<any>(null);

  const handleStartQuest = () => {
    setCurrentState('mood');
  };

  const handleMoodSelected = (mood: any) => {
    setUserMood(mood);
    // Slight delay to let the mood checkin animation finish
    setTimeout(() => {
      setCurrentState('map');
    }, 3500);
  };

  const handleQuestSelect = (quest: any) => {
    if (quest.type === 'breathing') {
      setCurrentState('breathing');
    } else if (quest.type === 'sanctuary') {
      setCurrentState('sanctuary');
    }
  };

  const handleBattleComplete = (success: boolean) => {
    // Return to adventure map after battle
    setTimeout(() => {
      setCurrentState('map');
    }, 2000);
  };

  const handleNavigation = (section: string) => {
    setCurrentState(section as AppState);
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'home':
        return <HeroSection onStartQuest={handleStartQuest} />;
      
      case 'mood':
        return (
          <div className="min-h-screen bg-gradient-mystical flex items-center justify-center p-6 pt-24">
            <MoodCheckin onMoodSelected={handleMoodSelected} />
          </div>
        );
      
      case 'map':
        return (
          <div className="pt-16">
            <AdventureMap onSelectQuest={handleQuestSelect} />
          </div>
        );
      
      case 'breathing':
        return (
          <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6 pt-24">
            <BreathingBattle onComplete={handleBattleComplete} />
          </div>
        );
      
      case 'sanctuary':
        return (
          <div className="min-h-screen bg-gradient-healing flex items-center justify-center p-6 pt-24">
            <BirdSanctuary onComplete={handleBattleComplete} />
          </div>
        );
      
      default:
        return <HeroSection onStartQuest={handleStartQuest} />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Modern Navbar */}
      <Navbar currentSection={currentState} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className={currentState !== 'home' ? 'pt-16' : ''}>
        {renderCurrentState()}
      </main>

      {/* User Stats Floating Card */}
      {currentState !== 'home' && userMood && (
        <div className="fixed bottom-6 left-6 z-30">
          <Card className="bg-card/90 backdrop-blur-md shadow-glass border border-primary/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-3xl animate-float">{userMood.emoji}</div>
              <div>
                <div className="font-bold text-sm text-foreground">Current Mood</div>
                <div className="text-muted-foreground text-xs">{userMood.label}</div>
                <Badge className="mt-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 text-xs">
                  Tracking Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 animate-float blur-xl"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
