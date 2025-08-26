import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import CareersHero from "@/components/careers/CareersHero";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";
import OpenPositions from "@/components/careers/OpenPositions";
import BenefitsSection from "@/components/careers/BenefitsSection";
import CompanyCulture from "@/components/careers/CompanyCulture";
import ApplicationProcess from "@/components/careers/ApplicationProcess";

const Careers = () => {
  const [headerFooterLoading, setHeaderFooterLoading] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'H' || event.key === 'h') {
        const newLoading = !headerFooterLoading;
        setHeaderFooterLoading(newLoading);
        
        // Dispatch custom event to Layout component
        window.dispatchEvent(new CustomEvent('toggleHeaderFooterLoading', {
          detail: { loading: newLoading }
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [headerFooterLoading]);

  const CareersSkeleton = () => (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-6 w-28 mx-auto bg-primary/30" />
          <Skeleton className="h-16 w-[500px] mx-auto bg-gradient-to-r from-muted/70 to-muted/50" />
          <Skeleton className="h-6 w-[650px] mx-auto bg-muted/50" />
        </div>
      </div>
      
      {/* Job Positions Grid Skeleton */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4 bg-muted/60" />
            <Skeleton className="h-4 w-64 mx-auto bg-muted/40" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg p-6 space-y-4 bg-card">
                <Skeleton className="h-6 w-3/4 bg-muted/60" />
                <Skeleton className="h-4 w-20 bg-primary/30" />
                <Skeleton className="h-16 w-full bg-muted/40" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 bg-muted/50 rounded-full" />
                  <Skeleton className="h-6 w-20 bg-muted/50 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full bg-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (headerFooterLoading) {
    return <CareersSkeleton />;
  }
  return (
    <>
      <Helmet>
        <title>Careers - Join Formacad | Shape Algeria's Digital Future</title>
        <meta name="description" content="Join Formacad's mission to transform education in Algeria. Explore career opportunities in tech, education, and business. Competitive benefits, professional growth, and social impact." />
        <meta name="keywords" content="careers Algeria, tech jobs Algeria, education jobs, Formacad careers, software engineer Algeria, digital transformation careers" />
        <link rel="canonical" href="/careers" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <CareersHero />
        
        {/* Why Work With Us */}
        <WhyWorkWithUs />
        
        {/* Open Positions */}
        <OpenPositions />
        
        {/* Benefits & Compensation */}
        <BenefitsSection />
        
        {/* Company Culture */}
        <CompanyCulture />
        
        {/* Application Process */}
        <ApplicationProcess />
      </div>
    </>
  );
};

export default Careers;