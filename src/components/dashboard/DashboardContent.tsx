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
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                J
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">Welcome back, John</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  67% progress to goal
                </span>
                <span>•</span>
                <span>4 active courses</span>
                <span>•</span>
                <span>Next: React Advanced Concepts</span>
              </div>
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