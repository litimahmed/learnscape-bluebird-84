import { CourseStats } from "./CourseStats";
import { CourseFilters } from "./CourseFilters";
import { ActiveCoursesList } from "./ActiveCoursesList";
import { CourseGrid } from "./CourseGrid";
import { UpcomingDeadlines } from "./UpcomingDeadlines";

export function MyCourses() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Course Statistics Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">My Courses</h1>
            <p className="text-muted-foreground">Manage your learning journey and track progress</p>
          </div>
        </div>
        <CourseStats />
      </div>

      {/* Search and Filters */}
      <CourseFilters />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Primary Content Area - 8 columns */}
        <div className="xl:col-span-8 space-y-8">
          {/* Active Courses Priority Section */}
          <ActiveCoursesList />
          
          {/* All Courses Grid */}
          <CourseGrid />
        </div>

        {/* Sidebar - 4 columns */}
        <div className="xl:col-span-4 space-y-6">
          <UpcomingDeadlines />
        </div>
      </div>
    </div>
  );
}