import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  color: number;
}

export const WarpSpeed: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const warpSpeedRef = useRef(0);
  const requestRef = useRef<number>();
  const xModRef = useRef(0);
  const yModRef = useRef(0);
  const opacityRef = useRef(0);
  const fadeOutRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = (): Star => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: 0
    });

    const initStars = () => {
      starsRef.current = Array.from({ length: 200 }, () => createStar());
    };

    const updateStar = (star: Star) => {
      const speedMult = warpSpeedRef.current ? 0.028 : 0.02;
      star.x += xModRef.current + (star.x - (window.innerWidth / 2)) * speedMult;
      star.y += yModRef.current + (star.y - (window.innerHeight / 2)) * speedMult;
      
      if (star.color < 255) {
        star.color += 5;
      }

      if (star.x > window.innerWidth || star.x < 0) {
        star.x = Math.random() * window.innerWidth;
        star.color = 0;
      }
      if (star.y > window.innerHeight || star.y < 0) {
        star.y = Math.random() * window.innerHeight;
        star.color = 0;
      }
    };

    const draw = () => {
      if (!ctx) return;

      // Fade in
      if (!fadeOutRef.current && opacityRef.current < 1) {
        opacityRef.current = Math.min(opacityRef.current + 0.02, 1);
      }
      
      // Fade out
      if (fadeOutRef.current && opacityRef.current > 0) {
        opacityRef.current = Math.max(opacityRef.current - 0.02, 0);
      }

      // Clear with fading background
      ctx.fillStyle = `rgba(0, 0, 0, ${warpSpeedRef.current ? 0.2 : 0.1})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw stars with current opacity
      starsRef.current.forEach(star => {
        ctx.fillStyle = `rgba(${star.color}, ${star.color}, ${star.color}, ${opacityRef.current})`;
        ctx.fillRect(star.x, star.y, star.color / 128, star.color / 128);
        updateStar(star);
      });

      // Continue animation if not completely faded out
      if (opacityRef.current > 0 || !fadeOutRef.current) {
        requestRef.current = requestAnimationFrame(draw);
      } else {
        // Dispatch completion event when fully faded out
        const event = new CustomEvent('warpSpeedComplete');
        window.dispatchEvent(event);
      }
    };

    // Start animation
    resizeCanvas();
    initStars();
    requestRef.current = requestAnimationFrame(draw);

    // Fade in and speed up sequence
    const speedUpTimer = setTimeout(() => {
      warpSpeedRef.current = 1;
    }, 2000);

    // Start fade out
    const fadeOutTimer = setTimeout(() => {
      fadeOutRef.current = true;
    }, 4000);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearTimeout(speedUpTimer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-black"
    />
  );
}