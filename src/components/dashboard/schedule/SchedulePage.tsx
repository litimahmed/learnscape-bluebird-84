import { useState } from "react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100%-80px)]">
        {/* Calendar */}
        <div className="w-80 border-r border-border p-4">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => date && setCurrentDate(date)}
            className="w-full pointer-events-auto"
          />
        </div>

        {/* Events List */}
        <div className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {isSameDay(currentDate, new Date()) ? "Today's Events" : `Events for ${format(currentDate, "MMM d")}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No events scheduled for this day</p>
                </div>
              ) : (
                todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-muted-foreground">
                        {format(event.startAt, "h:mm a")}
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={cn(
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