import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data
const mockEvents = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "lecture",
    startTime: "09:00",
    endTime: "10:30",
    date: "2024-08-26",
    instructor: "Dr. Sarah Johnson",
    room: "Room A-101",
    attendees: 45,
    color: "bg-primary",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals Lab",
    type: "lab",
    startTime: "11:00",
    endTime: "12:30",
    date: "2024-08-26",
    instructor: "Prof. Michael Chen",
    room: "Lab B-205",
    attendees: 25,
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "Database Design Workshop",
    type: "workshop",
    startTime: "14:00",
    endTime: "16:00",
    date: "2024-08-27",
    instructor: "Dr. Emma Wilson",
    room: "Workshop C-301",
    attendees: 30,
    color: "bg-accent",
  },
  {
    id: 4,
    title: "Machine Learning Seminar",
    type: "seminar",
    startTime: "16:30",
    endTime: "18:00",
    date: "2024-08-27",
    instructor: "Prof. David Lee",
    room: "Auditorium Main",
    attendees: 120,
    color: "bg-muted",
  },
];

const eventTypeColors = {
  lecture: "bg-primary/10 text-primary border-primary/20",
  lab: "bg-secondary/10 text-secondary border-secondary/20",
  workshop: "bg-accent/10 text-accent border-accent/20",
  seminar: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
};

export const ScheduleView = () => {
  const [selectedView, setSelectedView] = useState("week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter === "all") return true;
    return event.type === selectedFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Manage your classes and academic calendar</p>
        </div>
        
        {/* View Controls */}
        <div className="flex items-center gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="lecture">Lectures</SelectItem>
              <SelectItem value="lab">Labs</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="seminar">Seminars</SelectItem>
            </SelectContent>
          </Select>
          
          <Tabs value={selectedView} onValueChange={setSelectedView} className="bg-muted rounded-lg p-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="month" className="px-3">Month</TabsTrigger>
              <TabsTrigger value="week" className="px-3">Week</TabsTrigger>
              <TabsTrigger value="day" className="px-3">Day</TabsTrigger>
              <TabsTrigger value="agenda" className="px-3">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold text-foreground">
            August 2024
          </h2>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Today
        </Button>
      </div>

      <Tabs value={selectedView} className="space-y-6">
        {/* Week View */}
        <TabsContent value="week" className="space-y-4">
          <div className="grid grid-cols-8 gap-2">
            {/* Time column */}
            <div className="space-y-16 pt-8">
              {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((time) => (
                <div key={time} className="text-sm text-muted-foreground font-medium">
                  {time}
                </div>
              ))}
            </div>
            
            {/* Days */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={day} className="space-y-2">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground">{day}</div>
                  <div className="text-lg font-semibold">{26 + index}</div>
                </div>
                
                {/* Events for this day */}
                <div className="space-y-2 min-h-96">
                  {filteredEvents
                    .filter(event => new Date(event.date).getDay() === (index + 1) % 7)
                    .map((event) => (
                      <Card key={event.id} className="p-2 hover:shadow-md transition-shadow cursor-pointer">
                        <div className={cn("text-xs px-2 py-1 rounded text-center", event.color)}>
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="mt-1 text-sm font-medium line-clamp-2">
                          {event.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {event.room}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Month View */}
        <TabsContent value="month" className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-muted-foreground bg-muted/50 rounded-lg">
                {day}
              </div>
            ))}
            
            {/* Calendar grid */}
            {Array.from({ length: 35 }, (_, i) => {
              const date = i + 1;
              const hasEvent = filteredEvents.some(event => 
                new Date(event.date).getDate() === date
              );
              
              return (
                <div key={i} className="aspect-square p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="font-medium text-sm">{date <= 31 ? date : ""}</div>
                  {hasEvent && date <= 31 && (
                    <div className="mt-1 space-y-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Day View */}
        <TabsContent value="day" className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Time column */}
            <div className="col-span-2 space-y-8">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="text-sm text-muted-foreground font-medium">
                  {String(8 + i).padStart(2, '0')}:00
                </div>
              ))}
            </div>
            
            {/* Events column */}
            <div className="col-span-10 space-y-4 min-h-96">
              {filteredEvents.map((event, index) => (
                <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn("text-xs", eventTypeColors[event.type as keyof typeof eventTypeColors])}>
                          {event.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.room}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} students
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{event.instructor}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Agenda View */}
        <TabsContent value="agenda" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              {filteredEvents.map((event) => (
                <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="text-center min-w-16">
                      <div className="text-2xl font-bold text-primary">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn("text-xs", eventTypeColors[event.type as keyof typeof eventTypeColors])}>
                          {event.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                      <div className="text-sm text-muted-foreground mb-2">
                        {event.instructor}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.room}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} students
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">This Week</h3>
              <div className="grid gap-4">
                <Card className="p-4">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm text-muted-foreground">Total Classes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary">12</div>
                  </CardContent>
                </Card>
                
                <Card className="p-4">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm text-muted-foreground">Study Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-secondary">24</div>
                  </CardContent>
                </Card>
                
                <Card className="p-4">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm text-muted-foreground">Free Time</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-accent">8h</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};