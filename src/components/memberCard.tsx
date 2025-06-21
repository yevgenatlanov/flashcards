"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Crown, Trophy, Zap, Star } from "lucide-react";

interface MembershipData {
  tier: "Bronze" | "Silver" | "Platinum" | "Diamond";
  daysLeft: number;
  isExpiringSoon: boolean;
  current: number;
  nextTierRequired: number;
  progress: number;
  nextTier: string;
  dailyStreak: number;
}

// Mock data
const mockMembershipData: MembershipData = {
  tier: "Silver",
  daysLeft: 18,
  isExpiringSoon: false,
  current: 1650,
  nextTierRequired: 3000,
  progress: 45, // Progress to next tier
  nextTier: "Platinum",
  dailyStreak: 7,
};

const getTierBadgeColor = (tier: string) => {
  switch (tier) {
    case "Bronze":
      return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
    case "Silver":
      return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700";
    case "Platinum":
      return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
    case "Diamond":
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700";
  }
};

export default function UnifiedMembershipComponent() {
  const [data] = useState(mockMembershipData);

  const expToNext = data.nextTierRequired - data.current;

  return (
    <Card
      className={
        data.isExpiringSoon
          ? "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/30"
          : ""
      }
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">
          Membership & Progress
        </CardTitle>
        {data.tier === "Diamond" ? (
          <Crown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        ) : (
          <Trophy className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tier and Days Left */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getTierBadgeColor(data.tier)}>
            {data.tier} Member
          </Badge>
          <div className="text-right">
            <div className="text-sm font-medium">{data.daysLeft} days left</div>
            {data.isExpiringSoon && (
              <Badge variant="destructive" className="text-xs">
                Expires Soon
              </Badge>
            )}
          </div>
        </div>

        {/* EXP Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">
                {data.current.toLocaleString()} EXP
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {expToNext.toLocaleString()} to {data.nextTier}
            </span>
          </div>

          <Progress value={data.progress} className="h-2" />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-orange-500" />
              <span className="text-muted-foreground">
                {data.dailyStreak} day streak
              </span>
            </div>
            <span className="text-muted-foreground">
              {data.progress.toFixed(0)}% complete
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full"
          variant={data.isExpiringSoon ? "default" : "outline"}
        >
          {data.tier === "Diamond"
            ? "Manage Tokens"
            : `Upgrade to ${data.nextTier}`}
        </Button>
      </CardContent>
    </Card>
  );
}
