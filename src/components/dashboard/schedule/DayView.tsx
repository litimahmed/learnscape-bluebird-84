import { format, isSameDay, isToday, setHours, setMinutes } from "date-fns";
import { Clock, MapPin, Video, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MockEvent } from "./mockData";
import { cn } from "@/lib/utils";

interface DayViewProps {
  events: MockEvent[];
  currentDate: Date;
  onEventClick: (event: MockEvent) => void;
}

export function DayView({ events, currentDate, onEventClick }: DayViewProps) {
  // Filter events for the selected day
  const dayEvents = events
    .filter(event => isSameDay(event.startAt, currentDate))
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime());

  // Generate time slots (6 AM to 11 PM)
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = i + 6;
    return setMinutes(setHours(new Date(), hour), 0);
  });

  // Current time for "now" indicator
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const getEventColor = (type: string) => {
    switch (type) {
      case "live":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/10";
      case "workshop":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10";
      case "review":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/10";
      case "exam":
        return "border-l-purple-500 bg-purple-50 dark:bg-purple-900/10";
      case "deadline":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10";
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/10";
    }
  };

  const getTypeColor = (type: string) => {
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

  const getEventForTimeSlot = (time: Date) => {
    return dayEvents.find(event => {
      const eventHour = event.startAt.getHours();
      const slotHour = time.getHours();
      return eventHour === slotHour;
    });
  };

  const isCurrentTimeSlot = (time: Date) => {
    return isToday(currentDate) && currentHour === time.getHours();
  };

  if (dayEvents.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events scheduled</h3>
              <p className="text-muted-foreground mb-4">
                You have no events scheduled for {format(currentDate, "EEEE, MMMM d, yyyy")}
              </p>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {format(currentDate, "EEEE, MMMM d, yyyy")}
        </h2>
        <p className="text-muted-foreground">
          {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"} scheduled
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {timeSlots.map((time) => {
                const event = getEventForTimeSlot(time);
                const isCurrent = isCurrentTimeSlot(time);
                
                return (
                  <div
                    key={time.toISOString()}
                    className={cn(
                      "flex items-center space-x-3 p-2 rounded-lg",
                      isCurrent && "bg-primary/10 border border-primary/20",
                      event && "bg-accent/50"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium w-16",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}>
                      {format(time, "h:mm a")}
                    </div>
                    {event && (
                      <div className="flex-1">
                        <div className="text-sm font-medium truncate">{event.title}</div>
                        <Badge className={`text-xs capitalize ${getTypeColor(event.type)}`}>
                          {event.type}
                        </Badge>
                      </div>
                    )}
                    {isCurrent && !event && (
                      <div className="flex-1">
                        <div className="text-sm text-primary font-medium">Now</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Events Details */}
        <div className="lg:col-span-3 space-y-4">
          {dayEvents.map((event) => (
            <Card 
              key={event.id}
              className={cn(
                "border-l-4 cursor-pointer hover:shadow-md transition-all duration-200",
                getEventColor(event.type),
                event.hasConflict && "ring-2 ring-orange-400"
              )}
              onClick={() => onEventClick(event)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Event header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                          {event.hasConflict && (
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`capitalize ${getTypeColor(event.type)}`}>
                            {event.type}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={event.status === "live" ? "bg-red-500 text-white" : ""}
                          >
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(event.startAt, "h:mm a")} - {format(event.endAt, "h:mm a")}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          {event.locationType === "online" ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <MapPin className="h-4 w-4" />
                          )}
                          <span>{event.locationLabel}</span>
                        </div>

                        {event.participants && (
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.participants} students</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {event.instructor && (
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={event.instructorAvatar} alt={event.instructor} />
                              <AvatarFallback className="text-xs">
                                {event.instructor.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{event.instructor}</span>
                          </div>
                        )}

                        {event.courseName && (
                          <div>
                            <Badge variant="secondary" className="text-xs">
                              {event.courseName}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {event.description && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="ml-4 flex flex-col space-y-2">
                    {event.meetingUrl && event.status === "scheduled" && (
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                    )}
                    {event.type === "deadline" && (
                      <Button size="sm" variant="outline">
                        Submit
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}