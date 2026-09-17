"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./OrbitImages.css";

function generateEllipsePath(cx, cy, rx, ry) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx, cy, radius) {
  return generateEllipsePath(cx, cy, radius, radius);
}

function generateRectanglePath(cx, cy, width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return `M ${cx - halfWidth} ${cy - halfHeight} L ${cx + halfWidth} ${cy - halfHeight} L ${cx + halfWidth} ${cy + halfHeight} L ${cx - halfWidth} ${cy + halfHeight} Z`;
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetDistance = useTransform(progress, (value) => {
    const offset = (((value + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetAnchor: "center center",
        offsetDistance,
      }}
    >
      <div style={{ transform: `rotate(${-rotation}deg)` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = "Orbiting image",
  shape = "ellipse",
  baseWidth = 1400,
  radiusX = 520,
  radiusY = 520,
  radius = 300,
  rotation = 0,
  duration = 24,
  itemSize = 56,
  direction = "normal",
  fill = true,
  className = "",
  showPath = false,
  pathColor = "rgba(0,0,0,0.1)",
  pathWidth = 2,
  easing = "linear",
  paused = false,
  centerContent,
  responsive = false,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(null);
  const designCenter = baseWidth / 2;
  const path = useMemo(() => {
    if (shape === "circle") return generateCirclePath(designCenter, designCenter, radius);
    if (shape === "rectangle") return generateRectanglePath(designCenter, designCenter, radiusX * 2, radiusY * 2);
    return generateEllipsePath(designCenter, designCenter, radiusX, radiusY);
  }, [shape, designCenter, radius, radiusX, radiusY]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return undefined;
    const updateScale = () => setScale(containerRef.current.clientWidth / baseWidth);
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return undefined;
    const controls = animate(progress, direction === "reverse" ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  return (
    <div
      ref={containerRef}
      className={`orbit-container ${className}`}
      style={{ width: "100%", height: "100%", aspectRatio: responsive ? "1 / 1" : undefined }}
      aria-hidden="true"
    >
      <div
        className="orbit-scaling-container orbit-scaling-container--responsive"
        style={{
          width: baseWidth,
          height: baseWidth,
          transform: responsive && scale !== null ? `translate(-50%, -50%) scale(${scale})` : undefined,
          visibility: responsive && scale === null ? "hidden" : undefined,
        }}
      >
        <div className="orbit-rotation-wrapper" style={{ transform: `rotate(${rotation}deg)` }}>
          {showPath && (
            <svg width="100%" height="100%" viewBox={`0 0 ${baseWidth} ${baseWidth}`} className="orbit-path-svg">
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}
          {images.map((image, index) => (
            <OrbitItem
              key={image.src || image}
              item={<img src={image.src || image} alt={`${altPrefix} ${index + 1}`} draggable={false} className="orbit-image" />}
              index={index}
              totalItems={images.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>
      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}
