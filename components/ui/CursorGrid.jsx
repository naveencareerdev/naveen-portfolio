"use client";

import { useEffect, useRef } from "react";
import "./CursorGrid.css";

const FALLOFF_CURVES = {
  linear: (value) => value,
  smooth: (value) => value * value * (3 - 2 * value),
  sharp: (value) => value * value * value,
};

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value;
  const number = parseInt(normalized.slice(0, 6), 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

export default function CursorGrid({
  cellSize = 70,
  color = "#D946EF",
  radius = 140,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = "",
  excludeSelector = "",
  contentSelector = "a, button, input, textarea, select, img, svg, video, canvas, h1, h2, h3, h4, h5, h6, p, li, [role='button'], [data-cursor]",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({});
  const wakeRef = useRef(null);

  propsRef.current = {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    excludeSelector,
    contentSelector,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const context = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let columns = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let width = 0;
    let height = 0;
    const pulses = [];
    let animationFrame = 0;
    let running = false;
    let lastFrame = 0;

    const rebuild = () => {
      const current = propsRef.current;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / current.cellSize) + 1;
      rows = Math.ceil(height / current.cellSize) + 1;
      offsetX = (width - columns * current.cellSize) / 2;
      offsetY = (height - rows * current.cellSize) / 2;
      alphas = new Float32Array(columns * rows);
      touched = new Float64Array(columns * rows);
    };

    const cellCenter = (index) => {
      const current = propsRef.current;
      return [
        offsetX + (index % columns) * current.cellSize + current.cellSize / 2,
        offsetY + Math.floor(index / columns) * current.cellSize + current.cellSize / 2,
      ];
    };

    const energize = (x, y, boost = 1) => {
      const current = propsRef.current;
      const activeRadius = Math.max(current.radius, 1);
      const ease = FALLOFF_CURVES[current.falloff] || FALLOFF_CURVES.linear;
      const now = performance.now();
      const minColumn = Math.max(0, Math.floor((x - activeRadius - offsetX) / current.cellSize));
      const maxColumn = Math.min(columns - 1, Math.floor((x + activeRadius - offsetX) / current.cellSize));
      const minRow = Math.max(0, Math.floor((y - activeRadius - offsetY) / current.cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((y + activeRadius - offsetY) / current.cellSize));

      for (let row = minRow; row <= maxRow; row += 1) {
        for (let column = minColumn; column <= maxColumn; column += 1) {
          const index = row * columns + column;
          const [centerX, centerY] = cellCenter(index);
          const distance = Math.hypot(centerX - x, centerY - y);
          if (distance > activeRadius) continue;
          const level = ease(1 - distance / activeRadius) * current.maxOpacity * boost;
          if (level > alphas[index]) alphas[index] = level;
          if (level > 0) touched[index] = now;
        }
      }
    };

    const draw = (now) => {
      const current = propsRef.current;
      const delta = Math.min(now - lastFrame, 50);
      lastFrame = now;
      context.clearRect(0, 0, width, height);
      const [red, green, blue] = hexToRgb(current.color);

      if (current.gridOpacity > 0) {
        context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${current.gridOpacity})`;
        context.lineWidth = 1;
        context.beginPath();
        for (let column = 0; column <= columns; column += 1) {
          const x = Math.round(offsetX + column * current.cellSize) + 0.5;
          context.moveTo(x, 0);
          context.lineTo(x, height);
        }
        for (let row = 0; row <= rows; row += 1) {
          const y = Math.round(offsetY + row * current.cellSize) + 0.5;
          context.moveTo(0, y);
          context.lineTo(width, y);
        }
        context.stroke();
      }

      for (let pulseIndex = pulses.length - 1; pulseIndex >= 0; pulseIndex -= 1) {
        const pulse = pulses[pulseIndex];
        const ringRadius = ((now - pulse.startedAt) / 1000) * current.pulseSpeed;
        if (ringRadius > Math.hypot(width, height)) {
          pulses.splice(pulseIndex, 1);
          continue;
        }
        const band = current.cellSize;
        const minColumn = Math.max(0, Math.floor((pulse.x - ringRadius - band - offsetX) / current.cellSize));
        const maxColumn = Math.min(columns - 1, Math.floor((pulse.x + ringRadius + band - offsetX) / current.cellSize));
        const minRow = Math.max(0, Math.floor((pulse.y - ringRadius - band - offsetY) / current.cellSize));
        const maxRow = Math.min(rows - 1, Math.floor((pulse.y + ringRadius + band - offsetY) / current.cellSize));

        for (let row = minRow; row <= maxRow; row += 1) {
          for (let column = minColumn; column <= maxColumn; column += 1) {
            const index = row * columns + column;
            const [centerX, centerY] = cellCenter(index);
            if (Math.abs(Math.hypot(centerX - pulse.x, centerY - pulse.y) - ringRadius) < band / 2) {
              alphas[index] = Math.max(alphas[index], current.maxOpacity);
              touched[index] = now;
            }
          }
        }
      }

      let hasVisibleCells = pulses.length > 0;
      const fadeStep = delta / Math.max(current.fadeDuration, 16);
      const halfCell = current.cellSize / 2;

      for (let index = 0; index < alphas.length; index += 1) {
        let alpha = alphas[index];
        if (alpha <= 0) continue;
        if (now - touched[index] > current.holdTime) {
          alpha = Math.max(0, alpha - fadeStep);
          alphas[index] = alpha;
          if (alpha <= 0) continue;
        }
        hasVisibleCells = true;
        const [centerX, centerY] = cellCenter(index);
        const glow = context.createRadialGradient(centerX, centerY, halfCell * 0.1, centerX, centerY, current.cellSize);
        glow.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
        glow.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
        const x = centerX - halfCell + 0.5;
        const y = centerY - halfCell + 0.5;
        const size = current.cellSize - 1;

        context.beginPath();
        if (current.cellRadius > 0) context.roundRect(x, y, size, size, current.cellRadius);
        else context.rect(x, y, size, size);
        if (current.fillOpacity > 0) {
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * current.fillOpacity})`;
          context.fill();
        }
        context.strokeStyle = glow;
        context.lineWidth = current.lineWidth;
        context.stroke();
      }

      if (hasVisibleCells) animationFrame = requestAnimationFrame(draw);
      else running = false;
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(draw);
    };
    wakeRef.current = wake;

    const toLocal = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return [clientX - rect.left, clientY - rect.top];
    };
    const onPointerMove = (event) => {
      if (
        (propsRef.current.excludeSelector && event.target.closest?.(propsRef.current.excludeSelector)) ||
        (propsRef.current.contentSelector && event.target.closest?.(propsRef.current.contentSelector))
      ) {
        alphas.fill(0);
        touched.fill(0);
        pulses.length = 0;
        cancelAnimationFrame(animationFrame);
        running = false;
        context.clearRect(0, 0, width, height);
        return;
      }
      const [x, y] = toLocal(event.clientX, event.clientY);
      energize(x, y);
      wake();
    };
    const onPointerDown = (event) => {
      if (
        !propsRef.current.clickPulse ||
        (propsRef.current.excludeSelector && event.target.closest?.(propsRef.current.excludeSelector)) ||
        (propsRef.current.contentSelector && event.target.closest?.(propsRef.current.contentSelector))
      ) return;
      const [x, y] = toLocal(event.clientX, event.clientY);
      pulses.push({ x, y, startedAt: performance.now() });
      wake();
    };
    const resizeObserver = new ResizeObserver(() => {
      rebuild();
      wake();
    });

    resizeObserver.observe(container);
    rebuild();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    wake();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      wakeRef.current = null;
    };
  }, [cellSize]);

  useEffect(() => {
    wakeRef.current?.();
  }, [gridOpacity, color, lineWidth, maxOpacity, fillOpacity, cellRadius]);

  return (
    <div ref={containerRef} className={`cursor-grid${className ? ` ${className}` : ""}`}>
      <canvas ref={canvasRef} className="cursor-grid__canvas" />
    </div>
  );
}
