"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";
import { newsClippings } from "@/lib/news-data";

const BATCH_SIZE = 20;

export default function NewsPage() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const loadMore = () => setVisibleCount((c) => Math.min(c + BATCH_SIZE, newsClippings.length));

  const visible = newsClippings.slice(0, visibleCount);

  const goNext = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null ? (i + 1) % newsClippings.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null
        ? (i - 1 + newsClippings.length) % newsClippings.length
        : null
    );
  }, []);

  return (
    <>
      <PageHeader
        title="News &"
        highlight="Media"
        subtitle="SSDF's work has been featured in 80+ newspaper and media publications across India"
        icon={<Newspaper className="text-golden-400" size={24} />}
      />

      {/* Grid */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-navy-500 text-sm">Click any clipping to view full size</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {visible.map((clip, i) => (
              <motion.div
                key={clip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedIndex(i)}
              >
                <div className="relative rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all bg-navy-50">
                  <Image
                    src={clip.src}
                    alt={clip.alt}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors" />
                  {clip.headline && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium line-clamp-2">{clip.headline}</p>
                      {clip.source && (
                        <p className="text-navy-300 text-[10px] mt-0.5">{clip.source}</p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {visibleCount < newsClippings.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="bg-navy-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-navy-700 transition-colors cursor-pointer"
              >
                Load More ({newsClippings.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        className="max-w-4xl w-full"
      >
        {selectedIndex !== null && (
          <div className="relative">
            <Image
              src={newsClippings[selectedIndex].src}
              alt={newsClippings[selectedIndex].alt}
              width={1200}
              height={900}
              className="w-full h-auto rounded-lg"
            />
            {newsClippings[selectedIndex].headline && (
              <div className="bg-navy-800 text-white p-4 rounded-b-lg -mt-1">
                <p className="font-medium text-sm">{newsClippings[selectedIndex].headline}</p>
                {newsClippings[selectedIndex].source && (
                  <p className="text-navy-300 text-xs mt-1">{newsClippings[selectedIndex].source}</p>
                )}
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-navy-800/80 text-white p-3 rounded-full hover:bg-navy-800 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-navy-800/80 text-white p-3 rounded-full hover:bg-navy-800 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute top-4 right-4 bg-navy-800/80 text-white px-3 py-1 rounded-full text-xs">
              {selectedIndex + 1} / {newsClippings.length}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
