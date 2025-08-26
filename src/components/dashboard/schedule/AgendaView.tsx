import { format, isSameDay, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";
import { Calendar, Clock, Video, MapPin, Users, AlertCircle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MockEvent } from "./mockData";

interface AgendaViewProps {
  events: MockEvent[];
  currentDate: Date;
  onEventClick: (event: MockEvent) => void;
}

export function AgendaView({ events, currentDate, onEventClick }: AgendaViewProps) {
  // Group events by date
  const groupedEvents = events.reduce((groups, event) => {
    const dateKey = format(event.startAt, "yyyy-MM-dd");
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {} as Record<string, MockEvent[]>);

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d");
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
      case "workshop":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
      case "review":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
      case "exam":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
      case "deadline":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      case "canceled":
        return "bg-gray-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  if (sortedDates.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            No events match your current filters. Try adjusting your search criteria.
          </p>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View All Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {sortedDates.map((dateStr) => {
        const date = parseISO(dateStr);
        const dayEvents = groupedEvents[dateStr].sort(
          (a, b) => a.startAt.getTime() - b.startAt.getTime()
        );

        return (
          <div key={dateStr} className="space-y-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-foreground">
                {getDateLabel(dateStr)}
              </h3>
              <div className="h-px bg-border flex-1" />
              <span className="text-sm text-muted-foreground">
                {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
              </span>
            </div>

            <div className="space-y-3">
              {dayEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                    event.hasConflict ? "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/10" : ""
                  }`}
                  onClick={() => onEventClick(event)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 space-y-2">
                        {/* Event header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-foreground">{event.title}</h4>
                              {event.hasConflict && (
                                <AlertCircle className="h-4 w-4 text-orange-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs capitalize ${getEventTypeColor(event.type)}`}
                              >
                                {event.type}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getStatusColor(event.status)}`}
                              >
                                {event.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Event details */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {format(event.startAt, "h:mm a")} - {format(event.endAt, "h:mm a")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {event.locationType === "online" ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <MapPin className="h-4 w-4" />
                              )}
                              <span>{event.locationLabel}</span>
                            </div>
                            {event.participants && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{event.participants} students</span>
                              </div>
                            )}
                          </div>

                          {event.instructor && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={event.instructorAvatar} alt={event.instructor} />
                                <AvatarFallback className="text-xs">
                                  {event.instructor.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-muted-foreground">{event.instructor}</span>
                            </div>
                          )}

                          {event.courseName && (
                            <div className="text-sm">
                              <Badge variant="secondary" className="text-xs">
                                {event.courseName}
                              </Badge>
                            </div>
                          )}

                          {event.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col space-y-2">
                        {event.meetingUrl && event.status === "scheduled" && (
                          <Button size="sm" className="text-xs">
                            <Video className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                        )}
                        {event.type === "deadline" && (
                          <Button size="sm" variant="outline" className="text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Submit
                          </Button>
                        )}
                        {event.status === "completed" && (
                          <Button size="sm" variant="outline" className="text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}