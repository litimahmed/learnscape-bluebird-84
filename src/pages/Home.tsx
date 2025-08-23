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
    <div className="bg-background relative overflow-hidden">
      {/* Professional Floating Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Primary Blob */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]" />
        
        {/* Secondary Blob */}
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/4 to-purple-500/8 rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]" />
        
        {/* Tertiary Blob */}
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-500/3 to-teal-500/6 rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite]" />
        
        {/* Quaternary Blob */}
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-gradient-to-br from-orange-500/4 to-pink-500/7 rounded-full blur-3xl animate-[float_22s_ease-in-out_infinite_reverse]" />
        
        {/* Small Accent Blobs */}
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/3 to-purple-500/5 rounded-full blur-2xl animate-[float_18s_ease-in-out_infinite]" />
        <div className="absolute top-10 right-1/3 w-40 h-40 bg-gradient-to-br from-cyan-500/4 to-blue-500/6 rounded-full blur-2xl animate-[float_28s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
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
    </div>
  );
};

export default Home;