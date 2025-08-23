import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Users, 
  BarChart3, 
  Shield, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Target,
  Globe,
  HeadphonesIcon
} from "lucide-react";

const Business = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Enterprise Learning Solutions
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Scale Your Team's 
                  <span className="text-primary block">Excellence</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Advanced corporate learning platform with AI-powered analytics and personalized training paths.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Schedule Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/enterprise-hero.jpg" 
                alt="Professional team collaboration in modern office environment" 
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Section */}
      <section className="section-padding bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border-y border-border/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground">Join thousands of organizations transforming their workforce</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center space-y-3 p-6 rounded-xl bg-card/50 border border-border/30 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl lg:text-5xl font-bold text-primary group-hover:text-primary/80 transition-colors animate-fade-in">
                500<span className="text-accent">+</span>
              </div>
              <div className="text-sm font-medium text-muted-foreground">Companies Trust Us</div>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="group text-center space-y-3 p-6 rounded-xl bg-card/50 border border-border/30 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl lg:text-5xl font-bold text-primary group-hover:text-primary/80 transition-colors animate-fade-in" style={{animationDelay: "0.1s"}}>
                100<span className="text-accent">K+</span>
              </div>
              <div className="text-sm font-medium text-muted-foreground">Employees Trained</div>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="group text-center space-y-3 p-6 rounded-xl bg-card/50 border border-border/30 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl lg:text-5xl font-bold text-primary group-hover:text-primary/80 transition-colors animate-fade-in" style={{animationDelay: "0.2s"}}>
                95<span className="text-accent">%</span>
              </div>
              <div className="text-sm font-medium text-muted-foreground">Satisfaction Rate</div>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="group text-center space-y-3 p-6 rounded-xl bg-card/50 border border-border/30 hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl lg:text-5xl font-bold text-primary group-hover:text-primary/80 transition-colors animate-fade-in" style={{animationDelay: "0.3s"}}>
                50<span className="text-accent">+</span>
              </div>
              <div className="text-sm font-medium text-muted-foreground">Countries Served</div>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section className="section-padding bg-gradient-to-br from-background via-accent/5 to-background">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="h-4 w-4" />
              Enterprise-Grade Platform
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Built for Enterprise Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive learning infrastructure designed to scale with your organization's growth and compliance requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skills Assessment & Analytics */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Skills Gap Analytics</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  AI-powered assessment identifies skill gaps, benchmarks performance, and recommends targeted learning interventions for maximum ROI.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Real-time competency mapping
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Predictive learning analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Compliance Management */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Compliance Automation</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Automated compliance tracking with industry-specific certifications, audit trails, and regulatory reporting capabilities.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    SOC 2 & GDPR compliance
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Automated audit reports
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* HRIS Integration */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">HRIS Integration</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Seamless integration with Workday, SAP SuccessFactors, BambooHR, and 50+ HR systems for unified employee development.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Single sign-on (SSO)
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Automated user provisioning
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Advanced ROI Analytics */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">ROI Measurement</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Quantify training impact with advanced analytics measuring productivity gains, retention rates, and business performance metrics.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Business impact dashboards
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Cost-per-outcome tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* White-Label Solution */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">White-Label Platform</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Fully customizable platform with your branding, domain, and corporate identity for seamless employee experience.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Custom domain & SSL
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Brand theme customization
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enterprise Security */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <HeadphonesIcon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Bank-grade security with end-to-end encryption, multi-factor authentication, and dedicated cloud infrastructure.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    256-bit encryption
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    ISO 27001 certified
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Use Cases */}
      <section className="section-padding bg-gradient-to-br from-accent/10 via-background to-primary/5">
        <div className="container-custom">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Building2 className="h-4 w-4" />
              Enterprise Solutions
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Transforming Business Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Strategic learning initiatives that drive measurable business outcomes across your organization
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Digital Transformation</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Accelerate technology adoption and digital literacy across your workforce with structured change management programs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Technology Adoption Programs</div>
                      <div className="text-xs text-muted-foreground">Cloud migration, AI tools, automation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Change Management Training</div>
                      <div className="text-xs text-muted-foreground">Agile methodologies, process optimization</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Digital Skills Assessment</div>
                      <div className="text-xs text-muted-foreground">Competency mapping and gap analysis</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Leadership Excellence</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Develop future leaders with comprehensive management training and succession planning programs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Executive Development</div>
                      <div className="text-xs text-muted-foreground">C-suite readiness, strategic thinking</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Manager Effectiveness</div>
                      <div className="text-xs text-muted-foreground">Team leadership, performance management</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Succession Planning</div>
                      <div className="text-xs text-muted-foreground">Talent pipeline development</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Drive measurable performance improvements through skills-based training aligned with business objectives.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Sales Excellence Programs</div>
                      <div className="text-xs text-muted-foreground">Revenue growth, customer success</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Operational Efficiency</div>
                      <div className="text-xs text-muted-foreground">Process improvement, quality management</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">Customer Experience</div>
                      <div className="text-xs text-muted-foreground">Service excellence, retention strategies</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="section-padding bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative">
          <div className="text-center space-y-8 mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold text-sm">Investment in Excellence</span>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your Organization
                <span className="block text-primary">Starting Today</span>
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Choose the perfect plan to unlock your team's potential with enterprise-grade learning infrastructure
              </p>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>30-day money back</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Growth Plan */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl bg-card/50 backdrop-blur-sm hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
              
              <CardHeader className="relative pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Best for SMBs
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Growth</CardTitle>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">$29</span>
                    <span className="text-lg text-muted-foreground">/user/month</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">Perfect for growing teams ready to scale their learning initiatives</p>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Up to 100 Users</div>
                      <div className="text-sm text-muted-foreground">Perfect team size for scaling organizations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Advanced Analytics</div>
                      <div className="text-sm text-muted-foreground">Learning progress, engagement metrics</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Custom Learning Paths</div>
                      <div className="text-sm text-muted-foreground">Personalized skill development journeys</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Priority Support</div>
                      <div className="text-sm text-muted-foreground">24/5 email and chat support</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">API Integration</div>
                      <div className="text-sm text-muted-foreground">Connect with your existing tools</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors" size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">14-day free trial, no credit card required</p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Plan - Featured */}
            <Card className="group relative overflow-hidden border-primary/50 hover:border-primary transition-all duration-500 hover:shadow-2xl bg-card/70 backdrop-blur-sm hover:scale-105 ring-2 ring-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-accent"></div>
              
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 text-sm font-semibold shadow-lg">
                  <Award className="h-4 w-4 mr-2" />
                  Most Popular
                </Badge>
              </div>
              
              <CardHeader className="relative pb-8 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                    Enterprise Ready
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Professional</CardTitle>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">$59</span>
                    <span className="text-lg text-muted-foreground">/user/month</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">Comprehensive solution for established organizations driving transformation</p>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Up to 1,000 Users</div>
                      <div className="text-sm text-muted-foreground">Scale across departments and divisions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Skills Gap Analytics</div>
                      <div className="text-sm text-muted-foreground">AI-powered competency mapping</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Compliance Management</div>
                      <div className="text-sm text-muted-foreground">Automated tracking and reporting</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">HRIS Integration</div>
                      <div className="text-sm text-muted-foreground">SSO and automated provisioning</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">ROI Measurement</div>
                      <div className="text-sm text-muted-foreground">Business impact dashboards</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Dedicated Success Manager</div>
                      <div className="text-sm text-muted-foreground">Strategic guidance and optimization</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-primary/20">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all" size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">30-day free trial with full feature access</p>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="group relative overflow-hidden border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl bg-card/50 backdrop-blur-sm hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary"></div>
              
              <CardHeader className="relative pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    Custom Solution
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Enterprise</CardTitle>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">Custom</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">Tailored infrastructure for global organizations with complex requirements</p>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Unlimited Users</div>
                      <div className="text-sm text-muted-foreground">Global deployment across all locations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">White-Label Platform</div>
                      <div className="text-sm text-muted-foreground">Full brand customization and domain</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Enterprise Security</div>
                      <div className="text-sm text-muted-foreground">SOC 2, GDPR, ISO 27001 compliance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Custom Integrations</div>
                      <div className="text-sm text-muted-foreground">Bespoke connectors and workflows</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">24/7 Premium Support</div>
                      <div className="text-sm text-muted-foreground">Dedicated team with SLA guarantees</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Strategic Consulting</div>
                      <div className="text-sm text-muted-foreground">Learning transformation advisory</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10 group-hover:border-accent transition-colors" size="lg">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">Custom pricing based on your requirements</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Value Props */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-3">
                <HeadphonesIcon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Expert Support</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Global Scale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Transform Your Training?
              </h2>
              <p className="text-xl text-muted-foreground">
                Get in touch with our team to discuss your organization's learning needs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Why Choose Our Platform?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Proven Results</div>
                        <div className="text-muted-foreground text-sm">95% customer satisfaction rate</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Enterprise Security</div>
                        <div className="text-muted-foreground text-sm">SOC 2 compliant with end-to-end encryption</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Seamless Integration</div>
                        <div className="text-muted-foreground text-sm">Works with your existing tools and workflows</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-semibold mb-2">Need immediate assistance?</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our enterprise team is available to help you get started
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>📧 enterprise@example.com</div>
                    <div>📞 +1 (555) 123-4567</div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Request Enterprise Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employees">Number of Employees</Label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        required
                      >
                        <option value="">Select range</option>
                        <option value="1-50">1-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-1000">201-1000</option>
                        <option value="1000+">1000+</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your training needs</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Describe your current training challenges and goals..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Request Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;