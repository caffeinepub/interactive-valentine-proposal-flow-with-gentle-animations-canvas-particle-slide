import { useEffect, useState } from 'react';

export function CelebrationOverlay() {
  const [items, setItems] = useState<Array<{ id: number; emoji: string; left: number; delay: number }>>([]);

  useEffect(() => {
    const emojis = ['🌹', '🌸', '❤️', '💖', '💕', '💗', '🌺', '🌷'];
    const newItems = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setItems(newItems);

    // Add sparkles
    const sparkleInterval = setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      document.querySelector('.celebration-overlay')?.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 2000);
    }, 100);

    return () => clearInterval(sparkleInterval);
  }, []);

  return (
    <div className="celebration-overlay">
      {items.map(item => (
        <div
          key={item.id}
          className="falling-item"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
