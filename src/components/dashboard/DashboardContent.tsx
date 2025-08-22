import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CriticalMetrics } from "./CriticalMetrics";
import { ActiveLearning } from "./ActiveLearning";
import { ProgressVisualization } from "./ProgressVisualization";
import { ContextualActions } from "./ContextualActions";

export function DashboardContent() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Modern Professional Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="relative space-y-6">
          {/* Top Row: User Info & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  J
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Welcome back, John</h1>
                <p className="text-sm text-muted-foreground">Ready to continue your learning journey?</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-md">
                <Sparkles className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                <ArrowRight className="w-4 h-4 mr-2" />
                Live Session
              </Button>
            </div>
          </div>
          
          {/* Bottom Row: Progress Indicators */}
          <div className="flex items-center justify-between pt-4 border-t border-primary/10">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-foreground">67% to Goal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">4 Active Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Next: React Advanced</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last active: 2 hours ago
            </div>
          </div>
        </div>
      </div>

      {/* Critical Metrics */}
      <CriticalMetrics />

      {/* Main Content Grid - 8/4 column split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Primary Content Area - 8 columns */}
        <div className="xl:col-span-8 space-y-8">
          {/* Active Learning Section */}
          <ActiveLearning />
          
          {/* Progress Visualization */}
          <ProgressVisualization />
        </div>

        {/* Secondary Sidebar - 4 columns */}
        <div className="xl:col-span-4 space-y-6">
          <ContextualActions />
        </div>
      </div>
    </div>
  );
}