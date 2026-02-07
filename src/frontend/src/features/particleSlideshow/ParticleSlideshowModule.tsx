import { useEffect, useRef, useState } from 'react';
import { preloadImages } from './preload';
import { ParticleEngine } from './engine';
import './particleSlideshow.css';

export function ParticleSlideshowModule() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    const initSlideshow = async () => {
      try {
        // Get image from the uploaded asset
        const imageUrls = ['/assets/uploads/image-5-the-last.jpg'];
        
        // Preload images
        const images = await preloadImages(imageUrls);
        
        if (!canvasRef.current) return;
        
        setIsLoading(false);
        
        // Initialize particle engine
        const engine = new ParticleEngine(canvasRef.current, images);
        engineRef.current = engine;
        
        // Start the slideshow
        engine.start(() => {
          // Callback when final image is stable
          setTimeout(() => {
            setShowFinalText(true);
          }, 1000);
        });
        
      } catch (error) {
        console.error('Failed to load images:', error);
        setIsLoading(false);
      }
    };

    initSlideshow();

    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, []);

  return (
    <section id="particleSlideshowSection">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {isLoading && (
        <div className="loading-indicator">
          <div className="loading-spinner" />
          <p>Loading your special moment...</p>
        </div>
      )}
      
      {showFinalText && (
        <div className="final-text">
          i love you deep down bottom of my heart from surya
        </div>
      )}
    </section>
  );
}
