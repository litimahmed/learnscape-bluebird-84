import { useState } from "react";
import { Search, ChevronDown, Mail, Phone, MessageCircle, Book, Users, Shield, CreditCard, Settings, HelpCircle, FileText, Star, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      articles: 12,
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Account & Profile",
      description: "Manage your account settings and profile",
      articles: 8,
      color: "bg-green-500",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Questions about pricing, billing, and payments",
      articles: 15,
      color: "bg-purple-500",
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      articles: 20,
      color: "bg-orange-500",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Data protection and security information",
      articles: 6,
      color: "bg-red-500",
    },
    {
      icon: FileText,
      title: "Policies & Terms",
      description: "Legal information and platform policies",
      articles: 4,
      color: "bg-indigo-500",
    },
  ];

  const popularArticles = [
    {
      title: "How to create your first course",
      category: "Getting Started",
      views: 2500,
      helpful: 95,
    },
    {
      title: "Setting up your payment methods",
      category: "Billing & Payments",
      views: 1800,
      helpful: 92,
    },
    {
      title: "Troubleshooting video playback issues",
      category: "Technical Support",
      views: 1200,
      helpful: 88,
    },
    {
      title: "Managing your account security",
      category: "Privacy & Security",
      views: 980,
      helpful: 94,
    },
  ];

  const faqItems = [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply browse our course catalog, select the course you want, and click the 'Enroll Now' button. You'll need to create an account and complete the payment process."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund."
    },
    {
      question: "Are certificates provided upon course completion?",
      answer: "Yes, you'll receive a certificate of completion for each course you finish. Certificates can be downloaded from your dashboard and shared on professional networks."
    },
    {
      question: "How long do I have access to a course?",
      answer: "Once you enroll in a course, you have lifetime access to the content. You can revisit the materials anytime and learn at your own pace."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Absolutely! Our platform is fully responsive and works on all devices. You can also download our mobile app for the best learning experience on smartphones and tablets."
    },
    {
      question: "How do I become an instructor?",
      answer: "To become an instructor, click on 'Become a Teacher' in the header, fill out the application form, and submit your course proposal. Our team will review your application and get back to you."
    },
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@edutech.com",
      response: "Response within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      response: "Instant response",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri, 9AM-6PM EST",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How can we help you?
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Find answers to your questions, get support, and learn how to make the most of our platform
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              className="pl-12 pr-4 py-4 text-lg bg-background text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {category.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {category.articles} articles
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {article.helpful}% helpful
                      </span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      2 min read
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Still need help?</h2>
          <p className="text-center text-muted-foreground mb-12">
            Our support team is here to help you succeed
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary rounded-full">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <CardTitle>{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{option.description}</p>
                    <p className="font-semibold mb-2">{option.contact}</p>
                    <p className="text-sm text-muted-foreground">{option.response}</p>
                    <Button className="mt-4 w-full">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                  </div>
                  <Input placeholder="Subject" />
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe your issue or question..."
                  />
                  <Button className="w-full">Send Message</Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Book className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive guides and tutorials
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community Forum</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with other learners
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-muted-foreground text-sm">
                  Step-by-step video guides
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;