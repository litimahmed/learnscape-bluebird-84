import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Objectifs from "@/components/Objectifs";
import SmartSearchFilter from "@/components/SmartSearchFilter";
import Testimonials from "@/components/Testimonials";

const Home = () => {
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
    </div>
  );
};

export default Home;