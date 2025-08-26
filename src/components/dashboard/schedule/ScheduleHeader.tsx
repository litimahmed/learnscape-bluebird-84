import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { TimezoneChip } from "./TimezoneChip";
import { ViewType } from "./SchedulePage";
import { cn } from "@/lib/utils";

interface ScheduleHeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onNewEvent: () => void;
  onExport: () => void;
}

export function ScheduleHeader({
  currentView,
  onViewChange,
  currentDate,
  onDateChange,
  onNewEvent,
  onExport
}: ScheduleHeaderProps) {
  const getDateRange = () => {
    switch (currentView) {
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "week":
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        return `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`;
      case "day":
        return format(currentDate, "EEEE, MMMM d, yyyy");
      case "agenda":
        return "Agenda View";
      default:
        return "";
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    let newDate: Date;
    
    switch (currentView) {
      case "month":
        newDate = direction === "next" 
          ? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
          : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        break;
      case "week":
        newDate = direction === "next" ? addDays(currentDate, 7) : subDays(currentDate, 7);
        break;
      case "day":
        newDate = direction === "next" ? addDays(currentDate, 1) : subDays(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }
    
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <header className="border-b border-border bg-background p-4">
      <div className="flex items-center justify-between">
        {/* Left section - Date navigation */}
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
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="text-xl font-semibold hover:bg-accent"
              >
                {getDateRange()}
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && onDateChange(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Center section - View tabs */}
        <div className="flex items-center">
          <Tabs value={currentView} onValueChange={(value) => onViewChange(value as ViewType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="month" className="text-sm">Month</TabsTrigger>
              <TabsTrigger value="week" className="text-sm">Week</TabsTrigger>
              <TabsTrigger value="day" className="text-sm">Day</TabsTrigger>
              <TabsTrigger value="agenda" className="text-sm">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-3">
          <TimezoneChip />
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            onClick={onNewEvent}
            size="sm"
            className="text-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>
    </header>
  );
}