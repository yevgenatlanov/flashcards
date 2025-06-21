"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Clock, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface RewardData {
  id: string;
  name: string;
  description: string;
  type: "discount" | "access" | "content" | "bonus";
  expiresIn: number;
  isNew: boolean;
  claimed: boolean;
}

// Mock rewards data
const mockRewardsData: RewardData[] = [
  {
    id: "1",
    name: "Gaming Gear Discount",
    description: "20% off on all gaming accessories",
    type: "discount",
    expiresIn: 5,
    isNew: true,
    claimed: false,
  },
  {
    id: "2",
    name: "VIP Lounge Access",
    description: "Access to Mumbai gaming lounge",
    type: "access",
    expiresIn: 12,
    isNew: false,
    claimed: false,
  },
  {
    id: "3",
    name: "Early Episode Access",
    description: "Watch new episodes 24h early",
    type: "content",
    expiresIn: 8,
    isNew: false,
    claimed: true,
  },
  {
    id: "4",
    name: "Double EXP Weekend",
    description: "2x EXP for all activities",
    type: "bonus",
    expiresIn: 3,
    isNew: true,
    claimed: false,
  },
];

export default function ClaimableRewardsComponent() {
  const [rewards, setRewards] = useState(mockRewardsData);

  const handleClaimReward = (rewardId: string) => {
    setRewards((prev) =>
      prev.map((reward) =>
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      )
    );

    const reward = rewards.find((r) => r.id === rewardId);
    toast.success(`${reward?.name} claimed! 🎉`);
  };

  const unclaimedRewards = rewards.filter((reward) => !reward.claimed);
  const claimedCount = rewards.filter((reward) => reward.claimed).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            Available Rewards
          </CardTitle>
          <CardDescription>Claim your earned perks</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          {unclaimedRewards.length > 0 && (
            <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400">
              {unclaimedRewards.length} New
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {unclaimedRewards.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Gift className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No rewards to claim right now</p>
            <p className="text-xs">Keep playing to earn more rewards!</p>
          </div>
        ) : (
          unclaimedRewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-start justify-between p-3 rounded-lg border bg-muted/30 dark:bg-muted/10"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{reward.name}</p>
                  {reward.isNew && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {reward.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{reward.expiresIn} days left</span>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleClaimReward(reward.id)}
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                Claim
              </Button>
            </div>
          ))
        )}

        {/* Show claimed rewards summary */}
        {claimedCount > 0 && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>
                {claimedCount} reward{claimedCount > 1 ? "s" : ""} claimed
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          View Reward History
        </Button>
      </CardFooter>
    </Card>
  );
}
