import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Objectifs from "@/components/Objectifs";
import SmartSearchFilter from "@/components/SmartSearchFilter";

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
    </div>
  );
};

export default Home;