import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import DemoSection from "@/components/landing/DemoSection";
import TrustSection from "@/components/landing/TrustSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import SubscriptionLeadForm from "@/components/SubscriptionLeadForm";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DemoSection />
        <TrustSection />
        <TestimonialsSection />
        <PricingSection />
        <SubscriptionLeadForm />
      </main>
      <Footer />
    </>
  );
}
