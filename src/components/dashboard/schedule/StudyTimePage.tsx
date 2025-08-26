import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Calendar,
  Target,
  Play,
  Pause,
  Square,
  TrendingUp,
  BookOpen,
  Brain,
  Coffee,
  BarChart3,
  Timer,
  Award,
  Flame,
  CheckCircle
} from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";

interface StudySession {
  id: string;
  subject: string;
  duration: number; // in minutes
  startTime: Date;
  endTime: Date;
  type: "focus" | "review" | "practice" | "break";
  completed: boolean;
  quality?: number; // 1-5 rating
}

interface StudyGoal {
  id: string;
  title: string;
  target: number; // hours per week
  current: number;
  deadline: Date;
  category: string;
}

export function StudyTimePage() {
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedView, setSelectedView] = useState<"today" | "week" | "month">("today");

  // Mock data
  const todaysSessions: StudySession[] = [
    {
      id: "1",
      subject: "React Advanced Patterns",
      duration: 90,
      startTime: new Date(2024, 0, 26, 9, 0),
      endTime: new Date(2024, 0, 26, 10, 30),
      type: "focus",
      completed: true,
      quality: 4
    },
    {
      id: "2",
      subject: "Database Optimization",
      duration: 60,
      startTime: new Date(2024, 0, 26, 11, 0),
      endTime: new Date(2024, 0, 26, 12, 0),
      type: "practice",
      completed: true,
      quality: 5
    },
    {
      id: "3",
      subject: "TypeScript Review",
      duration: 45,
      startTime: new Date(2024, 0, 26, 14, 0),
      endTime: new Date(2024, 0, 26, 14, 45),
      type: "review",
      completed: false
    }
  ];

  const studyGoals: StudyGoal[] = [
    {
      id: "1",
      title: "React Mastery",
      target: 20,
      current: 12.5,
      deadline: addDays(new Date(), 7),
      category: "Frontend Development"
    },
    {
      id: "2",
      title: "Database Skills",
      target: 15,
      current: 8.3,
      deadline: addDays(new Date(), 14),
      category: "Backend Development"
    },
    {
      id: "3",
      title: "System Design",
      target: 10,
      current: 3.5,
      deadline: addDays(new Date(), 21),
      category: "Architecture"
    }
  ];

  const weeklyStats = {
    totalHours: 28.5,
    focusTime: 18.2,
    averageSession: 65,
    streak: 12,
    productivity: 87
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const startSession = (session: StudySession) => {
    setCurrentSession(session);
    setIsRunning(true);
    setElapsedTime(0);
  };

  const pauseSession = () => {
    setIsRunning(!isRunning);
  };

  const stopSession = () => {
    setCurrentSession(null);
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Study Time</h1>
            </div>
            <Badge variant="secondary" className="font-medium">
              {weeklyStats.totalHours}h this week
            </Badge>
            <div className="flex items-center space-x-1 text-orange-500">
              <Flame className="w-4 h-4" />
              <span className="font-medium">{weeklyStats.streak} day streak</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="sm">
              <Target className="w-4 h-4 mr-2" />
              Set Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 min-h-0">
        {/* Left Column - Active Session & Schedule */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Active Session Timer */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-primary" />
                  <span>Focus Session</span>
                </div>
                {currentSession && (
                  <Badge variant="outline">{currentSession.type}</Badge>
                )}
              </CardTitle>
              {currentSession && (
                <CardDescription>
                  Studying: {currentSession.subject}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {currentSession ? (
                <>
                  {/* Timer Display */}
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-mono font-bold text-primary">
                      {formatTime(elapsedTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Target: {formatTime(currentSession.duration)}
                    </div>
                    <Progress 
                      value={(elapsedTime / currentSession.duration) * 100} 
                      className="w-full h-2"
                    />
                  </div>
                  
                  {/* Session Controls */}
                  <div className="flex justify-center space-x-3">
                    <Button 
                      variant={isRunning ? "secondary" : "default"} 
                      onClick={pauseSession}
                      className="min-w-24"
                    >
                      {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isRunning ? "Pause" : "Resume"}
                    </Button>
                    <Button variant="outline" onClick={stopSession}>
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Timer className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Ready to focus?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start a study session to track your progress and stay motivated.
                    </p>
                    <Button onClick={() => startSession(todaysSessions[2])}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Session
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Today's Schedule</span>
              </CardTitle>
              <CardDescription>
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysSessions.map((session, index) => (
                <div 
                  key={session.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                    session.completed ? "bg-green-50 border-green-200" : "bg-background border-border hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      session.type === "focus" && "bg-blue-500",
                      session.type === "review" && "bg-green-500",
                      session.type === "practice" && "bg-purple-500",
                      session.type === "break" && "bg-orange-500"
                    )} />
                    <div>
                      <div className="font-medium">{session.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(session.startTime, "h:mm a")} - {format(session.endTime, "h:mm a")} • {session.duration}min
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.completed ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {session.quality && (
                          <Badge variant="secondary" className="text-xs">
                            {session.quality}/5
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => startSession(session)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full mt-4">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Goals */}
        <div className="w-80 space-y-6 flex-shrink-0">
          {/* Weekly Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary">{weeklyStats.totalHours}h</div>
                  <div className="text-xs text-muted-foreground">Total Time</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{weeklyStats.focusTime}h</div>
                  <div className="text-xs text-muted-foreground">Focus Time</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">{weeklyStats.averageSession}m</div>
                  <div className="text-xs text-muted-foreground">Avg Session</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-orange-50">
                  <div className="text-2xl font-bold text-orange-600">{weeklyStats.productivity}%</div>
                  <div className="text-xs text-muted-foreground">Productivity</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal Progress</span>
                  <span className="font-medium">{weeklyStats.totalHours}/40h</span>
                </div>
                <Progress value={(weeklyStats.totalHours / 40) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Study Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Study Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studyGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{goal.title}</div>
                      <div className="text-xs text-muted-foreground">{goal.category}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((goal.current / goal.target) * 100)}%
                    </Badge>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-1.5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{goal.current}h / {goal.target}h</span>
                    <span>Due {format(goal.deadline, "MMM d")}</span>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" size="sm" className="w-full mt-4">
                <Award className="w-4 h-4 mr-2" />
                View All Goals
              </Button>
            </CardContent>
          </Card>

          {/* Study Techniques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Techniques</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Timer className="w-4 h-4 mr-2" />
                Pomodoro (25min focus)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Active Reading
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Coffee className="w-4 h-4 mr-2" />
                Spaced Repetition
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Deep Work Block
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}