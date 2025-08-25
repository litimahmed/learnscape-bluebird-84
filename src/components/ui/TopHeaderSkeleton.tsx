import { Skeleton } from "./skeleton";

export function TopHeaderSkeleton() {
  return (
    <div className="w-full bg-primary px-4 lg:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
        {/* Left - Language Selector Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="h-8 w-20 bg-primary-foreground/20" />
        </div>

        {/* Center - Text Content Skeleton */}
        <div className="flex-1 text-center px-4">
          <Skeleton className="h-4 w-80 mx-auto bg-primary-foreground/20 hidden sm:block" />
        </div>

        {/* Right - Help Center & Theme Toggle Skeleton */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Skeleton className="h-8 w-24 bg-primary-foreground/20" />
          <Skeleton className="h-8 w-8 rounded-full bg-primary-foreground/20" />
        </div>
      </div>
    </div>
  );
}