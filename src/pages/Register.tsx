import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, ChevronRight, Upload, User, GraduationCap, BookOpen, Award, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Algeria-specific validation patterns
const ALGERIA_PHONE_REGEX = /^\+213[0-9]{9}$/;
const ALGERIA_NIN_REGEX = /^[0-9]{18}$/; // Algeria NIN is 18 digits

// Validation schemas for each step
const step1Schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  phone: z.string().regex(ALGERIA_PHONE_REGEX, 'Numéro de téléphone invalide (+213xxxxxxxxx)'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const step2Schema = z.object({
  fullName: z.string().min(2, 'Nom complet requis'),
  dateOfBirth: z.string().min(1, 'Date de naissance requise'),
  gender: z.enum(['male', 'female'], { required_error: 'Sexe requis' }),
  wilaya: z.string().min(1, 'Wilaya requise'),
  address: z.string().optional(),
});

const step3Schema = z.object({
  nin: z.string().regex(ALGERIA_NIN_REGEX, 'NIN doit contenir exactement 18 chiffres'),
  nationalIdFront: z.any().refine((file) => file && file.length > 0, "Carte d'identité (recto) requise"),
  nationalIdBack: z.any().refine((file) => file && file.length > 0, "Carte d'identité (verso) requise"),
});

const studentStep4Schema = z.object({
  educationLevel: z.string().min(1, 'Niveau d\'éducation requis'),
  institutionName: z.string().min(1, 'Nom de l\'établissement requis'),
  studentCard: z.any().refine((file) => file && file.length > 0, "Carte d'étudiant ou certificat de scolarité requis"),
});

const teacherStep4Schema = z.object({
  highestDegree: z.string().min(1, 'Diplôme le plus élevé requis'),
  institutionAffiliation: z.string().min(1, 'Affiliation institutionnelle requise'),
  teachingQualification: z.any().refine((file) => file && file.length > 0, "Preuve de qualification d'enseignement requise"),
});

const teacherStep5Schema = z.object({
  bio: z.string().min(10, 'Biographie requise (minimum 10 caractères)'),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
});

const finalSchema = z.object({
  agreeTerms: z.boolean().refine((val) => val === true, 'Vous devez accepter les conditions'),
  consentData: z.boolean().refine((val) => val === true, 'Vous devez accepter le traitement des données'),
});

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
  'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
  'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane'
];

const educationLevels = [
  'Lycée (Secondaire)', 'Licence (Bachelor)', 'Master', 'Doctorat', 'Formation professionnelle', 'Autre'
];

const degrees = [
  'Licence', 'Master', 'Doctorat', 'Ingénieur d\'État', 'Diplôme d\'études supérieures', 'Autre'
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxSteps = userType === 'student' ? 5 : 6;

  const form = useForm({
    resolver: zodResolver(
      currentStep === 1 ? step1Schema :
      currentStep === 2 ? step2Schema :
      currentStep === 3 ? step3Schema :
      currentStep === 4 ? (userType === 'student' ? studentStep4Schema : teacherStep4Schema) :
      currentStep === 5 ? (userType === 'teacher' ? teacherStep5Schema : finalSchema) :
      finalSchema
    ),
    mode: 'onChange',
  });

  const onNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
    form.reset();
  };

  const onBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // File upload utility function
  const uploadFile = async (file: File, fileName: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}-${fileName}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('registration-documents')
        .upload(filePath, file);
      
      if (error) {
        console.error('Upload error:', error);
        return null;
      }
      
      return filePath;
    } catch (error) {
      console.error('File upload failed:', error);
      return null;
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const finalData = { ...formData, ...data, userType };
      
      // Upload files if they exist
      const uploadPromises: Promise<{key: string, path: string | null}>[] = [];
      
      if (finalData.nationalIdFront?.[0]) {
        uploadPromises.push(
          uploadFile(finalData.nationalIdFront[0], 'national-id-front')
            .then(path => ({ key: 'national_id_front_path', path }))
        );
      }
      
      if (finalData.nationalIdBack?.[0]) {
        uploadPromises.push(
          uploadFile(finalData.nationalIdBack[0], 'national-id-back')
            .then(path => ({ key: 'national_id_back_path', path }))
        );
      }
      
      if (finalData.studentCard?.[0]) {
        uploadPromises.push(
          uploadFile(finalData.studentCard[0], 'student-card')
            .then(path => ({ key: 'student_card_path', path }))
        );
      }
      
      if (finalData.teachingQualification?.[0]) {
        uploadPromises.push(
          uploadFile(finalData.teachingQualification[0], 'teaching-qualification')
            .then(path => ({ key: 'teaching_qualification_path', path }))
        );
      }
      
      const uploadResults = await Promise.all(uploadPromises);
      
      // Prepare registration data
      const registrationData: any = {
        email: finalData.email,
        phone: finalData.phone,
        full_name: finalData.fullName,
        date_of_birth: finalData.dateOfBirth,
        gender: finalData.gender,
        wilaya: finalData.wilaya,
        address: finalData.address || null,
        nin: finalData.nin,
        user_type: finalData.userType,
      };
      
      // Add user-type specific fields
      if (userType === 'student') {
        registrationData.education_level = finalData.educationLevel;
        registrationData.institution_name = finalData.institutionName;
      } else {
        registrationData.highest_degree = finalData.highestDegree;
        registrationData.institution_affiliation = finalData.institutionAffiliation;
        registrationData.bio = finalData.bio;
        registrationData.linkedin = finalData.linkedIn || null;
        registrationData.website = finalData.website || null;
      }
      
      // Add file paths
      uploadResults.forEach(result => {
        if (result.path) {
          registrationData[result.key] = result.path;
        }
      });
      
      // Submit to database
      const { error } = await supabase
        .from('user_registrations')
        .insert([registrationData]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Inscription réussie!",
        description: "Votre demande d'inscription a été soumise avec succès.",
      });
      
      navigate('/');
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUpload = ({ label, accept = "image/*,.pdf", ...props }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/40 transition-colors cursor-pointer group relative">
        <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
        <input 
          type="file" 
          accept={accept} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          {...props} 
        />
        <p className="text-sm text-muted-foreground">Télécharger un fichier</p>
        <p className="text-xs text-muted-foreground/70 mt-1">PDF, JPG, PNG (max 5MB)</p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+213xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexe</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Homme</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Femme</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wilaya"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wilaya de résidence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une wilaya" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wilayas.map((wilaya) => (
                        <SelectItem key={wilaya} value={wilaya}>{wilaya}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Votre adresse complète" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro d'identification nationale (NIN)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="18 chiffres (ex: 123456789012345678)" 
                      maxLength={18}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FileUpload
              label="Carte d'identité nationale (recto)"
              {...form.register('nationalIdFront')}
            />
            <FileUpload
              label="Carte d'identité nationale (verso)"
              {...form.register('nationalIdBack')}
            />
          </div>
        );

      case 4:
        if (userType === 'student') {
          return (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau d'éducation actuel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institutionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'établissement</FormLabel>
                    <FormControl>
                      <Input placeholder="Université / École / Centre privé" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FileUpload
                label="Carte d'étudiant ou certificat de scolarité"
                {...form.register('studentCard')}
              />
            </div>
          );
        } else {
          return (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="highestDegree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diplôme le plus élevé obtenu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre diplôme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {degrees.map((degree) => (
                          <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institutionAffiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliation institutionnelle</FormLabel>
                    <FormControl>
                      <Input placeholder="Université, École privée, Freelance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FileUpload
                label="Preuve de qualification d'enseignement (Diplôme/Attestation/CV)"
                accept="image/*,.pdf"
                {...form.register('teachingQualification')}
              />
            </div>
          );
        }

      case 5:
        if (userType === 'teacher') {
          return (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biographie courte</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre domaine d'expertise et votre expérience..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Web personnel (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://votresite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        // Fall through to final step for students

      case 6:
      case 5: // Final step (5 for students, 6 for teachers)
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      J'accepte les conditions d'utilisation
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consentData"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Je consens au traitement de mes données personnelles
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border">
          <div className="flex min-h-[600px]">
            {/* Left Column - E-learning Background with OAuth */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
              <img
                src="/lovable-uploads/33036365-2096-4b71-813a-f70b9459d29d.png"
                alt="E-learning Illustration"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  objectPosition: "20%",
                  transform: "none !important",
                  transition: "none !important"
                }}
              />
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end w-full p-8">
                {/* OAuth buttons at the bottom - full width */}
                <div className="flex flex-col space-y-4 w-full">
                  {/* Google OAuth Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 h-14 bg-background/95 hover:bg-background border-2 shadow-lg backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium text-foreground">Continue with Google</span>
                  </Button>

                  {/* Microsoft OAuth Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 h-14 bg-background/95 hover:bg-background border-2 shadow-lg backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M0 0h11v11H0z"/>
                      <path fill="#00a4ef" d="M13 0h11v11H13z"/>
                      <path fill="#7fba00" d="M0 13h11v11H0z"/>
                      <path fill="#ffb900" d="M13 13h11v11H13z"/>
                    </svg>
                    <span className="font-medium text-foreground">Continue with Microsoft</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">Créer votre compte</h2>
                  <p className="text-muted-foreground mt-2">Commencez votre parcours d'apprentissage</p>
                </div>

                {/* User Type Tabs */}
                <Tabs value={userType} onValueChange={(value) => {
                  setUserType(value as 'student' | 'teacher');
                  setCurrentStep(1);
                  form.reset();
                }} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="student" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Étudiant(e)
                    </TabsTrigger>
                    <TabsTrigger value="teacher" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Enseignant(e)
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Étape {currentStep} sur {maxSteps}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: maxSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-6 rounded-full transition-colors ${
                          i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Form */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(currentStep === maxSteps ? onSubmit : onNext)} className="space-y-5">
                    {renderStepContent()}

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        disabled={currentStep === 1}
                        className="w-24"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Retour
                      </Button>

                      <Button type="submit" className="w-32" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            Envoi...
                          </>
                        ) : currentStep === maxSteps ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Créer
                          </>
                        ) : (
                          <>
                            Suivant
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                  Déjà inscrit?{' '}
                  <button 
                    onClick={() => navigate('/')} 
                    className="text-primary hover:underline font-medium"
                  >
                    Se connecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;