"use client";

import { motion } from "framer-motion";

export default function SatelliteSVG() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 120 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(74,154,217,0.15)]"
        >
          {/* Orbit ring */}
          <motion.ellipse
            cx="60"
            cy="95"
            rx="56"
            ry="20"
            stroke="#4A9AD9"
            strokeWidth="0.8"
            strokeDasharray="5 3"
            opacity="0.25"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "60px 95px" }}
          />

          {/* Signal waves from top */}
          <motion.g
            animate={{ opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M48 30 C48 22, 60 16, 60 16" stroke="#4A9AD9" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M44 25 C44 15, 60 8, 60 8" stroke="#4A9AD9" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M40 20 C40 8, 60 0, 60 0" stroke="#4A9AD9" strokeWidth="1" fill="none" opacity="0.2" />
          </motion.g>

          {/* Antenna mast */}
          <path d="M55 62 L60 38 L65 62" fill="none" stroke="#1B2D4F" strokeWidth="2" />
          {/* Antenna dish */}
          <circle cx="60" cy="36" r="7" fill="none" stroke="#F0C030" strokeWidth="2" />
          <circle cx="60" cy="36" r="3.5" fill="#F0C030" />

          {/* Solar panel left */}
          <rect x="2" y="78" width="34" height="34" rx="3" fill="#1B2D4F" stroke="#4A9AD9" strokeWidth="1.5" />
          {/* Panel grid left */}
          <line x1="13" y1="78" x2="13" y2="112" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          <line x1="24" y1="78" x2="24" y2="112" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          <line x1="2" y1="89" x2="36" y2="89" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          <line x1="2" y1="101" x2="36" y2="101" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          {/* Panel shine */}
          <rect x="3" y="79" width="15" height="9" rx="1" fill="#4A9AD9" opacity="0.1" />

          {/* Panel arm left */}
          <rect x="36" y="91" width="9" height="8" rx="1" fill="#F0C030" />

          {/* Satellite body */}
          <rect x="45" y="62" width="30" height="66" rx="6" fill="#F0C030" stroke="#1B2D4F" strokeWidth="2" />
          {/* Front panel */}
          <rect x="49" y="67" width="22" height="22" rx="3" fill="#1B2D4F" />
          {/* Status lights */}
          <motion.circle
            cx="56" cy="78" r="3" fill="#4A9AD9"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="66" cy="78" r="3" fill="#3DAA35"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* India tricolor on body */}
          <rect x="49" y="96" width="22" height="3" rx="0.5" fill="#FF9933" opacity="0.9" />
          <rect x="49" y="99" width="22" height="3" rx="0.5" fill="white" opacity="0.7" />
          <rect x="49" y="102" width="22" height="3" rx="0.5" fill="#138808" opacity="0.9" />

          {/* Label area */}
          <rect x="51" y="110" width="18" height="6" rx="1.5" fill="#D4A528" opacity="0.4" />
          {/* Bottom detail */}
          <rect x="52" y="120" width="16" height="4" rx="1" fill="#1B2D4F" />

          {/* Panel arm right */}
          <rect x="75" y="91" width="9" height="8" rx="1" fill="#F0C030" />

          {/* Solar panel right */}
          <rect x="84" y="78" width="34" height="34" rx="3" fill="#1B2D4F" stroke="#4A9AD9" strokeWidth="1.5" />
          {/* Panel grid right */}
          <line x1="95" y1="78" x2="95" y2="112" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          <line x1="106" y1="78" x2="106" y2="112" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          <line x1="84" y1="89" x2="118" y2="89" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          <line x1="84" y1="101" x2="118" y2="101" stroke="#4A9AD9" strokeWidth="0.5" opacity="0.5" />
          {/* Panel shine */}
          <rect x="85" y="79" width="15" height="9" rx="1" fill="#4A9AD9" opacity="0.1" />

          {/* Orbiting dot */}
          <motion.circle
            r="2.5"
            fill="#F0C030"
            animate={{
              cx: [116, 60, 4, 60, 116],
              cy: [95, 75, 95, 115, 95],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            opacity="0.6"
          />

          {/* Stars */}
          <motion.circle cx="10" cy="20" r="1.5" fill="#F0C030"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle cx="108" cy="12" r="1" fill="#F0C030"
            animate={{ opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.circle cx="100" cy="150" r="1.5" fill="#4A9AD9"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle cx="18" cy="145" r="1" fill="#4A9AD9"
            animate={{ opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />

          {/* Earth curve at bottom */}
          <path d="M0 195 Q60 170, 120 195 L120 210 L0 210 Z" fill="#4A9AD9" opacity="0.06" />
          <path d="M0 195 Q60 170, 120 195" stroke="#4A9AD9" strokeWidth="0.8" opacity="0.15" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
