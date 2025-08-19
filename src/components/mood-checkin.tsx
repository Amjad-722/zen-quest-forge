import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZenButton } from '@/components/ui/zen-button';
import { useToast } from '@/hooks/use-toast';

interface MoodOption {
  emoji: string;
  label: string;
  value: number;
  description: string;
}

interface MoodCheckinProps {
  onMoodSelected?: (mood: MoodOption) => void;
}

export const MoodCheckin: React.FC<MoodCheckinProps> = ({ onMoodSelected }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const moodOptions: MoodOption[] = [
    {
      emoji: '😊',
      label: 'Great',
      value: 5,
      description: 'Feeling wonderful and energized!'
    },
    {
      emoji: '🙂',
      label: 'Good',
      value: 4,
      description: 'In a positive mood today'
    },
    {
      emoji: '😐',
      label: 'Okay',
      value: 3,
      description: 'Feeling neutral, just getting by'
    },
    {
      emoji: '😔',
      label: 'Low',
      value: 2,
      description: 'Feeling a bit down or stressed'
    },
    {
      emoji: '😭',
      label: 'Struggling',
      value: 1,
      description: 'Having a really tough time'
    }
  ];

  const handleMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    setIsSubmitted(true);
    onMoodSelected?.(selectedMood);
    
    // Show appropriate response based on mood
    const responses = {
      5: { title: "That's wonderful! 🌟", description: "Your positive energy is beautiful. Keep shining!" },
      4: { title: "Great to hear! 😊", description: "You're doing well. Let's keep that momentum going!" },
      3: { title: "Thank you for sharing 🤗", description: "Every day is different. Let's find some calm together." },
      2: { title: "I'm here for you 💙", description: "It's okay to feel this way. Let's work through it together." },
      1: { title: "You're incredibly brave 🫂", description: "Reaching out takes strength. You're not alone in this." }
    };

    const response = responses[selectedMood.value as keyof typeof responses];
    toast({
      title: response.title,
      description: response.description,
    });

    // Reset after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedMood(null);
    }, 3000);
  };

  if (isSubmitted && selectedMood) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-healing border-healing/30 shadow-healing">
        <CardContent className="pt-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">{selectedMood.emoji}</div>
          <h3 className="text-xl font-semibold mb-2">Thank you for sharing</h3>
          <p className="text-muted-foreground mb-6">
            Your feelings are valid and important. Let's create a quest that fits your mood.
          </p>
          
          {selectedMood.value <= 2 && (
            <div className="bg-calm/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-calm-foreground">
                🌱 Remember: Healing takes time, and every small step counts. You're stronger than you know.
              </p>
            </div>
          )}
          
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-healing/30 to-primary/30 animate-breathe shadow-healing" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-calm border-primary/20 shadow-soft">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          How are you feeling?
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Your emotional state helps us personalize your journey
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mood Options */}
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((mood) => (
            <ZenButton
              key={mood.value}
              variant={selectedMood?.value === mood.value ? "zen" : "outline"}
              size="floating"
              onClick={() => handleMoodSelect(mood)}
              className={`
                h-16 w-16 text-2xl flex-col gap-1 transition-all duration-300
                ${selectedMood?.value === mood.value 
                  ? 'ring-2 ring-primary shadow-glow scale-110' 
                  : 'hover:scale-105'
                }
              `}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </ZenButton>
          ))}
        </div>

        {/* Selected Mood Description */}
        {selectedMood && (
          <div className="text-center animate-fade-in-up">
            <p className="text-sm text-muted-foreground mb-4">
              {selectedMood.description}
            </p>
            
            <ZenButton 
              variant="hero" 
              size="lg" 
              onClick={handleSubmit}
              className="w-full"
            >
              Continue Your Journey ✨
            </ZenButton>
          </div>
        )}

        {!selectedMood && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Select how you're feeling to continue
            </p>
          </div>
        )}

        {/* Mood Tracking Reminder */}
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-xs text-muted-foreground">
            Daily mood tracking helps you understand patterns and progress over time
          </p>
        </div>
      </CardContent>
    </Card>
  );
};