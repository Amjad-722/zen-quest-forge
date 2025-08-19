import React, { useState } from 'react';
import { ZenButton } from '@/components/ui/zen-button';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  currentSection?: string;
  onNavigate?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'mood', label: 'Mood Check', icon: '💭' },
    { id: 'breathing', label: 'Breathing', icon: '🫁' },
    { id: 'sanctuary', label: 'Sanctuary', icon: '🐦' },
    { id: 'map', label: 'Adventure', icon: '🗺️' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-glass backdrop-blur-2xl border-b border-primary/10 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <span className="text-xl font-bold text-white">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ZenQuest
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Mental Wellness</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all border border-primary/30 text-white  duration-300 flex items-center space-x-2
                  ${currentSection === item.id
                    ? 'bg-primary/40 text-primary shadow-glow border border-primary/10'
                    : 'bg-primary/20 text-primary shadow-glow border border-primary/70'
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Progress Badge */}
            <Badge className="bg-gradient-to-r from-healing/20 to-accent/20 text-healing border-healing/30">
              Level 3 🌟
            </Badge>

            {/* Profile */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-healing flex items-center justify-center shadow-neon cursor-pointer hover:scale-110 transition-transform">
              <span className="text-sm">👤</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <div className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-full h-0.5 bg-foreground transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 animate-fade-in-up bg-gradient-glass backdrop-blur-xl">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate?.(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 flex items-center space-x-3
                    ${currentSection === item.id
                      ? 'bg-primary/20 text-primary shadow-glow border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-primary/20 flex items-center justify-between">
                <Badge className="bg-gradient-to-r from-healing/20 to-accent/20 text-healing border-healing/30">
                  Level 3 🌟
                </Badge>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-healing flex items-center justify-center shadow-neon">
                  <span className="text-sm">👤</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Quick Breathing */}
      <div className="fixed bottom-6 right-6 z-40">
        <ZenButton
          variant="hero"
          size="floating"
          className="w-14 h-14 rounded-full shadow-2xl hover:shadow-primary/50 animate-glow-pulse"
          onClick={() => onNavigate?.('breathing')}
        >
          <span className="text-2xl">🫁</span>
        </ZenButton>
      </div>
    </nav>
  );
};