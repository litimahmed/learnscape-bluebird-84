import { Skeleton } from "@/components/ui/skeleton";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="h-20 bg-card border-b border-border">
        <div className="container-custom h-full">
          <div className="flex items-center justify-between h-full">
            <Skeleton className="h-8 w-32 bg-muted/60" />
            <div className="hidden md:flex gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-16 bg-muted/40" />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 bg-muted/50 rounded-full" />
              <Skeleton className="h-8 w-20 bg-primary/30 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <Skeleton className="h-6 w-28 mx-auto bg-primary/30" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto bg-gradient-to-r from-muted/70 to-muted/50" />
            <Skeleton className="h-6 w-3/4 mx-auto bg-muted/50" />
          </div>

          {/* Content Blocks */}
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64 bg-muted/60" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="border rounded-lg p-6 space-y-4 bg-card">
                      <Skeleton className="h-6 w-3/4 bg-muted/60" />
                      <Skeleton className="h-16 w-full bg-muted/40" />
                      <Skeleton className="h-10 w-full bg-primary/30" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-card border-t border-border mt-16">
        <div className="container-custom py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-24 bg-muted/60" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-4 w-20 bg-muted/40" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-8 pt-8">
            <Skeleton className="h-4 w-64 bg-muted/40 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;