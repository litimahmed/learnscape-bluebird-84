import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building, Users, Target, FileText, Upload, Check, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const steps = [
  {
    id: 1,
    title: 'Company Information',
    description: 'Tell us about your organization',
    icon: Building,
    fields: ['companyName', 'website', 'industry', 'size', 'location']
  },
  {
    id: 2,
    title: 'Partnership Details',
    description: 'Define your partnership goals',
    icon: Target,
    fields: ['partnershipType', 'expectedStudents', 'targetAudience', 'goals']
  },
  {
    id: 3,
    title: 'Contact & Legal',
    description: 'Contact information and documentation',
    icon: FileText,
    fields: ['contactName', 'email', 'phone', 'position', 'documents']
  }
];

const PartnerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Company Information
    companyName: '',
    website: '',
    industry: '',
    size: '',
    location: '',
    
    // Step 2: Partnership Details
    partnershipType: '',
    expectedStudents: '',
    targetAudience: '',
    goals: '',
    
    // Step 3: Contact & Legal
    contactName: '',
    email: '',
    phone: '',
    position: '',
    documents: [] as File[]
  });

  const progress = (currentStep / steps.length) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ 
        ...prev, 
        documents: [...prev.documents, ...Array.from(files)]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number) => {
    const stepFields = steps.find(s => s.id === step)?.fields || [];
    return stepFields.every(field => {
      if (field === 'documents') return true; // Documents are optional
      return formData[field as keyof typeof formData];
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 2-3 business days.",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="absolute top-8 left-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Partner Application
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our network of educational partners and help us deliver world-class learning experiences
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Step {currentStep} of {steps.length}
              </h2>
              <Badge variant="secondary" className="px-3 py-1">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            
            <Progress value={progress} className="mb-6 h-2" />
            
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                    ${currentStep >= step.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border bg-background text-muted-foreground'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-4 transition-all
                      ${currentStep > step.id ? 'bg-primary' : 'bg-border'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card className="border border-border shadow-xl">
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    {React.createElement(steps[currentStep - 1].icon, {
                      className: "w-12 h-12 text-primary"
                    })}
                  </div>
                  <CardTitle className="text-2xl font-heading">
                    {steps[currentStep - 1].title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {steps[currentStep - 1].description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  {/* Step 1: Company Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            placeholder="Enter your company name"
                            className="h-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Website *</Label>
                          <Input
                            id="website"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            placeholder="https://yourcompany.com"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label>Industry *</Label>
                          <Select 
                            value={formData.industry} 
                            onValueChange={(value) => handleInputChange('industry', value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Company Size *</Label>
                          <Select 
                            value={formData.size} 
                            onValueChange={(value) => handleInputChange('size', value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-1000">201-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location *</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="City, Country"
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Partnership Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Partnership Type *</Label>
                          <Select 
                            value={formData.partnershipType} 
                            onValueChange={(value) => handleInputChange('partnershipType', value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select partnership type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="corporate-training">Corporate Training</SelectItem>
                              <SelectItem value="education-provider">Education Provider</SelectItem>
                              <SelectItem value="content-partner">Content Partner</SelectItem>
                              <SelectItem value="technology-integration">Technology Integration</SelectItem>
                              <SelectItem value="reseller">Reseller</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Expected Students *</Label>
                          <Select 
                            value={formData.expectedStudents} 
                            onValueChange={(value) => handleInputChange('expectedStudents', value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-50">1-50 students</SelectItem>
                              <SelectItem value="51-200">51-200 students</SelectItem>
                              <SelectItem value="201-500">201-500 students</SelectItem>
                              <SelectItem value="501-1000">501-1000 students</SelectItem>
                              <SelectItem value="1000+">1000+ students</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetAudience">Target Audience *</Label>
                        <Textarea
                          id="targetAudience"
                          value={formData.targetAudience}
                          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                          placeholder="Describe your target audience (e.g., software developers, marketing professionals, students)"
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goals">Partnership Goals *</Label>
                        <Textarea
                          id="goals"
                          value={formData.goals}
                          onChange={(e) => handleInputChange('goals', e.target.value)}
                          placeholder="What do you hope to achieve through this partnership?"
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact & Legal */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Name *</Label>
                          <Input
                            id="contactName"
                            value={formData.contactName}
                            onChange={(e) => handleInputChange('contactName', e.target.value)}
                            placeholder="Full name"
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="position">Position *</Label>
                          <Input
                            id="position"
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            placeholder="Job title"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="contact@company.com"
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Upload className="w-5 h-5 text-primary" />
                          <div>
                            <Label>Supporting Documents</Label>
                            <p className="text-sm text-muted-foreground">
                              Upload company profile, certifications, or other relevant documents
                            </p>
                          </div>
                        </div>

                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                            id="documents"
                          />
                          <label htmlFor="documents" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF, DOC, JPG, PNG up to 10MB each
                            </p>
                          </label>
                        </div>

                        {formData.documents.length > 0 && (
                          <div className="space-y-2">
                            {formData.documents.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{file.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between items-center mt-8"
          >
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="h-12 px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                onClick={nextStep}
                className="h-12 px-6 bg-gradient-primary hover:opacity-90"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="h-12 px-8 bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerApplication;