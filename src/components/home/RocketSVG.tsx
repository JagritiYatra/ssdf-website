"use client";

import { motion } from "framer-motion";

export default function RocketSVG() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 120 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(240,192,48,0.15)]"
        >
          {/* Rocket body */}
          <path
            d="M60 10 C60 10, 85 40, 85 90 L85 150 L35 150 L35 90 C35 40, 60 10, 60 10Z"
            fill="#F0C030"
            stroke="#1B2D4F"
            strokeWidth="2"
          />
          {/* Nose cone */}
          <path
            d="M60 10 C55 25, 42 50, 40 70 L80 70 C78 50, 65 25, 60 10Z"
            fill="#1B2D4F"
          />
          {/* Window outer ring */}
          <circle cx="60" cy="85" r="14" fill="#1B2D4F" />
          {/* Window */}
          <circle cx="60" cy="85" r="11" fill="#4A9AD9" />
          <circle cx="60" cy="85" r="7" fill="#E6F2FB" />
          {/* Window shine */}
          <ellipse cx="56" cy="82" rx="3" ry="4" fill="white" opacity="0.4" />
          {/* Body stripes */}
          <rect x="35" y="120" width="50" height="3" rx="1" fill="#D4A528" opacity="0.6" />
          <rect x="35" y="128" width="50" height="3" rx="1" fill="#D4A528" opacity="0.4" />
          {/* Fins */}
          <path d="M35 125 L12 172 L35 158Z" fill="#1B2D4F" />
          <path d="M85 125 L108 172 L85 158Z" fill="#1B2D4F" />
          {/* Fin accents */}
          <path d="M35 135 L20 165 L35 155Z" fill="#F0C030" opacity="0.3" />
          <path d="M85 135 L100 165 L85 155Z" fill="#F0C030" opacity="0.3" />
          {/* Bottom nozzle */}
          <path d="M38 150 L42 162 L78 162 L82 150Z" fill="#1B2D4F" />
          <rect x="45" y="162" width="30" height="4" rx="2" fill="#2A3F66" />
          {/* Flame */}
          <motion.g
            animate={{ scaleY: [1, 1.3, 0.9, 1.15, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            style={{ transformOrigin: "60px 166px" }}
          >
            <path d="M44 166 L60 210 L76 166" fill="#F0C030" opacity="0.9" />
            <path d="M49 166 L60 200 L71 166" fill="#FF6B35" opacity="0.8" />
            <path d="M53 166 L60 188 L67 166" fill="#FFE699" opacity="0.9" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
