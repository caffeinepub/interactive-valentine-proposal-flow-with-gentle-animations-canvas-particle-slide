interface CharacterStageProps {
  noClickCount: number;
  showCelebration: boolean;
}

export function CharacterStage({ noClickCount, showCelebration }: CharacterStageProps) {
  // First No click - guy begging
  if (noClickCount === 1) {
    return (
      <div className="character-stage">
        <img
          src="/assets/generated/valentine-guy-begging.dim_512x512.png"
          alt="Please?"
          className="character-image character-begging"
        />
      </div>
    );
  }

  // Second No click - guy sad and walking off
  if (noClickCount === 2) {
    return (
      <div className="character-stage">
        <img
          src="/assets/generated/valentine-guy-sad.dim_512x512.png"
          alt="Sad"
          className="character-image character-walking-off"
        />
      </div>
    );
  }

  // Third No click or celebration - cat pleading/happy
  if (noClickCount >= 3) {
    return (
      <div className="character-stage">
        <img
          src="/assets/generated/valentine-cat-pleading.dim_512x512.png"
          alt="Please say yes"
          className={`character-image ${
            showCelebration ? 'character-happy-cry' : 'character-pleading'
          }`}
        />
      </div>
    );
  }

  return null;
}
