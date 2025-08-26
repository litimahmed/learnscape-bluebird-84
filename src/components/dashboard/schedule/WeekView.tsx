import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, addHours, setHours, setMinutes } from "date-fns";
import { MockEvent } from "./mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface WeekViewProps {
  events: MockEvent[];
  currentDate: Date;
  onEventClick: (event: MockEvent) => void;
}

export function WeekView({ events, currentDate, onEventClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Generate hours from 6 AM to 11 PM
  const hours = Array.from({ length: 18 }, (_, i) => i + 6);
  
  // Get current time for "now" indicator
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Filter events for the current week
  const weekEvents = events.filter(event => {
    const eventDate = event.startAt;
    return eventDate >= weekStart && eventDate <= weekEnd;
  });

  // Position events in the grid
  const getEventPosition = (event: MockEvent) => {
    const startHour = event.startAt.getHours();
    const startMinute = event.startAt.getMinutes();
    const endHour = event.endAt.getHours();
    const endMinute = event.endAt.getMinutes();
    
    const top = ((startHour - 6) * 60 + startMinute) / 60 * 4; // 4rem per hour
    const height = ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60 * 4;
    
    return { top: `${top}rem`, height: `${height}rem` };
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "live":
        return "bg-red-500 border-red-600 text-white";
      case "workshop":
        return "bg-blue-500 border-blue-600 text-white";
      case "review":
        return "bg-green-500 border-green-600 text-white";
      case "exam":
        return "bg-purple-500 border-purple-600 text-white";
      case "deadline":
        return "bg-orange-500 border-orange-600 text-white";
      default:
        return "bg-gray-500 border-gray-600 text-white";
    }
  };

  // Calculate "now" indicator position
  const getNowIndicatorPosition = () => {
    if (!isToday(currentDate)) return null;
    const position = ((currentHour - 6) * 60 + currentMinute) / 60 * 4;
    return position >= 0 && position <= 72 ? `${position}rem` : null;
  };

  const nowPosition = getNowIndicatorPosition();

  return (
    <div className="p-6">
      <Card className="overflow-hidden">
        <div className="overflow-auto modern-scrollbar" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <div className="relative">
            {/* Header with days */}
            <div className="sticky top-0 z-10 bg-background border-b border-border">
              <div className="grid grid-cols-8 gap-0">
                <div className="w-16 p-4 border-r border-border bg-muted/50">
                  <div className="text-xs text-muted-foreground">Time</div>
                </div>
                {weekDays.map((day) => (
                  <div 
                    key={day.toISOString()} 
                    className={cn(
                      "p-4 text-center border-r border-border bg-muted/50",
                      isToday(day) && "bg-primary/10"
                    )}
                  >
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {format(day, "EEE")}
                    </div>
                    <div className={cn(
                      "text-lg font-semibold mt-1",
                      isToday(day) ? "text-primary" : "text-foreground"
                    )}>
                      {format(day, "d")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time grid */}
            <div className="relative">
              {/* Grid lines and time labels */}
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 gap-0 border-b border-border/50" style={{ height: "4rem" }}>
                  <div className="w-16 p-2 border-r border-border bg-muted/30 flex items-start justify-end">
                    <span className="text-xs text-muted-foreground">
                      {format(setHours(setMinutes(new Date(), 0), hour), "h a")}
                    </span>
                  </div>
                  {weekDays.map((day) => (
                    <div 
                      key={`${day.toISOString()}-${hour}`} 
                      className={cn(
                        "border-r border-border/50 relative",
                        isToday(day) && "bg-primary/5"
                      )}
                    />
                  ))}
                </div>
              ))}

              {/* Now indicator */}
              {nowPosition && (
                <div 
                  className="absolute left-16 right-0 z-20 pointer-events-none"
                  style={{ top: nowPosition }}
                >
                  <div className="flex items-center">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-l">
                      {format(now, "h:mm a")}
                    </div>
                    <div className="flex-1 h-0.5 bg-red-500" />
                  </div>
                </div>
              )}

              {/* Events */}
              {weekDays.map((day, dayIndex) => {
                const dayEvents = weekEvents.filter(event => isSameDay(event.startAt, day));
                
                return (
                  <div
                    key={day.toISOString()}
                    className="absolute top-0 bottom-0 z-10"
                    style={{
                      left: `${(dayIndex + 1) * 12.5}%`,
                      width: "12.5%",
                      paddingLeft: "2px",
                      paddingRight: "2px"
                    }}
                  >
                    {dayEvents.map((event, eventIndex) => {
                      const position = getEventPosition(event);
                      const color = getEventColor(event.type);
                      
                      return (
                        <div
                          key={event.id}
                          className={cn(
                            "absolute left-1 right-1 rounded border-l-4 p-2 cursor-pointer shadow-sm hover:shadow-md transition-all text-xs overflow-hidden",
                            color,
                            event.hasConflict && "ring-2 ring-orange-400"
                          )}
                          style={{
                            top: position.top,
                            height: position.height,
                            zIndex: 20 + eventIndex
                          }}
                          onClick={() => onEventClick(event)}
                          title={`${event.title} - ${format(event.startAt, "h:mm a")} to ${format(event.endAt, "h:mm a")}`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="opacity-90 truncate">
                            {format(event.startAt, "h:mm a")}
                          </div>
                          {event.locationLabel && (
                            <div className="opacity-75 truncate text-xs">
                              {event.locationLabel}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-red-500 text-white">Live Session</Badge>
          <Badge className="bg-blue-500 text-white">Workshop</Badge>
          <Badge className="bg-green-500 text-white">Review</Badge>
          <Badge className="bg-purple-500 text-white">Exam</Badge>
          <Badge className="bg-orange-500 text-white">Deadline</Badge>
        </div>
      </div>
    </div>
  );
}