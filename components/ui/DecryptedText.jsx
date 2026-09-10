"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

const wrapperStyle = {
  display: "inline-block",
  whiteSpace: "pre-wrap",
};

export default function DecryptedText({
  text = "",
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealed, setRevealed] = useState(new Set());
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");
  const [direction, setDirection] = useState("forward");
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const hasViewedRef = useRef(false);

  const availableChars = useMemo(
    () => useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split(""),
    [useOriginalCharsOnly, text, characters],
  );

  const scramble = useCallback((currentRevealed) => text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      if (currentRevealed.has(index)) return char;
      return availableChars[Math.floor(Math.random() * availableChars.length)] || char;
    })
    .join(""), [text, availableChars]);

  const order = useMemo(() => {
    const indices = Array.from({ length: text.length }, (_, index) => index);
    if (revealDirection === "end") return indices.reverse();
    if (revealDirection !== "center") return indices;
    const center = Math.floor(text.length / 2);
    return indices.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
  }, [text.length, revealDirection]);

  const startDecrypt = useCallback(() => {
    clearInterval(intervalRef.current);
    setDirection("forward");
    setRevealed(new Set());
    setDisplayText(scramble(new Set()));
    setIsDecrypted(false);
    setIsAnimating(true);
  }, [scramble]);

  const startEncrypt = useCallback(() => {
    clearInterval(intervalRef.current);
    setDirection("reverse");
    setRevealed(new Set(Array.from({ length: text.length }, (_, index) => index)));
    setDisplayText(text);
    setIsDecrypted(true);
    setIsAnimating(true);
  }, [text]);

  useEffect(() => {
    if (!isAnimating) return undefined;
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setRevealed((current) => {
        if (sequential) {
          const next = new Set(current);
          if (direction === "forward") {
            if (next.size < order.length) next.add(order[next.size]);
            else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(true);
              setDisplayText(text);
              return next;
            }
          } else if (next.size > 0) {
            next.delete(order[next.size - 1]);
          } else {
            clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(false);
            return next;
          }
          setDisplayText(scramble(next));
          return next;
        }

        iteration += 1;
        setDisplayText(scramble(current));
        if (iteration >= maxIterations) {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(direction === "forward");
          setDisplayText(direction === "forward" ? text : scramble(new Set()));
        }
        return current;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [direction, isAnimating, maxIterations, order, scramble, sequential, speed, text]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewedRef.current) {
          hasViewedRef.current = true;
          startDecrypt();
        }
      },
      { threshold: 0.15 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOn, startDecrypt]);

  const handleEnter = () => {
    if (animateOn === "hover" || animateOn === "inViewHover") startDecrypt();
  };
  const handleLeave = () => {
    if (animateOn === "hover" || animateOn === "inViewHover") {
      clearInterval(intervalRef.current);
      setIsAnimating(false);
      setIsDecrypted(true);
      setDisplayText(text);
    }
  };
  const handleClick = () => {
    if (animateOn !== "click") return;
    if (clickMode === "toggle" && isDecrypted) startEncrypt();
    else if (!isDecrypted) startDecrypt();
  };

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      style={wrapperStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      {...props}
    >
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const revealedNow = revealed.has(index) || (!isAnimating && isDecrypted);
          return <span key={`${index}-${char}`} className={revealedNow ? className : encryptedClassName}>{char}</span>;
        })}
      </span>
    </motion.span>
  );
}
