import Hero from "@/components/Hero";
import Brands from "@/components/Brands";

const Home = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Brands Section */}
      <Brands />
    </div>
  );
};

export default Home;