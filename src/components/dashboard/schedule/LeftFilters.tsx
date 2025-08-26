import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScheduleFilters } from "./SchedulePage";

interface LeftFiltersProps {
  filters: ScheduleFilters;
  onFiltersChange: (filters: ScheduleFilters) => void;
  events: any[];
}

export function LeftFilters({ filters, onFiltersChange, events }: LeftFiltersProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Extract unique values from events for filter options
  const courses = [...new Set(events.map(e => e.courseName).filter(Boolean))];
  const types = [...new Set(events.map(e => e.type))];
  const instructors = [...new Set(events.map(e => e.instructor).filter(Boolean))];

  const typeColors: Record<string, string> = {
    live: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    review: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    exam: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    deadline: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
  };

  const toggleCourse = (course: string) => {
    const newCourses = filters.courses.includes(course)
      ? filters.courses.filter(c => c !== course)
      : [...filters.courses, course];
    onFiltersChange({ ...filters, courses: newCourses });
  };

  const toggleType = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const toggleInstructor = (instructor: string) => {
    const newInstructors = filters.instructors.includes(instructor)
      ? filters.instructors.filter(i => i !== instructor)
      : [...filters.instructors, instructor];
    onFiltersChange({ ...filters, instructors: newInstructors });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      courses: [],
      types: [],
      instructors: [],
      conflictsOnly: false
    });
  };

  const hasActiveFilters = filters.courses.length > 0 || filters.types.length > 0 || 
                          filters.instructors.length > 0 || filters.conflictsOnly;

  if (isCollapsed) {
    return (
      <div className="w-12 border-r border-border bg-background p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="w-full p-2"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <aside className="w-80 border-r border-border bg-background">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground"
                >
                  Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(true)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Course Filters */}
          <div>
            <h4 className="font-medium mb-3">Courses</h4>
            <div className="space-y-2">
              {courses.map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox
                    id={`course-${course}`}
                    checked={filters.courses.includes(course)}
                    onCheckedChange={() => toggleCourse(course)}
                  />
                  <label
                    htmlFor={`course-${course}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {course}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Type Filters */}
          <div>
            <h4 className="font-medium mb-3">Event Types</h4>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant={filters.types.includes(type) ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    filters.types.includes(type) ? "" : typeColors[type] || ""
                  }`}
                  onClick={() => toggleType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Instructor Filters */}
          <div>
            <h4 className="font-medium mb-3">Instructors</h4>
            <div className="space-y-2">
              {instructors.map((instructor) => (
                <div key={instructor} className="flex items-center space-x-2">
                  <Checkbox
                    id={`instructor-${instructor}`}
                    checked={filters.instructors.includes(instructor)}
                    onCheckedChange={() => toggleInstructor(instructor)}
                  />
                  <label
                    htmlFor={`instructor-${instructor}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {instructor}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Conflicts Filter */}
          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="conflicts-only"
                checked={filters.conflictsOnly}
                onCheckedChange={(checked) => 
                  onFiltersChange({ ...filters, conflictsOnly: !!checked })
                }
              />
              <label
                htmlFor="conflicts-only"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Show conflicts only
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Display events with scheduling conflicts
            </p>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Active Filters</h4>
                <div className="flex flex-wrap gap-1">
                  {filters.courses.map((course) => (
                    <Badge key={`active-course-${course}`} variant="secondary" className="text-xs">
                      {course}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleCourse(course)}
                      />
                    </Badge>
                  ))}
                  {filters.types.map((type) => (
                    <Badge key={`active-type-${type}`} variant="secondary" className="text-xs capitalize">
                      {type}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleType(type)}
                      />
                    </Badge>
                  ))}
                  {filters.instructors.map((instructor) => (
                    <Badge key={`active-instructor-${instructor}`} variant="secondary" className="text-xs">
                      {instructor}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => toggleInstructor(instructor)}
                      />
                    </Badge>
                  ))}
                  {filters.conflictsOnly && (
                    <Badge variant="secondary" className="text-xs">
                      Conflicts Only
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => onFiltersChange({ ...filters, conflictsOnly: false })}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}