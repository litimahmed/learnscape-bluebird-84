import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  Award,
  ArrowRight,
  MoreVertical
} from "lucide-react";
import { StatsCards } from "./StatsCards";
import { LearningProgress } from "./LearningProgress";
import { RecentActivity } from "./RecentActivity";
import { UpcomingClasses } from "./UpcomingClasses";
import { QuickActions } from "./QuickActions";

export function DashboardContent() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">
          You're doing great! Keep up the momentum and continue your learning journey.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Progress */}
          <LearningProgress />

          {/* Active Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Courses</CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "React Fundamentals",
                  instructor: "Dr. Sarah Wilson",
                  progress: 75,
                  nextLesson: "Component Lifecycle",
                  timeLeft: "2h 30m",
                  status: "in-progress"
                },
                {
                  title: "JavaScript Advanced",
                  instructor: "Prof. Michael Chen",
                  progress: 45,
                  nextLesson: "Async/Await Patterns",
                  timeLeft: "4h 15m",
                  status: "in-progress"
                },
                {
                  title: "Database Design",
                  instructor: "Dr. Emma Rodriguez",
                  progress: 90,
                  nextLesson: "Performance Optimization",
                  timeLeft: "1h 45m",
                  status: "almost-complete"
                }
              ].map((course, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <Badge variant={course.status === "almost-complete" ? "default" : "secondary"}>
                          {course.progress}% Complete
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 ml-15">
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Next: {course.nextLesson}</span>
                          <span className="text-muted-foreground flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.timeLeft}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Upcoming Classes */}
          <UpcomingClasses />

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  icon: Award,
                  title: "JavaScript Master",
                  description: "Completed all JS fundamentals",
                  date: "2 days ago",
                  color: "text-yellow-500"
                },
                {
                  icon: Target,
                  title: "Weekly Goal",
                  description: "Studied 15 hours this week",
                  date: "3 days ago",
                  color: "text-green-500"
                },
                {
                  icon: Users,
                  title: "Team Player",
                  description: "Helped 5 classmates",
                  date: "1 week ago",
                  color: "text-blue-500"
                }
              ].map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center`}>
                    <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                <ArrowRight className="w-4 h-4 mr-2" />
                View All Achievements
              </Button>
            </CardContent>
          </Card>

          {/* Study Streaks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">12</div>
                <p className="text-sm text-muted-foreground">Days in a row</p>
                <div className="flex justify-center space-x-1 mt-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${
                        i < 5 ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  2 more days to beat your record!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}