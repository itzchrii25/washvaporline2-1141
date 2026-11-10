import { useRef, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 25, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function SteamAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  return (
    <div
      ref={ref}
      className={`steam-atmosphere ${visible && !reduced ? "is-flowing" : "is-paused"}`}
      aria-hidden="true"
    >
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className={`steam-particle particle-${i % 3}`}
          style={{
            left: `${8 + ((i * 17) % 85)}%`,
            top: `${20 + ((i * 23) % 74)}%`,
            animationDelay: `${-i * 1.3}s`,
            animationDuration: `${8 + (i % 5)}s`,
          }}
        />
      ))}
      <div className="vapor-ribbon ribbon-one" />
      <div className="vapor-ribbon ribbon-two" />
    </div>
  );
}

export function CinematicTitle() {
  const reduced = useReducedMotion();
  const lines = ["Igiene profonda.", "Pulizia a vapore.", "Ambienti da vivere."];
  let index = 0;
  return (
    <h1 className="cinematic-title" aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => (
        <span
          className={`title-line ${lineIndex === 1 ? "blue-line" : ""}`}
          key={line}
          aria-hidden="true"
        >
          {line.split(" ").map((word, i) => {
            const delay = 0.12 + index++ * 0.075;
            return (
              <span className="word-mask" key={word}>
                <motion.span
                  className="title-word"
                  initial={reduced ? false : { y: "115%", rotate: 5, opacity: 0 }}
                  animate={{ y: "0%", rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 95, damping: 19, delay }}
                >
                  {i > 0 ? " " : ""}
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function InteractiveLink({
  children,
  className,
  href,
  tilt = false,
  label,
}: {
  children: ReactNode;
  className: string;
  href: string;
  tilt?: boolean;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 180, damping: 20, mass: 0.5 });
  const py = useSpring(y, { stiffness: 180, damping: 20, mass: 0.5 });
  const rotateX = useTransform(py, [-12, 12], [7, -7]);
  const rotateY = useTransform(px, [-12, 12], [-7, 7]);
  function move(e: PointerEvent<HTMLAnchorElement>) {
    if (
      reduced ||
      e.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 24);
  }
  return (
    <motion.a
      className={`${className} ${tilt ? "tilt-surface" : "magnetic-link"}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={
        reduced
          ? undefined
          : tilt
            ? { rotateX, rotateY, transformPerspective: 900 }
            : { x: px, y: py }
      }
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onBlur={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={reduced ? undefined : { scale: tilt ? 1.035 : 1.025 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.a>
  );
}

export function ParallaxVisual({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const y = useSpring(shift, { stiffness: 70, damping: 25 });
  return (
    <motion.div
      ref={ref}
      className="hero-visual"
      style={reduced ? undefined : { y }}
      initial={reduced ? false : { opacity: 0, scale: 0.86, rotate: 3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 65, damping: 18, delay: 0.3 }}
    >
      <div className="visual-orbit" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
