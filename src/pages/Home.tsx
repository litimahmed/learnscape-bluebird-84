import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Objectifs from "@/components/Objectifs";

const Home = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Brands Section */}
      <Brands />
      
      {/* Objectifs Section */}
      <Objectifs />
    </div>
  );
};

export default Home;