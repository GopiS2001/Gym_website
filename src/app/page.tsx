import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { TrainersSection } from "@/components/sections/TrainersSection";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProgramsSection />
      <TrainersSection />
      <MembershipSection />
      <TestimonialsSection />
      <GalleryPreview />
      <CtaSection />
    </>
  );
}
