import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, ChevronRight, Upload, User, GraduationCap } from 'lucide-react';
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
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <Input type="file" accept={accept} className="hidden" {...props} />
        <p className="text-sm text-muted-foreground">Cliquez pour télécharger ou glissez-déposez</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max 5MB)</p>
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Créer votre compte</h1>
            <p className="text-muted-foreground text-lg">
              Rejoignez notre communauté d'apprentissage
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Étudiants
                  </CardTitle>
                  <CardDescription>
                    Accédez à des milliers de cours de qualité, suivez votre progression 
                    et obtenez des certificats reconnus.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Enseignants
                  </CardTitle>
                  <CardDescription>
                    Partagez votre expertise, créez des cours interactifs et 
                    impactez la vie de milliers d'étudiants.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">🔒 Sécurité et confidentialité</h3>
                <p className="text-sm text-muted-foreground">
                  Vos données sont protégées selon les standards internationaux. 
                  Nous respectons la réglementation algérienne sur la protection des données.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <Card>
              <CardHeader>
                <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="student">Étudiant(e)</TabsTrigger>
                    <TabsTrigger value="teacher">Enseignant(e)</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center justify-between mt-4">
                  <CardTitle>
                    Étape {currentStep} sur {maxSteps}
                  </CardTitle>
                  <div className="flex gap-1">
                    {Array.from({ length: maxSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-8 rounded-full ${
                          i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(currentStep === maxSteps ? onSubmit : onNext)}>
                    {renderStepContent()}

                    <div className="flex justify-between mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        disabled={currentStep === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Précédent
                      </Button>

                      <Button type="submit">
                        {currentStep === maxSteps ? (
                          'Créer le compte'
                        ) : (
                          <>
                            Suivant
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;