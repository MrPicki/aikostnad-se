import { useEffect, useRef } from "react";

const GRID = 34;
const RADIUS = 1.1;
const BASE_OPACITY = 0.05;
const PEAK_OPACITY = 0.28;

interface Dot {
  x: number;
  y: number;
  opacity: number;
  target: number;
  speed: number;
}

export function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let raf: number;

    function buildGrid() {
      const cols = Math.ceil(canvas!.width / GRID) + 1;
      const rows = Math.ceil(canvas!.height / GRID) + 1;
      dots = [];
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          dots.push({
            x: c * GRID,
            y: r * GRID,
            opacity: BASE_OPACITY + Math.random() * 0.04,
            target: BASE_OPACITY,
            speed: 0.0008 + Math.random() * 0.002,
          });
        }
      }
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      buildGrid();
    }

    resize();
    window.addEventListener("resize", resize);

    // Occasionally pick a random dot to light up
    function scheduleFlicker() {
      const dot = dots[Math.floor(Math.random() * dots.length)];
      if (dot) {
        dot.target = 0.12 + Math.random() * (PEAK_OPACITY - 0.12);
        dot.speed = 0.001 + Math.random() * 0.003;
      }
      setTimeout(scheduleFlicker, 60 + Math.random() * 120);
    }
    const flickerTimeout = setTimeout(scheduleFlicker, 200);

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const dot of dots) {
        if (Math.abs(dot.opacity - dot.target) < 0.002) {
          // Reached target — if we peaked, drift back to base
          dot.target =
            dot.target > BASE_OPACITY + 0.02
              ? BASE_OPACITY + Math.random() * 0.02
              : dot.target;
        }
        dot.opacity +=
          (dot.target - dot.opacity) * dot.speed * 60;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(99,102,241,${dot.opacity.toFixed(3)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(flickerTimeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
