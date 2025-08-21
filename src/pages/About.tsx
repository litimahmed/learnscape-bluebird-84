import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Heart,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Globe,
  Shield,
  Lightbulb,
  Zap,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Excellence in Education",
      description:
        "We strive to deliver the highest quality educational content and experiences, ensuring every learner achieves their full potential.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Learner-Centric Approach",
      description:
        "Our platform is designed with learners at the center, prioritizing accessibility, engagement, and personalized learning experiences.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Accessibility",
      description:
        "We believe quality education should be accessible to everyone, regardless of location, background, or circumstances.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation & Technology",
      description:
        "We continuously innovate, leveraging cutting-edge technology to enhance learning outcomes and create engaging experiences.",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Williams",
      role: "Chief Executive Officer",
      background: "Former VP of Education at Google",
      expertise: "Educational Technology, Strategic Leadership",
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      background: "Ex-Senior Engineer at Microsoft",
      expertise: "Platform Architecture, AI/ML Systems",
    },
    {
      name: "Dr. James Chen",
      role: "Head of Curriculum",
      background: "Former Dean at Stanford Online",
      expertise: "Curriculum Design, Learning Sciences",
    },
    {
      name: "Lisa Thompson",
      role: "Head of Product Design",
      background: "Former Design Lead at Adobe",
      expertise: "User Experience, Educational Design",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "LearnSpace was founded with a mission to democratize quality education through technology.",
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Launched our first MVP with 50 courses and 1,000 registered users.",
    },
    {
      year: "2022",
      title: "Major Growth",
      description: "Reached 25,000 active learners and partnered with 100+ industry experts.",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated AI-powered personalization and advanced analytics features.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to serve learners in 50+ countries with localized content.",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Active Learners", icon: <Users className="w-5 h-5" /> },
    { value: "500+", label: "Expert Instructors", icon: <Award className="w-5 h-5" /> },
    { value: "1,200+", label: "Courses", icon: <BookOpen className="w-5 h-5" /> },
    { value: "95%", label: "Success Rate", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6">About LearnSpace</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Empowering
              <span className="text-primary"> Minds</span> Through
              <span className="text-primary"> Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We're on a mission to make world-class education accessible to everyone. 
              Through cutting-edge technology and expert-designed curricula, we're 
              transforming how people learn and grow in their careers.
            </p>
            <Button size="lg" className="font-semibold">
              Join Our Mission
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Democratizing Quality Education
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our mission is to break down barriers to quality education by providing 
                accessible, engaging, and effective learning experiences that empower 
                individuals to achieve their personal and professional goals.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Assured</h3>
                  <p className="text-sm text-muted-foreground">Every course is vetted by industry experts</p>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Badge className="mb-4">Our Vision</Badge>
              <h2 className="text-4xl font-heading font-bold mb-6">
                A World Where Learning Never Stops
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We envision a future where continuous learning is seamlessly integrated 
                into everyone's life, enabling them to adapt, grow, and thrive in an 
                ever-changing world.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Innovation Driven</h3>
                  <p className="text-sm text-muted-foreground">Powered by the latest educational technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do, from product development 
              to customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Numbers That Matter
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Meet the Experts
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our diverse team brings together decades of experience in education, 
              technology, and product design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-heading font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {member.background}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {member.expertise}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Building the Future
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 pb-8 relative">
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                )}
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="text-primary-foreground font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </span>
                </div>
                <div className="flex-1 pt-2">
                  <div className="font-bold text-primary mb-1">{milestone.year}</div>
                  <h3 className="text-lg font-heading font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're a learner looking to grow, an expert wanting to teach, 
            or a partner interested in collaboration, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold">
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;