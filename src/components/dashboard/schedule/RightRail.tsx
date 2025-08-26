import { format, isToday, isTomorrow, addDays, isBefore, isAfter } from "date-fns";
import { Calendar, Clock, Video, MapPin, Users, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MockEvent } from "./mockData";

interface RightRailProps {
  events: MockEvent[];
  currentDate: Date;
}

export function RightRail({ events, currentDate }: RightRailProps) {
  const now = new Date();
  
  // Get upcoming events (next 7 days)
  const upcomingEvents = events
    .filter(event => 
      isAfter(event.startAt, now) && 
      isBefore(event.startAt, addDays(now, 7))
    )
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
    .slice(0, 4);

  // Get today's highlights
  const todayEvents = events.filter(event => isToday(event.startAt));
  const nextEvent = upcomingEvents[0];
  const completedToday = todayEvents.filter(event => event.status === "completed").length;
  const totalToday = todayEvents.length;

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "workshop":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "review":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "exam":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "deadline":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getTimeUntilEvent = (event: MockEvent) => {
    const diffInMinutes = Math.floor((event.startAt.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 0) return "Started";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <aside className="w-80 border-l border-border bg-background space-y-6 p-6 overflow-auto modern-scrollbar">
      {/* Today's Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Today's Highlights
          </CardTitle>
          <CardDescription>Your progress and upcoming events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completed today</span>
              <span className="font-medium">{completedToday}/{totalToday}</span>
            </div>
            <Progress value={totalToday > 0 ? (completedToday / totalToday) * 100 : 0} className="h-2" />
          </div>

          {/* Next Event */}
          {nextEvent && (
            <div className="p-3 rounded-lg border border-border bg-accent/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Next Event
                </span>
                <Badge variant="outline" className="text-xs">
                  {getTimeUntilEvent(nextEvent)}
                </Badge>
              </div>
              <h4 className="font-semibold text-sm mb-1">{nextEvent.title}</h4>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {format(nextEvent.startAt, "h:mm a")}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 rounded bg-muted/50">
              <div className="text-lg font-bold text-foreground">{todayEvents.length}</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
            <div className="text-center p-2 rounded bg-muted/50">
              <div className="text-lg font-bold text-foreground">{upcomingEvents.length}</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Upcoming Classes
          </CardTitle>
          <CardDescription>Don't miss your scheduled sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No upcoming events</p>
            </div>
          ) : (
            upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className={`p-4 border rounded-lg space-y-3 transition-all duration-200 hover:shadow-sm cursor-pointer ${
                  event.hasConflict ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/10' : 'border-border hover:bg-accent/30'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">{event.title}</h4>
                      {event.hasConflict && (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <Badge variant="outline" className={`text-xs capitalize ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {isToday(event.startAt) ? "Today" : 
                       isTomorrow(event.startAt) ? "Tomorrow" : 
                       format(event.startAt, "MMM d")}
                    </div>
                    <div className="text-xs font-medium">
                      {getTimeUntilEvent(event)}
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                {event.instructor && (
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={event.instructorAvatar} alt={event.instructor} />
                      <AvatarFallback className="text-xs">
                        {event.instructor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{event.instructor}</span>
                  </div>
                )}

                {/* Session Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{format(event.startAt, "h:mm a")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {event.locationType === "online" ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      <span>{event.locationLabel}</span>
                    </div>
                  </div>

                  {event.participants && (
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} students</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Button 
                    size="sm" 
                    variant={event.hasConflict ? "default" : "outline"} 
                    className="w-full text-xs"
                  >
                    {event.locationType === "online" ? (
                      <>
                        <Video className="w-3 h-3 mr-1" />
                        Join Online
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 mr-1" />
                        View Details
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
          
          <div className="pt-2 border-t border-border">
            <Button variant="ghost" className="w-full text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Full Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}