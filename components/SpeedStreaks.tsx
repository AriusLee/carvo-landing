"use client";
/* Procedural speed-streak backdrop — horizontal light trails rushing past at
   varied speed/length/opacity (orange + white), drawn on a canvas. Pauses when
   off-screen; honours prefers-reduced-motion (single static frame). */
import { useEffect, useRef } from "react";

type Streak = {
  x: number;
  y: number;
  len: number;
  speed: number;
  thick: number;
  alpha: number;
  orange: boolean;
};

export function SpeedStreaks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let streaks: Streak[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (initial: boolean): Streak => {
      const speed = rand(5, 24); // fast
      const orange = Math.random() < 0.24;
      // weight vertical position toward the centre band
      const y = h / 2 + (Math.random() - 0.5) * h * (0.55 + Math.random() * 0.5);
      return {
        x: initial ? Math.random() * w : w + rand(0, w * 0.7),
        y,
        len: rand(70, 360) * (0.55 + speed / 24), // faster → longer trail
        speed,
        thick: rand(0.5, 2.4),
        alpha: rand(0.1, 0.55) * (0.6 + speed / 24),
        orange,
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, Math.max(40, w / 14)));
      streaks = Array.from({ length: count }, () => spawn(true));
    };

    const render = (advance: boolean) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (const s of streaks) {
        if (advance) {
          s.x -= s.speed;
          if (s.x + s.len < 0) Object.assign(s, spawn(false));
        }
        const col = s.orange ? "242,106,33" : "236,236,242";
        const g = ctx.createLinearGradient(s.x, 0, s.x + s.len, 0);
        g.addColorStop(0, `rgba(${col},0)`);
        g.addColorStop(0.35, `rgba(${col},${s.alpha})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.thick;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = () => {
      render(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduced) {
      render(false); // single static frame
    }

    const onResize = () => {
      resize();
      if (reduced) render(false);
    };
    window.addEventListener("resize", onResize);

    // pause when off-screen
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="speed-canvas" aria-hidden="true" />;
}
