import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ZenButton } from "@/components/ui/zen-button";
import { useToast } from "@/hooks/use-toast";

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
      emoji: "😊",
      label: "Great",
      value: 5,
      description: "Feeling wonderful and energized!",
    },
    {
      emoji: "🙂",
      label: "Good",
      value: 4,
      description: "In a positive mood today",
    },
    {
      emoji: "😐",
      label: "Okay",
      value: 3,
      description: "Feeling neutral, just getting by",
    },
    {
      emoji: "😔",
      label: "Low",
      value: 2,
      description: "Feeling a bit down or stressed",
    },
    {
      emoji: "😭",
      label: "Struggling",
      value: 1,
      description: "Having a really tough time",
    },
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
      5: {
        title: "That's wonderful! 🌟",
        description: "Your positive energy is beautiful. Keep shining!",
      },
      4: {
        title: "Great to hear! 😊",
        description: "You're doing well. Let's keep that momentum going!",
      },
      3: {
        title: "Thank you for sharing 🤗",
        description: "Every day is different. Let's find some calm together.",
      },
      2: {
        title: "I'm here for you 💙",
        description:
          "It's okay to feel this way. Let's work through it together.",
      },
      1: {
        title: "You're incredibly brave 🫂",
        description: "Reaching out takes strength. You're not alone in this.",
      },
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
      <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-healing/20 via-white to-primary/10 border-0 shadow-2xl backdrop-blur-sm">
        <CardContent className="pt-12 pb-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-healing/5 to-primary/5 rounded-3xl" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-healing/20 to-primary/20 rounded-full blur-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-lg" />

          <div className="relative z-10">
            <div className="text-8xl mb-6 animate-bounce drop-shadow-lg">
              {selectedMood.emoji}
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-healing to-primary bg-clip-text text-transparent">
              Thank you for sharing
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Your feelings are valid and important. Let's create a quest that
              fits your mood.
            </p>

            {selectedMood.value <= 2 && (
              <div className="bg-gradient-to-r from-calm/20 to-healing/20 rounded-2xl p-6 mb-6 border border-calm/30 shadow-lg backdrop-blur-sm">
                <p className="text-calm-foreground font-medium">
                  🌱 Remember: Healing takes time, and every small step counts.
                  You're stronger than you know.
                </p>
              </div>
            )}

            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-healing/40 to-primary/40 animate-deep-breathe shadow-2xl backdrop-blur-sm border border-white/30" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-white via-primary/5 to-secondary/10 border-0 shadow-2xl backdrop-blur-sm">
      <CardHeader className="text-center pb-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />

        <CardTitle className="text-3xl font-black mt-6 mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          How are you feeling?
        </CardTitle>
        <p className="text-muted-foreground text-lg">
          Your emotional state helps us personalize your journey
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pb-8">
        {/* Mood Options with Enhanced Design */}
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((mood) => (
            <div key={mood.value} className="relative group">
              <ZenButton
                variant={selectedMood?.value === mood.value ? "zen" : "outline"}
                size="floating"
                onClick={() => handleMoodSelect(mood)}
                className={`
                  h-20 w-20 text-3xl flex-col gap-2 transition-all duration-500 relative overflow-hidden
                  ${
                    selectedMood?.value === mood.value
                      ? "ring-4 ring-primary/50 shadow-2xl scale-110 bg-gradient-to-br from-primary/20 to-secondary/20"
                      : "hover:scale-110 hover:shadow-xl bg-gradient-to-br from-white to-muted/50 border-2 border-muted/30"
                  }
                `}
              >
                {/* Background glow effect */}
                {selectedMood?.value === mood.value && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 animate-glow-pulse rounded-full" />
                )}

                <span className="text-3xl relative z-10 drop-shadow-sm">
                  {mood.emoji}
                </span>
                <span className="text-xs font-bold relative z-10">
                  {mood.label}
                </span>
              </ZenButton>

              {/* Hover tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm shadow-lg">
                  {mood.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Mood Description */}
        {selectedMood && (
          <div className="text-center animate-fade-in-up bg-gradient-to-r from-muted/20 to-primary/10 rounded-2xl p-6 border border-primary/20 shadow-lg">
            <p className="text-muted-foreground mb-6 text-lg font-medium">
              {selectedMood.description}
            </p>

            <ZenButton
              variant="hero"
              size="lg"
              onClick={handleSubmit}
              className="w-full py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Continue Your Journey ✨
            </ZenButton>
          </div>
        )}

        {!selectedMood && (
          <div className="text-center bg-muted/20 rounded-2xl p-6 border border-muted/30">
            <p className="text-muted-foreground font-medium">
              Select how you're feeling to continue
            </p>
          </div>
        )}

        {/* Enhanced Mood Tracking Reminder */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 text-center border border-accent/20 shadow-lg backdrop-blur-sm">
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Daily mood tracking helps you understand patterns and progress over
            time
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
