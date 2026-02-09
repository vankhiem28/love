"use client";

import { motion, useReducedMotion } from "framer-motion";

export const HeartOrb = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className="h-full w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <defs>
        <radialGradient id="heartGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffd9e6" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#f6b9cf" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e89abf" stopOpacity="1" />
        </radialGradient>
      </defs>
      <motion.path
        d="M60 94C60 94 22 69 22 44C22 30 32 20 45 20C52 20 58 23 60 29C62 23 68 20 75 20C88 20 98 30 98 44C98 69 60 94 60 94Z"
        fill="url(#heartGlow)"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.05, 1], rotate: [0, 2, 0] }
        }
        transform="translate(0 0)"
        style={{ transformOrigin: "50% 60%" }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};
