import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CriticalMetrics } from "./CriticalMetrics";
import { ActiveLearning } from "./ActiveLearning";
import { ProgressVisualization } from "./ProgressVisualization";
import { ContextualActions } from "./ContextualActions";

export function DashboardContent() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Personalized Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Good morning, John! 👋</h1>
            <p className="text-muted-foreground text-lg">
              You're <span className="font-semibold text-primary">67% closer to your goal</span> — keep the momentum going!
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
            <Button variant="outline">
              Join Live Class
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