"use client";

import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ProgramsPreview from "@/components/home/ProgramsPreview";
import StatsSection from "@/components/home/StatsSection";
import PartnersSection from "@/components/home/PartnersSection";
import NewsHighlights from "@/components/home/NewsHighlights";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ProgramsPreview />
      <StatsSection />
      <PartnersSection />
      <NewsHighlights />
      <CTABanner />
    </>
  );
}
