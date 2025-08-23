import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Objectifs from "@/components/Objectifs";
import SmartSearchFilter from "@/components/SmartSearchFilter";
import Testimonials from "@/components/Testimonials";
import AppMobile from "@/components/AppMobile";
import NewsLetter from "@/components/NewsLetter";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const shouldOpenLogin = searchParams.get('login') === 'true';
    if (shouldOpenLogin) {
      // Dispatch a custom event to trigger login modal
      window.dispatchEvent(new CustomEvent('openLoginModal'));
      // Remove the login parameter from URL
      setSearchParams(new URLSearchParams());
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Brands Section */}
      <Brands />
      
      {/* Objectifs Section */}
      <Objectifs />
      
      {/* Smart Search Filter Section */}
      <SmartSearchFilter />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* App Mobile Section */}
      <AppMobile />
      
      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
};

export default Home;