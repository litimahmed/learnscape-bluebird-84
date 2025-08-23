import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
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
  ArrowRight,
  Quote,
  Sparkles,
  Code,
  Brain,
  Rocket,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

const About = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [currentMilestone, setCurrentMilestone] = useState(0);

  const values = [
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Multilingual Excellence",
      description: "Supporting Arabic, French, and English to ensure every Algerian learner can access quality education in their preferred language.",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Local Market Focus", 
      description: "Curriculum designed specifically for Algeria's growing tech sector and economic transformation needs.",
      color: "from-green-500/20 to-emerald-500/20",
      accent: "text-green-500"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Alignment",
      description: "Direct partnership with Algerian companies and government initiatives to ensure job-ready skills training.",
      color: "from-purple-500/20 to-pink-500/20", 
      accent: "text-purple-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Learning",
      description: "Certified programs recognized by Algerian institutions and aligned with national digital transformation goals.",
      color: "from-orange-500/20 to-red-500/20",
      accent: "text-orange-500"
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Amina Benali",
      role: "Directrice Générale", 
      background: "Ancienne Directrice pédagogique à l'USTHB",
      expertise: "Technologies Éducatives, Leadership Stratégique",
      icon: <Brain className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-600"
    },
    {
      name: "Karim Messaoudi", 
      role: "Directeur Technique",
      background: "Ex-Ingénieur Senior chez Djezzy",
      expertise: "Architecture Plateforme, Systèmes IA/ML",
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "Dr. Yasmine Boukhalfa",
      role: "Responsable Curriculum",
      background: "Ancienne Doyenne à l'ESI Alger", 
      expertise: "Conception Programmes, Sciences de l'Apprentissage",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Ahmed Zemmouri",
      role: "Responsable Relations Entreprises",
      background: "Ex-DRH chez Sonatrach Digital",
      expertise: "Partenariats Industrie, Insertion Professionnelle", 
      icon: <Rocket className="w-5 h-5" />,
      color: "from-orange-500 to-red-600"
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Création de la Plateforme",
      description: "Lancement d'EduDZ avec pour mission de démocratiser l'éducation numérique en Algérie.",
      icon: <Sparkles className="w-6 h-6" />,
      achievement: "Première plateforme algérienne dédiée à l'apprentissage numérique",
      stats: "500+ early adopters"
    },
    {
      year: "2022", 
      title: "Partenariats Stratégiques",
      description: "Collaboration avec l'USTHB, l'ESI et plusieurs universités algériennes pour la validation des programmes.",
      icon: <Globe className="w-6 h-6" />,
      achievement: "15 universités partenaires",
      stats: "5,000+ étudiants"
    },
    {
      year: "2023",
      title: "Certification Officielle", 
      description: "Reconnaissance par le Ministère de l'Enseignement Supérieur et intégration dans le plan national numérique.",
      icon: <Award className="w-6 h-6" />,
      achievement: "Certification ministérielle officielle",
      stats: "12,000+ certifiés"
    },
    {
      year: "2024",
      title: "Expansion Nationale",
      description: "Présence dans les 48 wilayas avec 15,000+ apprenants actifs et 200+ instructeurs certifiés.",
      icon: <TrendingUp className="w-6 h-6" />,
      achievement: "Couverture nationale complète", 
      stats: "15,000+ apprenants actifs"
    },
    {
      year: "2025",
      title: "Innovation IA",
      description: "Intégration d'outils d'IA adaptés au contexte algérien et lancement des programmes bilingues avancés.",
      icon: <Brain className="w-6 h-6" />,
      achievement: "IA adaptée au contexte algérien",
      stats: "Objectif: 50,000+ apprenants"
    },
  ];

  const stats = [
    { value: "15,000+", label: "Apprenants Actifs", icon: <Users className="w-5 h-5" /> },
    { value: "200+", label: "Instructeurs Certifiés", icon: <Award className="w-5 h-5" /> },
    { value: "300+", label: "Cours Spécialisés", icon: <BookOpen className="w-5 h-5" /> },
    { value: "92%", label: "Taux de Réussite", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-background overflow-hidden">
      {/* Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <Badge className="mb-6 text-lg px-6 py-2">À propos d'EduDZ</Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-heading font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="block">L'Excellence</span>
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Éducative Algérienne
              </span>
              <span className="block text-4xl md:text-5xl mt-4 text-muted-foreground font-normal">
                Pour l'Avenir Digital
              </span>
            </motion.h1>

            <motion.p 
              className="text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Première plateforme d'apprentissage numérique dédiée aux Algériens. 
              Nous développons les compétences techniques dont l'Algérie a besoin 
              pour sa transformation digitale.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                { icon: <MapPin className="w-5 h-5" />, text: "48 Wilayas", color: "from-green-500 to-emerald-500" },
                { icon: <Languages className="w-5 h-5" />, text: "Trilingue", color: "from-blue-500 to-cyan-500" },
                { icon: <Star className="w-5 h-5" />, text: "Certifié", color: "from-yellow-500 to-orange-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-lg">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                <PlayCircle className="w-5 h-5 mr-2" />
                Découvrir Notre Histoire
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Rejoindre l'Aventure
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Immersive Mission & Vision */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-heading font-black mb-8">
              Notre <span className="text-primary">Raison d'Être</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les valeurs qui nous animent et la vision qui guide notre mission
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Mission Card */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative p-12 border-0 bg-card/80 backdrop-blur-sm rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-primary to-blue-600 rounded-2xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <Badge className="mb-2 bg-primary/10 text-primary">Notre Mission</Badge>
                    <h3 className="text-3xl font-heading font-bold">
                      Développer les Talents Algériens
                    </h3>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Former une nouvelle génération d'Algériens qualifiés dans les technologies 
                  émergentes, répondant aux besoins du marché local et contribuant à 
                  l'économie numérique nationale.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Shield, title: "Certifications Reconnues", desc: "Validées par les institutions algériennes" },
                    { icon: Briefcase, title: "Insertion Professionnelle", desc: "Partenariats avec 50+ entreprises algériennes" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-background/50 transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto mt-1" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Card className="relative p-12 border-0 bg-card/80 backdrop-blur-sm rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <Badge className="mb-2 bg-purple-500/10 text-purple-600">Notre Vision</Badge>
                    <h3 className="text-3xl font-heading font-bold">
                      L'Algérie Leader du Numérique
                    </h3>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Faire de l'Algérie un hub technologique régional en formant 500,000 
                  spécialistes IT d'ici 2030, alignés sur la stratégie nationale 
                  "Algérie 2030".
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Globe, title: "Rayonnement Régional", desc: "Exportation du savoir-faire algérien" },
                    { icon: Lightbulb, title: "Innovation Continue", desc: "R&D en technologies émergentes" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-background/50 transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      <div className="p-3 bg-purple-500/10 rounded-xl">
                        <item.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto mt-1" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Values Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 text-lg px-6 py-2">Nos Valeurs</Badge>
            <h2 className="text-5xl md:text-6xl font-heading font-black mb-8">
              L'Excellence à l'<span className="text-primary">Algérienne</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nos valeurs fondamentales reflètent l'identité algérienne et guident 
              notre approche pédagogique et technologique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                <Card className="relative p-8 border-0 bg-card/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}
                      animate={{ 
                        rotate: activeCard === index ? 360 : 0,
                        scale: activeCard === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className={value.accent}>
                        {value.icon}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {value.description}
                    </p>

                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium text-primary"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: activeCard === index ? 1 : 0,
                        x: activeCard === index ? 0 : -20
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>En savoir plus</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section className="py-32 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 text-lg px-6 py-2 bg-primary/10 text-primary">Notre Impact</Badge>
            <h2 className="text-5xl md:text-6xl font-heading font-black mb-8">
              Les Chiffres de Notre <span className="text-primary">Réussite</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement envers 
              l'excellence éducative en Algérie
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative p-8 border-0 bg-card/80 backdrop-blur-sm rounded-3xl">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div 
                    className="text-4xl md:text-5xl font-heading font-black text-primary mb-3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-muted-foreground font-semibold text-lg">
                    {stat.label}
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-600 rounded-b-3xl"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Team Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/20 to-background"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 text-lg px-6 py-2">Notre Équipe</Badge>
            <h2 className="text-5xl md:text-6xl font-heading font-black mb-8">
              Des Experts <span className="text-primary">Algériens</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une équipe pluridisciplinaire d'experts algériens combinant excellence 
              académique, expertise technologique et connaissance du marché local
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative p-8 border-0 bg-card/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className={`w-full h-full bg-gradient-to-br ${member.color} rounded-full transform translate-x-8 -translate-y-8`}></div>
                  </div>
                  
                  <div className="relative z-10 flex items-start gap-6">
                    {/* Avatar */}
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {member.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <Badge className={`mb-3 bg-gradient-to-r ${member.color} text-white`}>
                        {member.role}
                      </Badge>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {member.background}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="font-medium text-primary">{member.expertise}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <motion.div
                    className="mt-6 p-4 bg-background/50 rounded-xl border-l-4 border-primary"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Quote className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm italic text-muted-foreground">
                      "Notre mission est de construire l'Algérie numérique de demain"
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 text-lg px-6 py-2">Notre Parcours</Badge>
            <h2 className="text-5xl md:text-6xl font-heading font-black mb-8">
              Construire l'Avenir <span className="text-primary">Ensemble</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chaque étape de notre développement est guidée par notre engagement 
              envers l'excellence éducative algérienne
            </p>
          </motion.div>

          {/* Timeline Navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex gap-2 p-2 bg-card/50 backdrop-blur-sm rounded-full border">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMilestone(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentMilestone === index ? 'w-8 bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-8 mb-16 relative transition-all duration-500 ${
                  currentMilestone === index ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: currentMilestone === index ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setCurrentMilestone(index)}
              >
                {/* Timeline Line */}
                {index !== milestones.length - 1 && (
                  <motion.div 
                    className="absolute left-16 top-20 w-0.5 h-24 bg-gradient-to-b from-primary/50 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                )}

                {/* Year Bubble */}
                <motion.div 
                  className={`w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0 relative cursor-pointer transition-all duration-300 ${
                    currentMilestone === index 
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white scale-110 shadow-2xl' 
                      : 'bg-card border-2 border-border hover:border-primary/50'
                  }`}
                  whileHover={{ scale: currentMilestone === index ? 1.15 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-black">{milestone.year}</div>
                    <div className="text-xs opacity-80">
                      {milestone.icon}
                    </div>
                  </div>
                  
                  {currentMilestone === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-600 blur-xl opacity-50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="flex-1"
                  animate={{ 
                    y: currentMilestone === index ? 0 : 20,
                    opacity: currentMilestone === index ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`p-8 border-0 transition-all duration-300 ${
                    currentMilestone === index 
                      ? 'bg-gradient-to-br from-card via-card/90 to-primary/5 shadow-2xl scale-105' 
                      : 'bg-card/50 hover:bg-card/80'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${
                        currentMilestone === index 
                          ? 'bg-primary text-white' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {milestone.icon}
                      </div>
                      <Badge className={currentMilestone === index ? 'bg-primary text-white' : ''}>
                        {milestone.year}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-heading font-bold mb-3">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {milestone.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium">{milestone.achievement}</span>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {milestone.stats}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-purple-700"></div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(101,84,212,0.8) 0%, rgba(59,130,246,0.8) 50%, rgba(147,51,234,0.8) 100%)",
                "linear-gradient(225deg, rgba(147,51,234,0.8) 0%, rgba(101,84,212,0.8) 50%, rgba(59,130,246,0.8) 100%)",
                "linear-gradient(45deg, rgba(101,84,212,0.8) 0%, rgba(59,130,246,0.8) 50%, rgba(147,51,234,0.8) 100%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-heading font-black mb-8 text-white"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 30px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Prêt à Rejoindre Notre <span className="text-yellow-300">Vision</span>?
            </motion.h2>
            
            <motion.p 
              className="text-2xl mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Que vous soyez apprenant, expert souhaitant enseigner, ou partenaire 
              intéressé par une collaboration, nous serions ravis d'échanger avec vous
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-6 bg-white text-primary hover:bg-white/90 font-bold shadow-2xl"
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  Commencer l'Apprentissage
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl px-12 py-6 border-2 border-white/30 text-white hover:bg-white/10 font-bold backdrop-blur-sm"
                >
                  Rejoindre l'Équipe
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Testimonial Quote */}
            <motion.div
              className="mt-16 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                <Quote className="w-8 h-8 text-yellow-300 mb-4 mx-auto" />
                <p className="text-lg italic mb-4">
                  "EduDZ a transformé ma carrière. Grâce à leurs formations adaptées 
                  au marché algérien, j'ai pu décrocher mon emploi de rêve dans la tech."
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm text-white/70">Développeuse Full-Stack, Alger</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;