"use client";

import { motion } from "framer-motion";

export default function LaunchPadSVG() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 120 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(240,192,48,0.15)]"
        >
          {/* Flag pole + flag at top */}
          <rect x="82" y="8" width="2" height="34" fill="#1B2D4F" />
          <motion.g
            animate={{ skewX: [0, 3, -2, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "84px 16px" }}
          >
            <rect x="84" y="8" width="24" height="5.5" rx="0.5" fill="#FF9933" />
            <rect x="84" y="13.5" width="24" height="5.5" rx="0.5" fill="white" />
            <rect x="84" y="19" width="24" height="5.5" rx="0.5" fill="#138808" />
            <circle cx="96" cy="16.3" r="2" fill="none" stroke="#000080" strokeWidth="0.5" opacity="0.6" />
          </motion.g>

          {/* Tower top platform */}
          <rect x="18" y="38" width="66" height="5" rx="2" fill="#1B2D4F" />

          {/* Tower left leg */}
          <rect x="22" y="43" width="5" height="130" fill="#1B2D4F" />
          {/* Tower right leg */}
          <rect x="75" y="43" width="5" height="130" fill="#1B2D4F" />

          {/* Cross beams */}
          <line x1="24.5" y1="60" x2="77.5" y2="60" stroke="#1B2D4F" strokeWidth="2.5" />
          <line x1="24.5" y1="85" x2="77.5" y2="85" stroke="#1B2D4F" strokeWidth="2.5" />
          <line x1="24.5" y1="110" x2="77.5" y2="110" stroke="#1B2D4F" strokeWidth="2.5" />
          <line x1="24.5" y1="135" x2="77.5" y2="135" stroke="#1B2D4F" strokeWidth="2.5" />
          <line x1="24.5" y1="158" x2="77.5" y2="158" stroke="#1B2D4F" strokeWidth="2.5" />

          {/* Diagonal braces */}
          <line x1="24.5" y1="60" x2="77.5" y2="85" stroke="#1B2D4F" strokeWidth="1" opacity="0.4" />
          <line x1="77.5" y1="60" x2="24.5" y2="85" stroke="#1B2D4F" strokeWidth="1" opacity="0.4" />
          <line x1="24.5" y1="85" x2="77.5" y2="110" stroke="#1B2D4F" strokeWidth="1" opacity="0.4" />
          <line x1="77.5" y1="85" x2="24.5" y2="110" stroke="#1B2D4F" strokeWidth="1" opacity="0.4" />
          <line x1="24.5" y1="110" x2="77.5" y2="135" stroke="#1B2D4F" strokeWidth="1" opacity="0.4" />
          <line x1="77.5" y1="110" x2="24.5" y2="135" stroke="#1B2D4F" strokeWidth="1" opacity="0.4" />

          {/* Rocket on pad */}
          {/* Body */}
          <path d="M51 58 C51 58, 51 46, 51 46 C51 46, 51 58, 51 58Z" fill="none" />
          <path d="M42 62 C42 62, 51 42, 51 42 C51 42, 60 62, 60 62 L60 140 L42 140 Z" fill="#F0C030" stroke="#1B2D4F" strokeWidth="1.5" />
          {/* Nose */}
          <path d="M51 42 C49 50, 44 58, 43.5 64 L58.5 64 C58 58, 53 50, 51 42Z" fill="#1B2D4F" />
          {/* Window */}
          <circle cx="51" cy="82" r="5.5" fill="#4A9AD9" stroke="#1B2D4F" strokeWidth="1" />
          <circle cx="51" cy="82" r="3" fill="#E6F2FB" />
          <ellipse cx="49.5" cy="81" rx="1.2" ry="1.8" fill="white" opacity="0.4" />
          {/* Body stripes */}
          <rect x="42" y="100" width="18" height="2" rx="0.5" fill="#D4A528" opacity="0.5" />
          <rect x="42" y="106" width="18" height="2" rx="0.5" fill="#D4A528" opacity="0.35" />
          {/* Fins */}
          <path d="M42 128 L32 152 L42 145Z" fill="#1B2D4F" />
          <path d="M60 128 L70 152 L60 145Z" fill="#1B2D4F" />
          {/* Fin accents */}
          <path d="M42 134 L36 148 L42 143Z" fill="#F0C030" opacity="0.25" />
          <path d="M60 134 L66 148 L60 143Z" fill="#F0C030" opacity="0.25" />
          {/* Nozzle */}
          <path d="M44 140 L46 148 L56 148 L58 140Z" fill="#1B2D4F" />
          <rect x="47" y="148" width="8" height="3" rx="1" fill="#2A3F66" />

          {/* Animated flame */}
          <motion.g
            animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1] }}
            transition={{ duration: 0.35, repeat: Infinity }}
            style={{ transformOrigin: "51px 151px" }}
          >
            <path d="M46 151 L51 178 L56 151" fill="#F0C030" opacity="0.9" />
            <path d="M47.5 151 L51 172 L54.5 151" fill="#FF6B35" opacity="0.8" />
            <path d="M49 151 L51 165 L53 151" fill="#FFE699" opacity="0.9" />
          </motion.g>

          {/* Smoke */}
          <motion.g
            animate={{ opacity: [0, 0.35, 0.5, 0.2, 0], x: [-3, -12, -22] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <circle cx="35" cy="168" r="6" fill="white" opacity="0.12" />
            <circle cx="28" cy="172" r="4.5" fill="white" opacity="0.08" />
          </motion.g>
          <motion.g
            animate={{ opacity: [0, 0.3, 0.45, 0.15, 0], x: [3, 12, 22] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <circle cx="67" cy="168" r="5.5" fill="white" opacity="0.12" />
            <circle cx="74" cy="172" r="4" fill="white" opacity="0.08" />
          </motion.g>

          {/* Ground platform */}
          <rect x="5" y="173" width="110" height="6" rx="3" fill="#1B2D4F" />
          <rect x="12" y="178" width="96" height="8" rx="2.5" fill="#1B2D4F" opacity="0.5" />

          {/* Achievement stars */}
          <motion.g
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ transformOrigin: "105px 22px" }}
          >
            <path d="M105 17 L106.5 21 L111 21 L107.5 23.5 L108.5 27.5 L105 25 L101.5 27.5 L102.5 23.5 L99 21 L103.5 21 Z" fill="#F0C030" />
          </motion.g>
          <motion.g
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
            style={{ transformOrigin: "8px 30px" }}
          >
            <path d="M8 27 L9 29.5 L11.5 29.5 L9.5 31 L10.5 33.5 L8 32 L5.5 33.5 L6.5 31 L4.5 29.5 L7 29.5 Z" fill="#F0C030" opacity="0.8" />
          </motion.g>
          <motion.g
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            style={{ transformOrigin: "112px 70px" }}
          >
            <path d="M112 67.5 L113 69.5 L115 69.5 L113.5 71 L114 73 L112 71.5 L110 73 L110.5 71 L109 69.5 L111 69.5 Z" fill="#4A9AD9" opacity="0.7" />
          </motion.g>

          {/* "1st" badge */}
          <rect x="86" y="80" width="30" height="18" rx="9" fill="#F0C030" />
          <text x="101" y="93" textAnchor="middle" fill="#1B2D4F" fontSize="10" fontWeight="800" fontFamily="system-ui">1st</text>

          {/* River wave at bottom */}
          <motion.path
            d="M0 198 Q20 194, 40 198 Q60 202, 80 198 Q100 194, 120 198"
            stroke="#4A9AD9"
            strokeWidth="1.2"
            fill="none"
            opacity="0.2"
            animate={{ d: [
              "M0 198 Q20 194, 40 198 Q60 202, 80 198 Q100 194, 120 198",
              "M0 198 Q20 202, 40 198 Q60 194, 80 198 Q100 202, 120 198",
              "M0 198 Q20 194, 40 198 Q60 202, 80 198 Q100 194, 120 198",
            ] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
