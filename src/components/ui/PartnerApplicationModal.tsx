import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Progress } from "./progress";
import { Badge } from "./badge";
import { ScrollArea } from "./scroll-area";
import { 
  Building2, 
  Users, 
  Target, 
  FileText, 
  CheckCircle, 
  Upload,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Globe,
  DollarSign,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnerApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  // Company Information
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  yearEstablished: string;
  
  // Contact Details
  contactName: string;
  position: string;
  email: string;
  phone: string;
  
  // Partnership Details
  partnershipType: string;
  expectedRevenue: string;
  targetMarkets: string;
  projectTimeline: string;
  
  // Additional Information
  experience: string;
  goals: string;
  resources: string;
}

const STEPS = [
  {
    id: 1,
    title: "Company Info",
    icon: Building2,
    description: "Tell us about your company"
  },
  {
    id: 2,
    title: "Contact Details",
    icon: Users,
    description: "How can we reach you?"
  },
  {
    id: 3,
    title: "Partnership",
    icon: Target,
    description: "Define our collaboration"
  },
  {
    id: 4,
    title: "Documentation",
    icon: FileText,
    description: "Upload supporting documents"
  },
  {
    id: 5,
    title: "Review",
    icon: CheckCircle,
    description: "Confirm your application"
  }
];

export function PartnerApplicationModal({ open, onOpenChange }: PartnerApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    yearEstablished: "",
    contactName: "",
    position: "",
    email: "",
    phone: "",
    partnershipType: "",
    expectedRevenue: "",
    targetMarkets: "",
    projectTimeline: "",
    experience: "",
    goals: "",
    resources: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      yearEstablished: "",
      contactName: "",
      position: "",
      email: "",
      phone: "",
      partnershipType: "",
      expectedRevenue: "",
      targetMarkets: "",
      projectTimeline: "",
      experience: "",
      goals: "",
      resources: "",
    });
    setUploadedFiles([]);
    setIsSubmitted(false);
    onOpenChange(false);
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold mb-4"
              >
                Application Submitted Successfully!
              </motion.h3>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                Thank you for your interest in partnering with us. Our team will review your application and get back to you within 2-3 business days.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button onClick={resetForm} className="min-w-32">
                  Close
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <DialogHeader className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">Partner Application</DialogTitle>
                    <DialogDescription>
                      Join our ecosystem of successful partners
                    </DialogDescription>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Step {currentStep} of {STEPS.length}
                    </span>
                    <span className="font-medium">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                {/* Step Indicators */}
                <div className="flex items-center justify-between mt-4">
                  {STEPS.map((step, index) => (
                    <div
                      key={step.id}
                      className={cn(
                        "flex flex-col items-center gap-1 text-xs",
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                          currentStep >= step.id
                            ? "border-primary bg-primary text-white"
                            : "border-muted bg-background"
                        )}
                      >
                        <step.icon className="w-4 h-4" />
                      </div>
                      <span className="hidden sm:block font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </DialogHeader>

              {/* Form Content */}
              <ScrollArea className="flex-1 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-primary" />
                          Company Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Company Name *
                            </label>
                            <Input
                              value={formData.companyName}
                              onChange={(e) => updateFormData("companyName", e.target.value)}
                              placeholder="Enter your company name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Website
                            </label>
                            <Input
                              value={formData.website}
                              onChange={(e) => updateFormData("website", e.target.value)}
                              placeholder="https://yourcompany.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Industry *
                            </label>
                            <Input
                              value={formData.industry}
                              onChange={(e) => updateFormData("industry", e.target.value)}
                              placeholder="e.g., Technology, Finance, Healthcare"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Company Size
                            </label>
                            <Input
                              value={formData.companySize}
                              onChange={(e) => updateFormData("companySize", e.target.value)}
                              placeholder="e.g., 1-10, 11-50, 51-200, 200+"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Year Established
                            </label>
                            <Input
                              value={formData.yearEstablished}
                              onChange={(e) => updateFormData("yearEstablished", e.target.value)}
                              placeholder="e.g., 2020"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Contact Name *
                            </label>
                            <Input
                              value={formData.contactName}
                              onChange={(e) => updateFormData("contactName", e.target.value)}
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Position/Title *
                            </label>
                            <Input
                              value={formData.position}
                              onChange={(e) => updateFormData("position", e.target.value)}
                              placeholder="e.g., CEO, CTO, Business Development"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Email Address *
                            </label>
                            <Input
                              value={formData.email}
                              onChange={(e) => updateFormData("email", e.target.value)}
                              placeholder="your@email.com"
                              type="email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Phone Number
                            </label>
                            <Input
                              value={formData.phone}
                              onChange={(e) => updateFormData("phone", e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              type="tel"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Target className="w-5 h-5 text-primary" />
                          Partnership Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Partnership Type *
                            </label>
                            <Input
                              value={formData.partnershipType}
                              onChange={(e) => updateFormData("partnershipType", e.target.value)}
                              placeholder="e.g., Reseller, Technology, Strategic"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Expected Annual Revenue
                            </label>
                            <Input
                              value={formData.expectedRevenue}
                              onChange={(e) => updateFormData("expectedRevenue", e.target.value)}
                              placeholder="e.g., $100K - $500K"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Target Markets
                            </label>
                            <Input
                              value={formData.targetMarkets}
                              onChange={(e) => updateFormData("targetMarkets", e.target.value)}
                              placeholder="e.g., North America, Europe, SMBs"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Project Timeline
                            </label>
                            <Input
                              value={formData.projectTimeline}
                              onChange={(e) => updateFormData("projectTimeline", e.target.value)}
                              placeholder="e.g., 3-6 months, 1 year"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Previous Experience & Expertise
                            </label>
                            <Textarea
                              value={formData.experience}
                              onChange={(e) => updateFormData("experience", e.target.value)}
                              placeholder="Tell us about your relevant experience and expertise..."
                              className="min-h-20"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Partnership Goals
                            </label>
                            <Textarea
                              value={formData.goals}
                              onChange={(e) => updateFormData("goals", e.target.value)}
                              placeholder="What do you hope to achieve through this partnership?"
                              className="min-h-20"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          Supporting Documentation
                        </h3>
                        <p className="text-muted-foreground">
                          Upload any relevant documents (company profile, portfolio, certifications, etc.)
                        </p>
                        
                        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer text-primary hover:text-primary/80 font-medium"
                          >
                            Click to upload files
                          </label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Supported formats: PDF, DOC, PPT, JPG, PNG (Max 10MB each)
                          </p>
                        </div>

                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium">Uploaded Files:</h4>
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="w-4 h-4 text-primary" />
                                  <span className="text-sm">{file.name}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Additional Resources or Comments
                          </label>
                          <Textarea
                            value={formData.resources}
                            onChange={(e) => updateFormData("resources", e.target.value)}
                            placeholder="Any additional information you'd like to share..."
                            className="min-h-20"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          Review Your Application
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Company Information
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Name:</strong> {formData.companyName || "Not provided"}</div>
                                <div><strong>Website:</strong> {formData.website || "Not provided"}</div>
                                <div><strong>Industry:</strong> {formData.industry || "Not provided"}</div>
                                <div><strong>Size:</strong> {formData.companySize || "Not provided"}</div>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Contact Information
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Name:</strong> {formData.contactName || "Not provided"}</div>
                                <div><strong>Position:</strong> {formData.position || "Not provided"}</div>
                                <div><strong>Email:</strong> {formData.email || "Not provided"}</div>
                                <div><strong>Phone:</strong> {formData.phone || "Not provided"}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Partnership Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Type:</strong> {formData.partnershipType || "Not provided"}</div>
                                <div><strong>Expected Revenue:</strong> {formData.expectedRevenue || "Not provided"}</div>
                                <div><strong>Target Markets:</strong> {formData.targetMarkets || "Not provided"}</div>
                                <div><strong>Timeline:</strong> {formData.projectTimeline || "Not provided"}</div>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Documentation
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Files:</strong> {uploadedFiles.length} uploaded</div>
                                {uploadedFiles.length > 0 && (
                                  <div className="text-xs text-muted-foreground">
                                    {uploadedFiles.map(f => f.name).join(", ")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <h4 className="font-medium mb-2 text-primary">What happens next?</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Our team will review your application within 2-3 business days</li>
                            <li>• You'll receive an email confirmation with next steps</li>
                            <li>• We may schedule a call to discuss the partnership in detail</li>
                            <li>• Upon approval, we'll send partnership documentation</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </ScrollArea>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t bg-muted/20">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-3">
                  {currentStep < STEPS.length ? (
                    <Button
                      onClick={nextStep}
                      className="flex items-center gap-2 min-w-24"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 min-w-32"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}