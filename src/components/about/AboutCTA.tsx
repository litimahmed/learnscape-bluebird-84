import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen } from "lucide-react";

const AboutCTA = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Whether you're looking to advance your career, share your expertise, or partner with us, 
            we're excited to have you join our mission of transforming education worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="group font-semibold"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 group font-semibold"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Our Team
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/80 mb-4">
              Want to learn more about our impact and initiatives?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Button variant="link" className="text-primary-foreground/90 hover:text-primary-foreground p-0">
                Read Our Annual Report
              </Button>
              <span className="hidden sm:inline text-primary-foreground/40">•</span>
              <Button variant="link" className="text-primary-foreground/90 hover:text-primary-foreground p-0">
                Explore Our Research
              </Button>
              <span className="hidden sm:inline text-primary-foreground/40">•</span>
              <Button variant="link" className="text-primary-foreground/90 hover:text-primary-foreground p-0">
                Contact Leadership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;