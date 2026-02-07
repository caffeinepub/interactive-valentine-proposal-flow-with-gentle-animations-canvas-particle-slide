import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CharacterStage } from '../components/CharacterStage';
import { CelebrationOverlay } from '../components/CelebrationOverlay';

interface ProposalScreenProps {
  onYesClick: () => void;
}

export function ProposalScreen({ onYesClick }: ProposalScreenProps) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isYesButtonPushed, setIsYesButtonPushed] = useState(false);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
    if (noClickCount === 2) {
      // Third click - push Yes button
      setIsYesButtonPushed(true);
    }
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    setTimeout(() => {
      onYesClick();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Floating hearts background */}
      <div className="floating-hearts-bg">
        <div className="floating-heart">💕</div>
        <div className="floating-heart">💖</div>
        <div className="floating-heart">💗</div>
        <div className="floating-heart">💝</div>
        <div className="floating-heart">💞</div>
      </div>

      {/* Main proposal card */}
      <Card className="proposal-card w-full max-w-md relative z-10 bg-card/95 backdrop-blur-sm border-2 border-primary/20">
        <CardContent className="pt-8 pb-8 px-6 space-y-8">
          {/* Main question */}
          <div className="text-center space-y-4 animate-fade-in-down">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary animate-heartbeat">
              Will you be my Valentine? 💌
            </h1>
          </div>

          {/* Character stage */}
          {noClickCount > 0 && (
            <CharacterStage 
              noClickCount={noClickCount} 
              showCelebration={showCelebration}
            />
          )}

          {/* Buttons */}
          <div className="flex gap-4 justify-center items-center">
            <Button
              onClick={handleYesClick}
              size="lg"
              className={`text-xl px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-md hover:shadow-glow-lg transition-all duration-500 ${
                isYesButtonPushed ? 'yes-button-pushed' : ''
              }`}
            >
              Yes 💖
            </Button>
            
            {noClickCount < 3 && (
              <Button
                onClick={handleNoClick}
                size="lg"
                variant="outline"
                className="text-xl px-8 py-6 border-2 border-muted-foreground/30 hover:border-muted-foreground/50 transition-all duration-500"
              >
                No 😶
              </Button>
            )}
          </div>

          {/* Gentle hint after cat appears */}
          {noClickCount === 3 && !showCelebration && (
            <p className="text-center text-sm text-muted-foreground animate-fade-in-up italic">
              Please... just one chance? 🥺
            </p>
          )}
        </CardContent>
      </Card>

      {/* Celebration overlay */}
      {showCelebration && <CelebrationOverlay />}
    </div>
  );
}
