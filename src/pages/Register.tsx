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

// Validation schemas for each step
const step1Schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\+213[0-9]{9}$/, 'Numéro de téléphone invalide (+213xxxxxxxxx)'),
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
  nin: z.string().min(1, 'Numéro d\'identification nationale requis'),
  nationalIdFront: z.any(),
  nationalIdBack: z.any(),
});

const studentStep4Schema = z.object({
  educationLevel: z.string().min(1, 'Niveau d\'éducation requis'),
  institutionName: z.string().min(1, 'Nom de l\'établissement requis'),
  studentCard: z.any(),
});

const teacherStep4Schema = z.object({
  highestDegree: z.string().min(1, 'Diplôme le plus élevé requis'),
  institutionAffiliation: z.string().min(1, 'Affiliation institutionnelle requise'),
  teachingQualification: z.any(),
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
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

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

  const onSubmit = async (data: any) => {
    const finalData = { ...formData, ...data, userType };
    console.log('Registration data:', finalData);
    // Here you would typically submit to your backend
    navigate('/');
  };

  const FileUpload = ({ label, accept = "image/*,.pdf", ...props }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/40 transition-colors cursor-pointer group">
        <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
        <Input type="file" accept={accept} className="hidden" {...props} />
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
                    <Input placeholder="رقم التعريف الوطني" {...field} />
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
            {/* Left Column - Brand & Info */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20"></div>
                <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-white/15"></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-white/10"></div>
              </div>
              
              <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                <div className="mb-8">
                  <BookOpen className="h-10 w-10 mb-4" />
                  <h1 className="text-3xl font-bold mb-3">Plateforme E-Learning</h1>
                  <p className="text-lg text-white/90 leading-relaxed">
                    Rejoignez des milliers d'apprenants et d'experts dans notre écosystème éducatif
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Certificats Reconnus</h3>
                      <p className="text-white/80 text-sm">Certifications valorisées par les entreprises</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Experts Qualifiés</h3>
                      <p className="text-white/80 text-sm">Professionnels expérimentés et enseignants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Sécurisé & Conforme</h3>
                      <p className="text-white/80 text-sm">Protection maximale de vos données</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>+10K Étudiants</span>
                    <span>500+ Cours</span>
                    <span>98% Satisfaction</span>
                  </div>
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
                <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')} className="w-full">
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

                      <Button type="submit" className="w-32">
                        {currentStep === maxSteps ? (
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