"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Gift,
  Star,
  Crown,
  Zap,
  Trophy,
  Gem,
  CheckCircle,
  Lock,
  Flame,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface DayReward {
  day: number;
  dayName: string;
  reward: {
    type: "exp" | "discount" | "content" | "vip" | "token" | "exclusive";
    title: string;
    value: string;
    rarity: "common" | "rare" | "epic" | "legendary";
    description: string;
  };
  claimed: boolean;
  available: boolean;
  isToday: boolean;
}

// Mock calendar data
const mockCalendarData: DayReward[] = [
  {
    day: 1,
    dayName: "Mon",
    reward: {
      type: "exp",
      title: "EXP Boost",
      value: "+50 EXP",
      rarity: "common",
      description: "Start your week strong with bonus experience points",
    },
    claimed: true,
    available: true,
    isToday: false,
  },
  {
    day: 2,
    dayName: "Tue",
    reward: {
      type: "discount",
      title: "Gaming Gear Discount",
      value: "15% OFF",
      rarity: "common",
      description: "Discount on gaming accessories from partner stores",
    },
    claimed: true,
    available: true,
    isToday: false,
  },
  {
    day: 3,
    dayName: "Wed",
    reward: {
      type: "content",
      title: "Strategy Guide",
      value: "Premium",
      rarity: "rare",
      description: "Advanced gaming strategies from pro players",
    },
    claimed: false,
    available: true,
    isToday: true,
  },
  {
    day: 4,
    dayName: "Thu",
    reward: {
      type: "vip",
      title: "VIP Access",
      value: "4 Hours",
      rarity: "epic",
      description: "Exclusive access to Mumbai gaming lounge",
    },
    claimed: false,
    available: false,
    isToday: false,
  },
  {
    day: 5,
    dayName: "Fri",
    reward: {
      type: "token",
      title: "GDGM Tokens",
      value: "25 GDGM",
      rarity: "rare",
      description: "Native platform tokens for premium features",
    },
    claimed: false,
    available: false,
    isToday: false,
  },
  {
    day: 6,
    dayName: "Sat",
    reward: {
      type: "exclusive",
      title: "Tournament Entry",
      value: "Free Entry",
      rarity: "epic",
      description: "Free entry to weekend championship tournament",
    },
    claimed: false,
    available: false,
    isToday: false,
  },
  {
    day: 7,
    dayName: "Sun",
    reward: {
      type: "exclusive",
      title: "Legendary Box",
      value: "Legendary",
      rarity: "legendary",
      description: "Exclusive legendary reward - could be anything amazing!",
    },
    claimed: false,
    available: false,
    isToday: false,
  },
];

const getRewardIcon = (type: string) => {
  switch (type) {
    case "exp":
      return <Zap className="h-4 w-4" />;
    case "discount":
      return <Gift className="h-4 w-4" />;
    case "content":
      return <Star className="h-4 w-4" />;
    case "vip":
      return <Crown className="h-4 w-4" />;
    case "token":
      return <Gem className="h-4 w-4" />;
    case "exclusive":
      return <Trophy className="h-4 w-4" />;
    default:
      return <Gift className="h-4 w-4" />;
  }
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "border-gray-300 dark:border-gray-600";
    case "rare":
      return "border-blue-400 dark:border-blue-600";
    case "epic":
      return "border-purple-400 dark:border-purple-600";
    case "legendary":
      return "border-yellow-400 dark:border-yellow-600";
    default:
      return "border-gray-300 dark:border-gray-600";
  }
};

const getRarityBg = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-100 dark:bg-gray-800";
    case "rare":
      return "bg-blue-100 dark:bg-blue-900/30";
    case "epic":
      return "bg-purple-100 dark:bg-purple-900/30";
    case "legendary":
      return "bg-yellow-100 dark:bg-yellow-900/30";
    default:
      return "bg-gray-100 dark:bg-gray-800";
  }
};

export default function CondensedCalendarComponent() {
  const [calendarData, setCalendarData] = useState(mockCalendarData);
  const [rewardDialog, setRewardDialog] = useState<{
    open: boolean;
    reward?: DayReward["reward"];
    day?: number;
  }>({ open: false });
  const [streak, setStreak] = useState(2);

  const handleClaim = (dayData: DayReward) => {
    // Update the calendar data
    setCalendarData((prev) =>
      prev.map((d) => (d.day === dayData.day ? { ...d, claimed: true } : d))
    );

    // Show reward dialog
    setRewardDialog({
      open: true,
      reward: dayData.reward,
      day: dayData.day,
    });

    // Update streak
    setStreak((prev) => prev + 1);

    // Show toast
    toast.success(`Day ${dayData.day} reward claimed! 🎉`);
  };

  const claimedCount = calendarData.filter((day) => day.claimed).length;

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg font-semibold">
                Daily Rewards
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
              >
                <Flame className="h-3 w-3 mr-1" />
                {streak} Day Streak
              </Badge>
              <Badge variant="outline">{claimedCount}/7</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <div className="grid grid-cols-7 gap-2">
            {calendarData.map((day) => (
              <div key={day.day} className="text-center space-y-2">
                {/* Day name */}
                <p className="text-xs text-muted-foreground font-medium">
                  {day.dayName}
                </p>

                {/* Reward card */}
                <Card
                  className={`p-3 space-y-2 transition-all hover:scale-105 ${
                    day.isToday && !day.claimed
                      ? `border-2 border-green-500 dark:border-green-400 ${getRarityBg(
                          day.reward.rarity
                        )}`
                      : day.claimed
                      ? "border-2 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                      : !day.available
                      ? "border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/30 opacity-60"
                      : `border-2 ${getRarityColor(
                          day.reward.rarity
                        )} ${getRarityBg(day.reward.rarity)}`
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`mx-auto p-2 rounded-full w-fit ${
                      day.claimed
                        ? "bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                        : day.isToday
                        ? "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300"
                        : day.available
                        ? "bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {day.claimed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : !day.available ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      getRewardIcon(day.reward.type)
                    )}
                  </div>

                  {/* Value */}
                  <p className="text-xs font-medium text-foreground">
                    {day.reward.value}
                  </p>

                  {/* Action button */}
                  {day.claimed ? (
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      ✓ Claimed
                    </div>
                  ) : day.isToday ? (
                    <Button
                      size="sm"
                      className="h-6 text-xs bg-green-600 hover:bg-green-700 text-white w-full"
                      onClick={() => handleClaim(day)}
                    >
                      Claim
                    </Button>
                  ) : !day.available ? (
                    <div className="text-xs text-gray-500 font-medium">
                      Day {day.day}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground font-medium">
                      Day {day.day}
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>

          {/* Streak bonus info */}
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span className="text-orange-800 dark:text-orange-200">
                Complete all 7 days for a{" "}
                <strong>Legendary Bonus Reward</strong>!
                <span className="ml-1">({claimedCount}/7)</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reward Claim Dialog */}
      <Dialog
        open={rewardDialog.open}
        onOpenChange={(open) => setRewardDialog({ open })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto">
              <div
                className={`p-4 rounded-full w-fit mx-auto ${
                  rewardDialog.reward?.rarity === "legendary"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : rewardDialog.reward?.rarity === "epic"
                    ? "bg-gradient-to-r from-purple-400 to-pink-500"
                    : rewardDialog.reward?.rarity === "rare"
                    ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                    : "bg-gradient-to-r from-gray-400 to-gray-500"
                } text-white relative`}
              >
                {rewardDialog.reward && getRewardIcon(rewardDialog.reward.type)}
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
            </div>

            <div>
              <DialogTitle className="text-2xl font-bold text-center">
                🎉 Reward Claimed!
              </DialogTitle>
              <DialogDescription className="text-center space-y-2">
                <div className="text-lg font-semibold text-foreground">
                  {rewardDialog.reward?.title}
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {rewardDialog.reward?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {rewardDialog.reward?.description}
                </div>
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <Badge
              variant="outline"
              className={`mx-auto text-lg py-1 px-3 ${
                rewardDialog.reward?.rarity === "legendary"
                  ? "border-yellow-400 text-yellow-600 dark:text-yellow-400"
                  : rewardDialog.reward?.rarity === "epic"
                  ? "border-purple-400 text-purple-600 dark:text-purple-400"
                  : rewardDialog.reward?.rarity === "rare"
                  ? "border-blue-400 text-blue-600 dark:text-blue-400"
                  : "border-gray-400 text-gray-600 dark:text-gray-400"
              }`}
            >
              {rewardDialog.reward?.rarity?.toUpperCase()} REWARD
            </Badge>

            <div className="text-center text-sm text-muted-foreground">
              Keep your daily streak going for even better rewards!
            </div>

            <Button
              onClick={() => setRewardDialog({ open: false })}
              className="w-full"
            >
              Awesome! 🚀
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
