import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor glow effect
  const springConfig = { damping: 30, stiffness: 180, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen for hovering elements that should trigger custom interactions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".interactive-card"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Background Interactive Glow */}
      <motion.div
        id="bg-glow"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{
          background: `radial-gradient(circle 350px at ${cursorX.get()}px ${cursorY.get()}px, rgba(0, 240, 255, 0.05) 0%, rgba(157, 0, 255, 0.03) 40%, transparent 100%)`,
        }}
      />

      {/* Cyber Cursor Outer Ring */}
      {isVisible && (
        <motion.div
          id="custom-cursor-ring"
          className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-neon-blue/40 mix-blend-screen hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: isHovered ? 48 : 24,
            height: isHovered ? 48 : 24,
            borderColor: isHovered ? "rgba(157, 0, 255, 0.6)" : "rgba(0, 240, 255, 0.4)",
            backgroundColor: isHovered ? "rgba(157, 0, 255, 0.05)" : "rgba(0, 240, 255, 0)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        />
      )}

      {/* Cyber Cursor Inner Dot */}
      {isVisible && (
        <motion.div
          id="custom-cursor-dot"
          className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-neon-blue mix-blend-screen shadow-[0_0_8px_#00F0FF] hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? "#9D00FF" : "#00F0FF",
          }}
        />
      )}
    </>
  );
}
