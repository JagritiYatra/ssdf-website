"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Newspaper } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { featuredNews } from "@/lib/news-data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function NewsHighlights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 md:py-14 bg-navy-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-river-500 mb-2">
              <Newspaper size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">Media Coverage</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800">
              In the News
            </h2>
            <p className="text-navy-500 text-sm mt-1">
              Featured across 80+ newspaper publications
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-navy-200 flex items-center justify-center hover:bg-navy-100 transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} className="text-navy-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-navy-200 flex items-center justify-center hover:bg-navy-100 transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} className="text-navy-600" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredNews.map((clip, i) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.5) }}
              className="shrink-0 w-[280px] sm:w-[300px] snap-start"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-navy-100 hover:shadow-lg transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                  <Image
                    src={clip.src}
                    alt={clip.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {clip.headline && (
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-river-500">
                      {clip.source}
                    </span>
                    <p className="text-sm text-navy-700 font-medium mt-1 leading-snug line-clamp-2">
                      {clip.headline}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* View all card */}
          <div className="shrink-0 w-[280px] sm:w-[300px] snap-start flex items-center justify-center">
            <Link href="/news" className="text-center group">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-golden-50 transition-colors">
                <ArrowRight size={24} className="text-navy-400 group-hover:text-golden-500 transition-colors" />
              </div>
              <span className="text-sm font-semibold text-navy-600 group-hover:text-golden-600 transition-colors">
                View All 80+ Clippings
              </span>
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/news">
            <Button variant="secondary" size="sm">
              View All Media Coverage <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
