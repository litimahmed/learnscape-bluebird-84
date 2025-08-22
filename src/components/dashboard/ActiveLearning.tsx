import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Play,
  Clock,
  Calendar,
  ArrowRight
} from "lucide-react";

export function ActiveLearning() {
  const activeCourses = [
    {
      title: "React Fundamentals",
      nextAction: "Complete Component Lifecycle",
      progress: 75,
      timeLeft: "2h 30m",
      status: "critical",
      urgency: "Due today"
    },
    {
      title: "JavaScript Advanced",
      nextAction: "Start Async/Await Module",
      progress: 45,
      timeLeft: "4h 15m",
      status: "active",
      urgency: "Continue learning"
    }
  ];

  const todaySchedule = [
    {
      time: "2:00 PM",
      title: "React Live Session",
      type: "live",
      duration: "1h 30m"
    },
    {
      time: "4:30 PM",
      title: "JavaScript Assignment Due",
      type: "deadline",
      duration: "Submit"
    }
  ];

  const quickStudy = [
    {
      title: "React Hooks Recap",
      duration: "15 min",
      type: "review"
    },
    {
      title: "ES6 Destructuring",
      duration: "12 min",
      type: "concept"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Continue Learning */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Play className="w-5 h-5 mr-2 text-primary" />
                Continue Learning
              </CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <ArrowRight className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCourses.map((course, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.nextAction}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={course.status === "critical" ? "destructive" : "secondary"}>
                    {course.urgency}
                  </Badge>
                  <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.timeLeft} remaining
                  </span>
                  <span className="font-medium text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaySchedule.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-primary">{item.time}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
              </div>
              <Badge variant={item.type === "deadline" ? "destructive" : "default"}>
                {item.type}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Study */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            Quick Study
          </CardTitle>
          <CardDescription>15-minute learning modules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStudy.map((module, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/30 transition-colors group cursor-pointer">
              <div>
                <p className="text-sm font-medium text-foreground">{module.title}</p>
                <p className="text-xs text-muted-foreground">{module.duration} • {module.type}</p>
              </div>
              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}