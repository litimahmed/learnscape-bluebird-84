import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Award, TrendingUp, Globe, Clock } from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      value: "100,000+",
      label: "Active Learners",
      description: "Students worldwide",
      icon: <Users className="w-6 h-6" />
    },
    {
      value: "500+",
      label: "Expert Courses",
      description: "Across 20+ domains",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      value: "95%",
      label: "Completion Rate",
      description: "Industry leading",
      icon: <Award className="w-6 h-6" />
    },
    {
      value: "89%",
      label: "Career Growth",
      description: "Post-completion",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      value: "50+",
      label: "Countries",
      description: "Global presence",
      icon: <Globe className="w-6 h-6" />
    },
    {
      value: "24/7",
      label: "Support",
      description: "Always available",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Impact</Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Transforming Lives Through Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These numbers represent real people whose careers and lives have been 
            transformed through quality education and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;