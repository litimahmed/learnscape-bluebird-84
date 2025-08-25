import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar Skeleton */}
      <div className="border-b border-border/40">
        <div className="container-custom flex h-10 items-center justify-between">
          {/* Left - Language Switcher */}
          <div className="flex items-center space-x-3">
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
          
          {/* Center - Promotional Text */}
          <div className="hidden lg:block">
            <Skeleton className="h-5 w-64 rounded-md" />
          </div>
          
          {/* Right - Help & Theme */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar Skeleton */}
      <div className="border-b border-border">
        <div className="container-custom flex h-16 items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center">
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>

          {/* Center - MegaMenu & Search */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center max-w-2xl">
            {/* MegaMenu Items */}
            <div className="flex items-center space-x-8">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-18 rounded-md" />
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          {/* Right - Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-18 rounded-md" />
            </div>
            
            {/* User Profile or Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Skeleton className="h-9 w-16 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}