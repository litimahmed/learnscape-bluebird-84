import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, Clock, MapPin, Video, Users, AlertTriangle } from "lucide-react";
import { MockEvent, mockCourses } from "./mockData";
import { cn } from "@/lib/utils";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.date({ required_error: "Start date is required" }),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.date({ required_error: "End date is required" }),
  endTime: z.string().min(1, "End time is required"),
  type: z.enum(["live", "workshop", "review", "exam", "deadline"]),
  locationType: z.enum(["online", "room", "other"]),
  locationLabel: z.string().min(1, "Location is required"),
  meetingUrl: z.string().url().optional().or(z.literal("")),
  courseId: z.string().optional(),
  instructorId: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event?: MockEvent | null;
  onSave: (eventData: EventFormData) => void;
}

export function EventDialog({ isOpen, onClose, event, onSave }: EventDialogProps) {
  const [hasConflicts, setHasConflicts] = useState(false);
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "09:00",
      endTime: "10:00",
      type: "live",
      locationType: "online",
      locationLabel: "Online",
      meetingUrl: "",
      courseId: "",
      instructorId: "",
    },
  });

  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title,
        description: event.description || "",
        startDate: event.startAt,
        startTime: format(event.startAt, "HH:mm"),
        endDate: event.endAt,
        endTime: format(event.endAt, "HH:mm"),
        type: event.type,
        locationType: event.locationType,
        locationLabel: event.locationLabel,
        meetingUrl: event.meetingUrl || "",
        courseId: event.courseId,
        instructorId: event.instructorId,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        startDate: new Date(),
        startTime: "09:00",
        endDate: new Date(),
        endTime: "10:00",
        type: "live",
        locationType: "online",
        locationLabel: "Online",
        meetingUrl: "",
        courseId: "",
        instructorId: "",
      });
    }
  }, [event, form]);

  const watchedValues = form.watch();

  // Mock conflict detection
  useEffect(() => {
    if (watchedValues.startDate && watchedValues.startTime) {
      // Simulate conflict checking logic
      const hasTimeConflict = Math.random() > 0.8; // 20% chance of conflict for demo
      setHasConflicts(hasTimeConflict);
    }
  }, [watchedValues.startDate, watchedValues.startTime, watchedValues.endDate, watchedValues.endTime]);

  const onSubmit = (data: EventFormData) => {
    onSave(data);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? "Edit Event" : "Create New Event"}
          </DialogTitle>
          <DialogDescription>
            {event ? "Update the event details below." : "Fill in the details to create a new event."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Basic Information</h4>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter event description..." 
                        className="resize-none" 
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="live">
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor("live")}>Live Session</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="workshop">
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor("workshop")}>Workshop</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="review">
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor("review")}>Review</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="exam">
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor("exam")}>Exam</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="deadline">
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor("deadline")}>Deadline</Badge>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No course</SelectItem>
                          {mockCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Date and Time */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Date & Time
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {hasConflicts && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-900/10 dark:border-orange-800">
                  <div className="flex items-center space-x-2 text-orange-800 dark:text-orange-300">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Schedule Conflict Detected</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    This event overlaps with existing events. Please adjust the time or confirm to proceed.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Location */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="locationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="online">
                            <div className="flex items-center space-x-2">
                              <Video className="h-4 w-4" />
                              <span>Online</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="room">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>Physical Room</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="other">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>Other</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Details</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchedValues.locationType === "online" && (
                <FormField
                  control={form.control}
                  name="meetingUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://meet.google.com/..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the meeting link for online sessions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className={hasConflicts ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {hasConflicts ? "Save with Conflicts" : (event ? "Update Event" : "Create Event")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}