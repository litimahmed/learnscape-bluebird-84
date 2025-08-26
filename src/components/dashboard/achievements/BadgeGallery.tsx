import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, Award, Star, Target, Zap, BookOpen, 
  Users, MessageSquare, Clock, CheckCircle, Flame, Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeGalleryProps {
  showAll?: boolean;
}

export function BadgeGallery({ showAll = false }: BadgeGalleryProps) {
  const badges = [
    {
      id: 1,
      name: "First Course",
      description: "Complete your first course",
      icon: BookOpen,
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "common",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Complete a course in under 7 days",
      icon: Zap,
      earned: true,
      earnedDate: "2024-02-03",
      rarity: "rare",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      id: 3,
      name: "Community Helper",
      description: "Help 25 fellow students in discussions",
      icon: Users,
      earned: true,
      earnedDate: "2024-02-20",
      rarity: "uncommon",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "Get 100% on 5 consecutive quizzes",
      icon: Target,
      earned: false,
      progress: 3,
      total: 5,
      rarity: "epic",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      id: 5,
      name: "Night Owl",
      description: "Study for 3 hours after 10 PM",
      icon: Clock,
      earned: true,
      earnedDate: "2024-03-01",
      rarity: "uncommon",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    },
    {
      id: 6,
      name: "Streak Master",
      description: "Maintain a 30-day learning streak",
      icon: Flame,
      earned: false,
      progress: 12,
      total: 30,
      rarity: "legendary",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      id: 7,
      name: "Course Completionist",
      description: "Complete 10 courses",
      icon: Crown,
      earned: true,
      earnedDate: "2024-03-10",
      rarity: "epic",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      id: 8,
      name: "Discussion Starter",
      description: "Start 10 meaningful discussions",
      icon: MessageSquare,
      earned: false,
      progress: 6,
      total: 10,
      rarity: "rare",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    }
  ];

  const displayedBadges = showAll ? badges : badges.slice(0, 6);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "uncommon": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rare": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "epic": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "legendary": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Badge Collection</span>
          </CardTitle>
          {!showAll && (
            <Button variant="outline" size="sm">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedBadges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "group relative p-4 rounded-xl border-2 transition-all duration-300",
                badge.earned 
                  ? "border-primary/20 bg-card hover:border-primary/40 hover:shadow-lg cursor-pointer" 
                  : "border-dashed border-muted-foreground/30 bg-muted/30"
              )}
            >
              {/* Badge Icon */}
              <div className={cn(
                "w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                badge.earned ? badge.bgColor : "bg-muted"
              )}>
                <badge.icon className={cn(
                  "w-6 h-6",
                  badge.earned ? badge.color : "text-muted-foreground"
                )} />
              </div>

              {/* Badge Info */}
              <div className="text-center space-y-2">
                <h4 className={cn(
                  "font-semibold text-sm",
                  badge.earned ? "text-foreground" : "text-muted-foreground"
                )}>
                  {badge.name}
                </h4>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {badge.description}
                </p>

                {/* Rarity Badge */}
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs capitalize", getRarityColor(badge.rarity))}
                >
                  {badge.rarity}
                </Badge>

                {/* Progress or Earned Date */}
                {badge.earned ? (
                  <p className="text-xs text-muted-foreground">
                    Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                  </p>
                ) : badge.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(badge.progress / badge.total!) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {badge.progress}/{badge.total}
                    </p>
                  </div>
                )}
              </div>

              {/* Earned Indicator */}
              {badge.earned && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}