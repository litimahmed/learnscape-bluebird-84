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
  Star,
  MapPin,
  Languages,
  Briefcase,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Multilingual Excellence",
      description:
        "Supporting Arabic, French, and English to ensure every Algerian learner can access quality education in their preferred language.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Local Market Focus",
      description:
        "Curriculum designed specifically for Algeria's growing tech sector and economic transformation needs.",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Alignment",
      description:
        "Direct partnership with Algerian companies and government initiatives to ensure job-ready skills training.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Learning",
      description:
        "Certified programs recognized by Algerian institutions and aligned with national digital transformation goals.",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Amina Benali",
      role: "Directrice Générale",
      background: "Ancienne Directrice pédagogique à l'USTHB",
      expertise: "Technologies Éducatives, Leadership Stratégique",
    },
    {
      name: "Karim Messaoudi",
      role: "Directeur Technique",
      background: "Ex-Ingénieur Senior chez Djezzy",
      expertise: "Architecture Plateforme, Systèmes IA/ML",
    },
    {
      name: "Dr. Yasmine Boukhalfa",
      role: "Responsable Curriculum",
      background: "Ancienne Doyenne à l'ESI Alger",
      expertise: "Conception Programmes, Sciences de l'Apprentissage",
    },
    {
      name: "Ahmed Zemmouri",
      role: "Responsable Relations Entreprises",
      background: "Ex-DRH chez Sonatrach Digital",
      expertise: "Partenariats Industrie, Insertion Professionnelle",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Création de la Plateforme",
      description: "Lancement d'EduDZ avec pour mission de démocratiser l'éducation numérique en Algérie.",
    },
    {
      year: "2022",
      title: "Partenariats Stratégiques",
      description: "Collaboration avec l'USTHB, l'ESI et plusieurs universités algériennes pour la validation des programmes.",
    },
    {
      year: "2023",
      title: "Certification Officielle",
      description: "Reconnaissance par le Ministère de l'Enseignement Supérieur et intégration dans le plan national numérique.",
    },
    {
      year: "2024",
      title: "Expansion Nationale",
      description: "Présence dans les 48 wilayas avec 15,000+ apprenants actifs et 200+ instructeurs certifiés.",
    },
    {
      year: "2025",
      title: "Innovation IA",
      description: "Intégration d'outils d'IA adaptés au contexte algérien et lancement des programmes bilingues avancés.",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Apprenants Actifs", icon: <Users className="w-5 h-5" /> },
    { value: "200+", label: "Instructeurs Certifiés", icon: <Award className="w-5 h-5" /> },
    { value: "300+", label: "Cours Spécialisés", icon: <BookOpen className="w-5 h-5" /> },
    { value: "92%", label: "Taux de Réussite", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6">À propos d'EduDZ</Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              L'Excellence Éducative
              <span className="text-primary"> Algérienne</span> Pour
              <span className="text-primary"> l'Avenir</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Première plateforme d'apprentissage numérique dédiée aux Algériens. 
              Nous développons les compétences techniques et professionnelles dont 
              l'Algérie a besoin pour sa transformation digitale et économique.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                <span>48 Wilayas</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Languages className="w-4 h-4 text-primary" />
                <span>Arabe • Français • Anglais</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Star className="w-4 h-4 text-primary" />
                <span>Certifié Ministère</span>
              </div>
            </div>
            <Button size="lg" className="font-semibold">
              Rejoindre Notre Mission
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <Badge className="mb-4">Notre Mission</Badge>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Développer les Talents Algériens
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Notre mission est de former une nouvelle génération d'Algériens qualifiés 
                dans les technologies émergentes, répondant aux besoins du marché local 
                et contribuant à l'économie numérique nationale.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Certifications Reconnues</h3>
                    <p className="text-sm text-muted-foreground">Validées par les institutions algériennes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Insertion Professionnelle</h3>
                    <p className="text-sm text-muted-foreground">Partenariats avec 50+ entreprises algériennes</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Badge className="mb-4">Notre Vision</Badge>
              <h2 className="text-4xl font-heading font-bold mb-6">
                L'Algérie Leader du Numérique
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Nous visons à faire de l'Algérie un hub technologique régional en formant 
                500,000 spécialistes IT d'ici 2030, alignés sur la stratégie nationale 
                de transformation digitale "Algérie 2030".
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Rayonnement Régional</h3>
                    <p className="text-sm text-muted-foreground">Exportation du savoir-faire algérien</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Innovation Continue</h3>
                    <p className="text-sm text-muted-foreground">R&D en technologies émergentes</p>
                  </div>
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
            <Badge className="mb-4">Nos Valeurs</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              L'Excellence à l'Algérienne
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nos valeurs fondamentales reflètent l'identité algérienne et guident 
              notre approche pédagogique et technologique.
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
            <Badge className="mb-4">Notre Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Les Chiffres de Notre Réussite
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement envers 
              l'excellence éducative en Algérie.
            </p>
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
            <Badge className="mb-4">Notre Équipe</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Des Experts Algériens
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une équipe pluridisciplinaire d'experts algériens combinant excellence 
              académique, expertise technologique et connaissance du marché local.
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
            <Badge className="mb-4">Notre Parcours</Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Construire l'Avenir Ensemble
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque étape de notre développement est guidée par notre engagement 
              envers l'excellence éducative algérienne.
            </p>
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
            Prêt à Rejoindre Notre Vision?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Que vous soyez apprenant, expert souhaitant enseigner, ou partenaire 
            intéressé par une collaboration, nous serions ravis d'échanger avec vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold">
              Commencer l'Apprentissage
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
            >
              Rejoindre l'Équipe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;