import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "../components/FeaturedCouses";
import WhyChooseUs from "@/components/WhyChooseUs";
import { MusicSchoolTestimonials } from "@/components/TestimonialCards";
import { CardHoverEffect} from "@/components/CardHoverEffect";
import Instructors from "@/components/Instructors";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen  antialiased ">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <MusicSchoolTestimonials />
      <CardHoverEffect />
      <Instructors />
      <Footer />
    </main>
  );
}
