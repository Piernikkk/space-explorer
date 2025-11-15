"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 2000);
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;

      time += 1;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000011");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;

      starsRef.current.forEach((star, index) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const mouseOffsetX = (mouseX - centerX) * 0.02 * star.speed;
        const mouseOffsetY = (mouseY - centerY) * 0.02 * star.speed;

        const starX = star.x + mouseOffsetX;
        const starY = star.y + mouseOffsetY;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;
        const currentOpacity = Math.max(0.1, star.opacity + twinkle);

        const distanceToMouse = Math.sqrt(Math.pow(starX - mouseX, 2) + Math.pow(starY - mouseY, 2));

        const maxGlowDistance = 200;
        const glowIntensity = Math.max(0, 1 - distanceToMouse / maxGlowDistance);
        const starSize = star.size + glowIntensity * 2;

        ctx.beginPath();
        ctx.arc(starX, starY, starSize, 0, Math.PI * 2);

        if (glowIntensity > 0) {
          const starGradient = ctx.createRadialGradient(starX, starY, 0, starX, starY, starSize * 4);
          starGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          starGradient.addColorStop(0.3, `rgba(200, 220, 255, ${currentOpacity * glowIntensity * 0.8})`);
          starGradient.addColorStop(0.6, `rgba(150, 180, 255, ${currentOpacity * glowIntensity * 0.4})`);
          starGradient.addColorStop(1, "rgba(100, 150, 255, 0)");
          ctx.fillStyle = starGradient;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        }

        ctx.fill();

        if (glowIntensity > 0.2) {
          starsRef.current.forEach((otherStar, otherIndex) => {
            if (otherIndex <= index) return;

            const otherStarX = otherStar.x + mouseOffsetX;
            const otherStarY = otherStar.y + mouseOffsetY;

            const starDistance = Math.sqrt(Math.pow(starX - otherStarX, 2) + Math.pow(starY - otherStarY, 2));

            const maxConnectionDistance = 150;
            if (starDistance < maxConnectionDistance) {
              const connectionOpacity = (1 - starDistance / maxConnectionDistance) * glowIntensity * 0.5;

              if (connectionOpacity > 0.05) {
                ctx.beginPath();
                ctx.moveTo(starX, starY);
                ctx.lineTo(otherStarX, otherStarY);
                ctx.strokeStyle = `rgba(150, 180, 255, ${connectionOpacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });
        }
      });

      if (Math.random() < 0.007) {
        drawShootingStar(ctx, canvas.width, canvas.height);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const drawShootingStar = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.3;
      const length = Math.random() * 1000 + 60;
      const angle = Math.PI / 4 + Math.random() * 0.8;

      const shootingGradient = ctx.createLinearGradient(
        startX,
        startY,
        startX + Math.cos(angle) * length,
        startY + Math.sin(angle) * length,
      );
      shootingGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      shootingGradient.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
      shootingGradient.addColorStop(0.3, "rgba(200, 220, 255, 0.6)");
      shootingGradient.addColorStop(1, "rgba(150, 180, 255, 0)");

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
      ctx.strokeStyle = shootingGradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(startX, startY, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 cursor-none bg-linear-to-b from-[#000044]  to-[#000000] touch-none"
    />
  );
}
