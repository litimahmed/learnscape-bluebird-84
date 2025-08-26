import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Target, 
  BookOpen, 
  Award, 
  ChevronRight,
  Star,
  Calendar,
  BarChart3,
  Filter,
  Search,
  Bookmark,
  Users,
  Trophy,
  Zap,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked' | 'available';
  progress: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'reading' | 'project' | 'quiz' | 'assignment';
  skills: string[];
  instructor?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
  points: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  totalModules: number;
  completedModules: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  badge: string;
  skills: string[];
  modules: LearningModule[];
  overallProgress: number;
}

const sampleLearningPaths: LearningPath[] = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development",
    description: "Master modern web development from frontend to backend",
    category: "Web Development",
    totalModules: 24,
    completedModules: 8,
    estimatedTime: "120 hours",
    difficulty: "intermediate",
    badge: "Professional Developer",
    overallProgress: 33,
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"],
    modules: [
      {
        id: "mod-1",
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web development",
        status: "completed",
        progress: 100,
        duration: "4 hours",
        difficulty: "beginner",
        type: "video",
        skills: ["HTML", "CSS"],
        instructor: { name: "Sarah Chen", avatar: "/api/placeholder/32/32" },
        points: 100
      },
      {
        id: "mod-2", 
        title: "JavaScript ES6+ Mastery",
        description: "Deep dive into modern JavaScript features",
        status: "completed",
        progress: 100,
        duration: "8 hours",
        difficulty: "intermediate",
        type: "video",
        skills: ["JavaScript", "ES6"],
        instructor: { name: "Alex Rodriguez", avatar: "/api/placeholder/32/32" },
        points: 150
      },
      {
        id: "mod-3",
        title: "React Fundamentals",
        description: "Build dynamic user interfaces with React",
        status: "current",
        progress: 65,
        duration: "12 hours", 
        difficulty: "intermediate",
        type: "project",
        skills: ["React", "JSX", "State Management"],
        instructor: { name: "Emma Wilson", avatar: "/api/placeholder/32/32" },
        dueDate: "2024-01-15",
        points: 200
      },
      {
        id: "mod-4",
        title: "Advanced React Patterns",
        description: "Learn advanced React concepts and patterns",
        status: "available",
        progress: 0,
        duration: "10 hours",
        difficulty: "advanced",
        type: "video",
        skills: ["React", "Context API", "Custom Hooks"],
        instructor: { name: "David Kim", avatar: "/api/placeholder/32/32" },
        points: 250
      },
      {
        id: "mod-5",
        title: "Node.js Backend Development",
        description: "Build scalable server-side applications",
        status: "locked",
        progress: 0,
        duration: "15 hours",
        difficulty: "intermediate",
        type: "project",
        skills: ["Node.js", "Express", "API Design"],
        instructor: { name: "Maria Garcia", avatar: "/api/placeholder/32/32" },
        points: 300
      }
    ]
  }
];

const getStatusIcon = (status: string, progress: number) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case 'current':
      return <Play className="h-5 w-5 text-primary" />;
    case 'locked':
      return <Lock className="h-5 w-5 text-muted-foreground" />;
    default:
      return <BookOpen className="h-5 w-5 text-muted-foreground" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Play className="h-4 w-4" />;
    case 'reading':
      return <BookOpen className="h-4 w-4" />;
    case 'project':
      return <Target className="h-4 w-4" />;
    case 'quiz':
      return <Award className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'advanced':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export function ModernLearningPath() {
  const [selectedPath] = useState<LearningPath>(sampleLearningPaths[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [activeTab, setActiveTab] = useState("path");

  const filteredModules = selectedPath.modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || module.status === filterStatus;
    const matchesDifficulty = filterDifficulty === "all" || module.difficulty === filterDifficulty;
    
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const totalPoints = selectedPath.modules.reduce((sum, module) => sum + module.points, 0);
  const earnedPoints = selectedPath.modules
    .filter(module => module.status === 'completed')
    .reduce((sum, module) => sum + module.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      {/* Header Section */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {selectedPath.title}
                  </h1>
                  <p className="text-muted-foreground text-lg mt-1">{selectedPath.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="capitalize">{selectedPath.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPath.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{selectedPath.totalModules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>{earnedPoints}/{totalPoints} points</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                {selectedPath.badge}
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary mb-1">
                  {selectedPath.overallProgress}%
                </div>
                <Progress value={selectedPath.overallProgress} className="w-32 h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedPath.completedModules} of {selectedPath.totalModules} completed
                </p>
              </div>
            </div>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedPath.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="path" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Learning Path
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="path" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Learning Modules */}
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${
                      module.status === 'completed' ? 'border-l-success' :
                      module.status === 'current' ? 'border-l-primary' :
                      module.status === 'locked' ? 'border-l-muted' : 'border-l-warning'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {getStatusIcon(module.status, module.progress)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                  {module.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-3">
                                  {module.description}
                                </p>
                                
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    {getTypeIcon(module.type)}
                                    <span className="capitalize">{module.type}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{module.duration}</span>
                                  </div>
                                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(module.difficulty)}`}>
                                    {module.difficulty}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    <span>{module.points} pts</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-3">
                                {module.instructor && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={module.instructor.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {module.instructor.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{module.instructor.name}</span>
                                  </div>
                                )}
                                
                                <Button 
                                  variant={module.status === 'current' ? 'default' : 'outline'}
                                  size="sm"
                                  disabled={module.status === 'locked'}
                                  className="group-hover:shadow-md transition-all"
                                >
                                  {module.status === 'completed' ? 'Review' :
                                   module.status === 'current' ? 'Continue' :
                                   module.status === 'locked' ? 'Locked' : 'Start'}
                                  <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Progress Bar for Current Module */}
                            {module.status === 'current' && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Progress</span>
                                  <span>{module.progress}%</span>
                                </div>
                                <Progress value={module.progress} className="h-2" />
                              </div>
                            )}
                            
                            {/* Due Date for Current Module */}
                            {module.dueDate && module.status === 'current' && (
                              <div className="flex items-center gap-2 mt-3 text-xs text-warning">
                                <Calendar className="h-3 w-3" />
                                <span>Due: {module.dueDate}</span>
                              </div>
                            )}
                            
                            {/* Skills Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {module.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs px-2 py-0">
                                  {skill}
                                </Badge>
                              ))}
                              {module.skills.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0">
                                  +{module.skills.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {selectedPath.overallProgress}%
                  </div>
                  <Progress value={selectedPath.overallProgress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {selectedPath.completedModules} of {selectedPath.totalModules} modules completed
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success mb-2">
                    {earnedPoints}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {totalPoints - earnedPoints} points remaining
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning mb-2">
                    {selectedPath.estimatedTime}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total learning time
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow learners, share progress, and get help from the community.
                </p>
                <Button className="mt-4">
                  Join Discussion
                  <Users className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}