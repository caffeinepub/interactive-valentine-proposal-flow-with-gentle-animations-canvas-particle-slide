import { fitImageToCanvas } from './fit';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  vx: number;
  vy: number;
}

type AnimationState = 'scattering' | 'forming' | 'holding' | 'breaking';

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private images: HTMLImageElement[];
  private particles: Particle[] = [];
  private currentImageIndex = 0;
  private animationState: AnimationState = 'scattering';
  private stateTimer = 0;
  private rafId: number | null = null;
  private lastTime = 0;
  private onFinalCallback?: () => void;
  private particleCount = 0;

  constructor(canvas: HTMLCanvasElement, images: HTMLImageElement[]) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;
    this.images = images;
    
    this.setupCanvas();
    this.determineParticleCount();
    this.initializeParticles();
    
    window.addEventListener('resize', this.handleResize);
  }

  private setupCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  private determineParticleCount() {
    const area = window.innerWidth * window.innerHeight;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      this.particleCount = Math.min(3000, Math.floor(area / 200));
    } else {
      this.particleCount = Math.min(8000, Math.floor(area / 100));
    }
  }

  private initializeParticles() {
    this.particles = [];
    const rect = this.canvas.getBoundingClientRect();
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        targetX: 0,
        targetY: 0,
        color: '#000000',
        vx: 0,
        vy: 0,
      });
    }
  }

  private sampleImagePixels(image: HTMLImageElement): Array<{ x: number; y: number; color: string }> {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return [];

    const rect = this.canvas.getBoundingClientRect();
    const fitted = fitImageToCanvas(image.width, image.height, rect.width, rect.height);
    
    tempCanvas.width = fitted.width;
    tempCanvas.height = fitted.height;
    tempCtx.drawImage(image, 0, 0, fitted.width, fitted.height);
    
    const imageData = tempCtx.getImageData(0, 0, fitted.width, fitted.height);
    const pixels: Array<{ x: number; y: number; color: string }> = [];
    
    const step = Math.max(1, Math.floor(Math.sqrt((fitted.width * fitted.height) / this.particleCount)));
    
    for (let y = 0; y < fitted.height; y += step) {
      for (let x = 0; x < fitted.width; x += step) {
        const i = (y * fitted.width + x) * 4;
        const alpha = imageData.data[i + 3];
        
        if (alpha > 50) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          
          pixels.push({
            x: fitted.offsetX + x,
            y: fitted.offsetY + y,
            color: `rgb(${r},${g},${b})`,
          });
        }
      }
    }
    
    return pixels;
  }

  private updateParticleTargets(isFinal: boolean = false) {
    const image = this.images[this.currentImageIndex];
    const sampledPixels = this.sampleImagePixels(image);
    
    // Shuffle and assign targets
    const shuffled = [...sampledPixels].sort(() => Math.random() - 0.5);
    
    this.particles.forEach((particle, i) => {
      const target = shuffled[i % shuffled.length];
      particle.targetX = target.x;
      particle.targetY = target.y;
      
      if (isFinal) {
        // Multi-color for final image
        const hue = (i / this.particles.length) * 60 + 300; // Pink to red range
        particle.color = `hsl(${hue}, 70%, 65%)`;
      } else {
        particle.color = target.color;
      }
    });
  }

  private updateParticles(deltaTime: number) {
    const speed = this.animationState === 'forming' ? 0.08 : 0.05;
    
    this.particles.forEach(particle => {
      const dx = particle.targetX - particle.x;
      const dy = particle.targetY - particle.y;
      
      particle.vx = dx * speed;
      particle.vy = dy * speed;
      
      particle.x += particle.vx;
      particle.y += particle.vy;
    });
  }

  private drawParticles() {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    
    const radius = window.innerWidth < 768 ? 1.5 : 2;
    
    this.particles.forEach(particle => {
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  private animate = (currentTime: number) => {
    if (!this.lastTime) this.lastTime = currentTime;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    this.stateTimer += deltaTime;
    
    // State machine
    switch (this.animationState) {
      case 'scattering':
        if (this.stateTimer > 500) {
          this.animationState = 'forming';
          this.stateTimer = 0;
          const isFinal = this.currentImageIndex === this.images.length - 1;
          this.updateParticleTargets(isFinal);
        }
        break;
        
      case 'forming':
        if (this.stateTimer > 3000) {
          this.animationState = 'holding';
          this.stateTimer = 0;
        }
        break;
        
      case 'holding':
        if (this.stateTimer > 3000) {
          if (this.currentImageIndex === this.images.length - 1) {
            // Final image - stay forever
            if (this.onFinalCallback) {
              this.onFinalCallback();
              this.onFinalCallback = undefined;
            }
            // Keep animating but stay in holding
          } else {
            this.animationState = 'breaking';
            this.stateTimer = 0;
            this.scatterParticles();
          }
        }
        break;
        
      case 'breaking':
        if (this.stateTimer > 3000) {
          this.currentImageIndex++;
          this.animationState = 'scattering';
          this.stateTimer = 0;
        }
        break;
    }
    
    this.updateParticles(deltaTime);
    this.drawParticles();
    
    this.rafId = requestAnimationFrame(this.animate);
  };

  private scatterParticles() {
    const rect = this.canvas.getBoundingClientRect();
    this.particles.forEach(particle => {
      particle.targetX = Math.random() * rect.width;
      particle.targetY = Math.random() * rect.height;
    });
  }

  private handleResize = () => {
    this.setupCanvas();
    if (this.animationState === 'forming' || this.animationState === 'holding') {
      const isFinal = this.currentImageIndex === this.images.length - 1;
      this.updateParticleTargets(isFinal);
    }
  };

  public start(onFinalCallback?: () => void) {
    this.onFinalCallback = onFinalCallback;
    this.lastTime = 0;
    this.rafId = requestAnimationFrame(this.animate);
  }

  public stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('resize', this.handleResize);
  }
}
