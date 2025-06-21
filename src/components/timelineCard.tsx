"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Gift,
  Trophy,
  Play,
  Star,
  Zap,
  CheckCircle,
  Calendar,
} from "lucide-react";

interface TimelineItem {
  id: string;
  type: "reward" | "content" | "achievement" | "exp";
  title: string;
  description: string;
  value?: string;
  timestamp: string;
  category: string;
  claimed: boolean;
}

// Mock timeline data
const mockTimelineData: TimelineItem[] = [
  {
    id: "1",
    type: "reward",
    title: "VIP Lounge Access - Mumbai",
    description: "Exclusive access to Mumbai gaming lounge for weekend",
    value: "Weekend Pass",
    timestamp: "2 hours ago",
    category: "VIP Access",
    claimed: true,
  },
  {
    id: "2",
    type: "content",
    title: "Good Game India Episode 5",
    description: "Early access to latest episode featuring BGMI championship",
    timestamp: "1 day ago",
    category: "Early Access",
    claimed: true,
  },
  {
    id: "3",
    type: "achievement",
    title: "Gaming Streak Master",
    description: "Completed 7-day login streak challenge",
    value: "+100 EXP",
    timestamp: "2 days ago",
    category: "Achievement",
    claimed: true,
  },
  {
    id: "4",
    type: "reward",
    title: "Gaming Gear Discount",
    description: "20% off on all gaming accessories from partner stores",
    value: "20% OFF",
    timestamp: "3 days ago",
    category: "Discount",
    claimed: true,
  },
  {
    id: "5",
    type: "exp",
    title: "Tournament Registration",
    description: "Joined Delhi Gaming Championship tournament",
    value: "+50 EXP",
    timestamp: "4 days ago",
    category: "EXP Bonus",
    claimed: true,
  },
  {
    id: "6",
    type: "content",
    title: "Valorant Strategy Guide",
    description: "Premium guide: Advanced tactics for competitive play",
    timestamp: "1 week ago",
    category: "Premium Content",
    claimed: true,
  },
  {
    id: "7",
    type: "reward",
    title: "Free Fire Championship Tickets",
    description: "2 VIP tickets to Free Fire Championship finale",
    value: "2 Tickets",
    timestamp: "1 week ago",
    category: "Event Access",
    claimed: true,
  },
  {
    id: "8",
    type: "achievement",
    title: "Community Helper",
    description: "Helped 5 new members join the community",
    value: "+75 EXP",
    timestamp: "2 weeks ago",
    category: "Achievement",
    claimed: true,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "reward":
      return <Gift className="h-4 w-4" />;
    case "content":
      return <Play className="h-4 w-4" />;
    case "achievement":
      return <Trophy className="h-4 w-4" />;
    case "exp":
      return <Zap className="h-4 w-4" />;
    default:
      return <Star className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "reward":
      return "text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/20";
    case "content":
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20";
    case "achievement":
      return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20";
    case "exp":
      return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
    default:
      return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "VIP Access":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "Early Access":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "Achievement":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "Discount":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "EXP Bonus":
      return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400";
    case "Premium Content":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
    case "Event Access":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

export default function UserTimelineComponent() {
  const [filter, setFilter] = useState<string>("all");

  const filteredData =
    filter === "all"
      ? mockTimelineData
      : mockTimelineData.filter((item) => item.type === filter);

  return (
    <Card className="w-full ">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">
              Claim History
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
          >
            {mockTimelineData.length} Claims
          </Badge>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 pt-2">
          {["all", "reward", "content", "achievement", "exp"].map(
            (filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="text-xs"
              >
                {filterType === "all"
                  ? "All"
                  : filterType === "exp"
                  ? "EXP"
                  : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            )
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          {filteredData.map((item, index) => (
            <div key={item.id} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                {index < filteredData.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2 pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">
                        {item.title}
                      </h4>
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getCategoryColor(item.category)}
                      >
                        {item.category}
                      </Badge>
                      {item.value && (
                        <Badge
                          variant="secondary"
                          className="bg-muted text-foreground"
                        >
                          {item.value}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No claims found for this filter</p>
          </div>
        )}

        {filteredData.length > 0 && (
          <div className="text-center pt-4 border-t">
            <Button variant="outline" size="sm">
              Load More History
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
