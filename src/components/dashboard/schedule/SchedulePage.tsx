import { useState } from "react";
import { format, addDays, subDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockEvents } from "./mockData";
import { cn } from "@/lib/utils";

export function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const todayEvents = mockEvents.filter(event =>
    isSameDay(event.startAt, currentDate)
  );

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = direction === "next" ? addDays(currentDate, 1) : subDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.startAt, date));
  };

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate("prev")}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDate("next")}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="text-sm font-medium"
              >
                Today
              </Button>
            </div>
            
            <h1 className="text-xl font-semibold">
              {format(currentDate, "EEEE, MMMM d, yyyy")}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mr-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Live</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Workshop</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Review</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Exam</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Deadline</span>
              </div>
            </div>
            
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100%-80px)]">
        {/* Calendar */}
        <div className="w-[60%] border-r border-border p-6">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => date && setCurrentDate(date)}
            className="w-full pointer-events-auto"
            classNames={{
              months: "flex w-full",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg font-semibold",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md font-medium text-sm flex-1 p-2 text-center",
              row: "flex w-full",
              cell: "flex-1 relative p-0 text-center focus-within:relative focus-within:z-20",
              day: "h-16 w-full p-0 font-normal aria-selected:bg-accent hover:bg-accent/50 focus:bg-accent focus:text-accent-foreground cursor-pointer rounded-md transition-colors",
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground font-bold",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            components={{
              Day: ({ date, displayMonth, ...props }) => {
                const dayEvents = getEventsForDate(date);
                const hasEvents = dayEvents.length > 0;
                const isToday = isSameDay(date, new Date());
                const isSelected = isSameDay(date, currentDate);
                
                // Get primary event type for styling
                const primaryEvent = dayEvents[0];
                const eventTypeStyles = primaryEvent ? {
                  live: "bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border-t-2 border-red-400",
                  workshop: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-t-2 border-blue-400",
                  review: "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 border-t-2 border-green-400",
                  exam: "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-t-2 border-purple-400",
                  deadline: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border-t-2 border-orange-400"
                }[primaryEvent.type] : "";
                
                return (
                  <button
                    {...props}
                    className={cn(
                      "h-16 w-full p-0 font-normal cursor-pointer rounded-lg transition-all duration-200 relative overflow-hidden group border border-transparent",
                      hasEvents && eventTypeStyles,
                      hasEvents && "hover:shadow-md hover:scale-[1.02] transform",
                      !hasEvents && "hover:bg-accent/30",
                      isSelected && !hasEvents && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      isSelected && hasEvents && "ring-2 ring-primary ring-offset-1",
                      isToday && !isSelected && "bg-accent/60 font-bold"
                    )}
                    onClick={() => setCurrentDate(date)}
                  >
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
                      <span className={cn(
                        "text-sm font-medium mb-1 relative z-10",
                        isSelected && !hasEvents && "text-primary-foreground",
                        isToday && "font-bold"
                      )}>
                        {format(date, "d")}
                      </span>
                      
                      {hasEvents && (
                        <>
                          {/* Event count badge */}
                          <div className="absolute top-1 right-1 z-10">
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm",
                              primaryEvent.type === "live" && "bg-red-500 text-white",
                              primaryEvent.type === "workshop" && "bg-blue-500 text-white",
                              primaryEvent.type === "review" && "bg-green-500 text-white",
                              primaryEvent.type === "exam" && "bg-purple-500 text-white",
                              primaryEvent.type === "deadline" && "bg-orange-500 text-white"
                            )}>
                              {dayEvents.length}
                            </div>
                          </div>
                          
                          {/* Multi-event indicator bars */}
                          {dayEvents.length > 1 && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                              {dayEvents.slice(1, 4).map((event, index) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "w-1 h-2 rounded-full opacity-70",
                                    event.type === "live" && "bg-red-400",
                                    event.type === "workshop" && "bg-blue-400",
                                    event.type === "review" && "bg-green-400",
                                    event.type === "exam" && "bg-purple-400",
                                    event.type === "deadline" && "bg-orange-400"
                                  )}
                                />
                              ))}
                            </div>
                          )}
                          
                          {/* Subtle glow effect on hover */}
                          <div className={cn(
                            "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-200",
                            primaryEvent.type === "live" && "bg-red-400",
                            primaryEvent.type === "workshop" && "bg-blue-400",
                            primaryEvent.type === "review" && "bg-green-400",
                            primaryEvent.type === "exam" && "bg-purple-400",
                            primaryEvent.type === "deadline" && "bg-orange-400"
                          )} />
                        </>
                      )}
                    </div>
                  </button>
                );
              },
            }}
          />
        </div>

        {/* Events List */}
        <div className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>
                  {isSameDay(currentDate, new Date()) ? "Today's Events" : `Events for ${format(currentDate, "MMM d")}`}
                </span>
                {todayEvents.length > 0 && (
                  <Badge variant="secondary">{todayEvents.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayEvents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No events scheduled</h3>
                  <p className="text-sm">Click on a day with colored dots to see events, or create a new one.</p>
                  <Button className="mt-4" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              ) : (
                todayEvents
                  .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
                  .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors group"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                        {format(event.startAt, "h:mm a")}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-primary transition-colors">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={cn(
                          "transition-colors",
                          event.type === "live" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                          event.type === "workshop" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
                          event.type === "review" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                          event.type === "exam" && "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
                          event.type === "deadline" && "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                        )}
                      >
                        {event.type}
                      </Badge>
                      {event.hasConflict && (
                        <Badge variant="destructive">Conflict</Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}