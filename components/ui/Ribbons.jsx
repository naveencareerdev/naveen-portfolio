"use client";

import { useEffect, useRef } from "react";
import { Color, Polyline, Renderer, Transform, Vec3 } from "ogl";
import "./Ribbons.css";

const CONTENT_SELECTOR =
  "a, button, input, textarea, select, img, svg, video, canvas, h1, h2, h3, h4, h5, h6, p, li, [role='button'], [data-cursor]";

function overContent(target) {
  if (!(target instanceof Element)) return true;
  if (target.closest(CONTENT_SELECTOR) || target.closest("#hero")) return true;
  let current = target;
  while (current && current !== document.body) {
    if (current.textContent?.trim()) return true;
    current = current.parentElement;
  }
  return false;
}

export default function Ribbons({
  colors = ["#4FBEA6", "#E8963C"],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 18,
  offsetFactor = 0.025,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.5,
  enableFade = true,
  enableShaderEffect = true,
  effectAmplitude = 1.4,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
    });
    const { gl } = renderer;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.className = "ribbons-canvas";
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines = [];
    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      varying vec2 vUV;
      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        normal *= smoothstep(0.0, 0.02, length(nextScreen - prevScreen));
        normal *= (1.0 / (uResolution.y / uDPR)) * uThickness;
        current.xy -= normal * side;
        if (uEnableShaderEffect > 0.5) {
          current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
        }
        return current;
      }
      void main() {
        vUV = uv;
        gl_Position = getPosition();
      }
    `;
    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
        float fade = uEnableFade > 0.5 ? 1.0 - smoothstep(0.0, 1.0, vUV.y) : 1.0;
        gl_FragColor = vec4(uColor, uOpacity * fade);
      }
    `;

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      lines.forEach(({ polyline }) => polyline.resize());
    };
    const center = (colors.length - 1) / 2;

    colors.forEach((color, index) => {
      const points = Array.from({ length: pointCount }, () => new Vec3());
      const line = {
        points,
        spring: baseSpring + (Math.random() - 0.5) * 0.05,
        friction: baseFriction + (Math.random() - 0.5) * 0.05,
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3(
          (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.1,
          0,
        ),
      };
      line.polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: baseThickness + (Math.random() - 0.5) * 3 },
          uOpacity: { value: 0.72 },
          uTime: { value: 0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1 : 0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1 : 0 },
        },
      });
      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    resize();
    const mouse = new Vec3(-10, -10, 0);
    const targetMouse = new Vec3(-10, -10, 0);
    const onPointerMove = (event) => {
      if (overContent(event.target)) {
        targetMouse.set(-10, -10, 0);
        return;
      }
      const rect = container.getBoundingClientRect();
      targetMouse.set(
        ((event.clientX - rect.left) / container.clientWidth) * 2 - 1,
        ((event.clientY - rect.top) / container.clientHeight) * -2 + 1,
        0,
      );
    };
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let frameId;
    let lastTime = performance.now();
    const temporary = new Vec3();
    const update = () => {
      frameId = requestAnimationFrame(update);
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      mouse.lerp(targetMouse, 0.2);
      lines.forEach((line) => {
        temporary.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(temporary).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);
        for (let index = 1; index < line.points.length; index += 1) {
          const delay = maxAge / Math.max(line.points.length - 1, 1);
          line.points[index].lerp(line.points[index - 1], Math.min(1, (delta * speedMultiplier) / delay));
        }
        line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
        line.polyline.updateGeometry();
      });
      renderer.render({ scene });
    };
    update();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameId);
      gl.canvas.remove();
    };
  }, [colors, baseSpring, baseFriction, baseThickness, offsetFactor, maxAge, pointCount, speedMultiplier, enableFade, enableShaderEffect, effectAmplitude]);

  return <div ref={containerRef} className="ribbons-container" aria-hidden="true" />;
}
