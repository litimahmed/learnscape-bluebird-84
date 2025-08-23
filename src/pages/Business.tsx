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

      {/* Use Cases */}
      <section className="section-padding bg-accent/50">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Transform Every Aspect of Your Business
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Employee Onboarding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Streamline new hire training with structured onboarding programs that ensure consistent knowledge transfer.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Automated course assignments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Interactive assessments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Skills Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upskill your workforce with cutting-edge courses in technology, leadership, and industry-specific skills.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Skill gap analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Industry certifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <Award className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Leadership Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Develop future leaders with comprehensive management and leadership development programs.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Executive coaching modules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Team building exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>360-degree feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Enterprise Pricing Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              Scalable solutions for organizations of every size
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">$19<span className="text-lg font-normal text-muted-foreground">/user/month</span></div>
                  <p className="text-muted-foreground">Perfect for small teams</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Up to 50 users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Standard integrations</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="relative border-primary">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">$39<span className="text-lg font-normal text-muted-foreground">/user/month</span></div>
                  <p className="text-muted-foreground">For growing organizations</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Up to 500 users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Custom learning paths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button className="w-full">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">Custom</div>
                  <p className="text-muted-foreground">For large organizations</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Enterprise analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>White-label options</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
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