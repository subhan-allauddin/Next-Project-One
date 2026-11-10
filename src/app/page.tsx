import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "../components/FeaturedCouses";
import WhyChooseUs from "@/components/WhyChooseUs";
import { CardHoverEffect } from "@/components/CardHoverEffect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white antialiased overflow-x-clip">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <CardHoverEffect />
      <Footer />
    </main>
  );
}
