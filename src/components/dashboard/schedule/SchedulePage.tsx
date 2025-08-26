import { useState } from "react";
import { ScheduleHeader } from "./ScheduleHeader";
import { LeftFilters } from "./LeftFilters";
import { AgendaView } from "./AgendaView";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { DayView } from "./DayView";
import { RightRail } from "./RightRail";
import { EventDialog } from "./EventDialog";
import { ExportDrawer } from "./ExportDrawer";
import { mockEvents } from "./mockData";

export type ViewType = "month" | "week" | "day" | "agenda";

export interface ScheduleFilters {
  courses: string[];
  types: string[];
  instructors: string[];
  conflictsOnly: boolean;
}

export function SchedulePage() {
  const [currentView, setCurrentView] = useState<ViewType>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<ScheduleFilters>({
    courses: [],
    types: [],
    instructors: [],
    conflictsOnly: false
  });
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isExportDrawerOpen, setIsExportDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const filteredEvents = mockEvents.filter(event => {
    if (filters.courses.length > 0 && !filters.courses.includes(event.courseId)) return false;
    if (filters.types.length > 0 && !filters.types.includes(event.type)) return false;
    if (filters.instructors.length > 0 && !filters.instructors.includes(event.instructorId)) return false;
    if (filters.conflictsOnly && !event.hasConflict) return false;
    return true;
  });

  const renderMainView = () => {
    switch (currentView) {
      case "month":
        return (
          <MonthView 
            events={filteredEvents} 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onEventClick={setSelectedEvent}
          />
        );
      case "week":
        return (
          <WeekView 
            events={filteredEvents} 
            currentDate={currentDate}
            onEventClick={setSelectedEvent}
          />
        );
      case "day":
        return (
          <DayView 
            events={filteredEvents} 
            currentDate={currentDate}
            onEventClick={setSelectedEvent}
          />
        );
      case "agenda":
        return (
          <AgendaView 
            events={filteredEvents} 
            currentDate={currentDate}
            onEventClick={setSelectedEvent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <ScheduleHeader
        currentView={currentView}
        onViewChange={setCurrentView}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onNewEvent={() => {
          setSelectedEvent(null);
          setIsEventDialogOpen(true);
        }}
        onExport={() => setIsExportDrawerOpen(true)}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftFilters 
          filters={filters}
          onFiltersChange={setFilters}
          events={mockEvents}
        />
        
        <main className="flex-1 overflow-auto modern-scrollbar">
          {renderMainView()}
        </main>
        
        <RightRail 
          events={filteredEvents}
          currentDate={currentDate}
        />
      </div>

      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => {
          setIsEventDialogOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onSave={(eventData) => {
          console.log("Save event:", eventData);
          setIsEventDialogOpen(false);
          setSelectedEvent(null);
        }}
      />

      <ExportDrawer
        isOpen={isExportDrawerOpen}
        onClose={() => setIsExportDrawerOpen(false)}
      />
    </div>
  );
}