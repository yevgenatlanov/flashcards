"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Users, Copy, Share2, Gift, Zap } from "lucide-react";
import { toast } from "sonner";

interface ReferralData {
  totalInvites: number;
  activeReferrals: number;
  expEarned: number;
  referralCode: string;
  nextRewardAt: number;
  nextRewardTitle: string;
  nextRewardValue: string;
}

// Mock data
const mockReferralData: ReferralData = {
  totalInvites: 8,
  activeReferrals: 6,
  expEarned: 380,
  referralCode: "GGPRO2024",
  nextRewardAt: 10,
  nextRewardTitle: "Gaming Gear Discount",
  nextRewardValue: "25% OFF",
};

export default function SimpleReferralComponent() {
  const [data] = useState(mockReferralData);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.referralCode);
    toast.success("Referral code copied! 📋");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Good Game!",
        text: `Use my referral code ${data.referralCode} to join Good Game!`,
        url: `https://goodgameshow.tv/join?ref=${data.referralCode}`,
      });
    } else {
      const shareText = `Join Good Game using my code ${data.referralCode}! https://goodgameshow.tv/join?ref=${data.referralCode}`;
      navigator.clipboard.writeText(shareText);
      toast.success("Share link copied! 🔗");
    }
  };

  const progressToNextReward = (data.totalInvites / data.nextRewardAt) * 100;
  const invitesNeeded = data.nextRewardAt - data.totalInvites;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">
          Referral Program
        </CardTitle>
        <Users className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {data.totalInvites}
            </div>
            <div className="text-xs text-muted-foreground">Invited</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data.activeReferrals}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              +{data.expEarned}
            </div>
            <div className="text-xs text-muted-foreground">EXP Earned</div>
          </div>
        </div>

        {/* Next Reward Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Gift className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Next Reward</span>
            </div>
            <span className="text-muted-foreground">
              {data.totalInvites}/{data.nextRewardAt}
            </span>
          </div>

          <Progress value={progressToNextReward} className="h-2" />

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {data.nextRewardTitle} - {data.nextRewardValue}
            </span>
            <Badge variant="outline" className="text-xs">
              {invitesNeeded} more needed
            </Badge>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your referral code</label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={data.referralCode}
              className="font-mono text-center font-bold"
            />
            <Button size="sm" variant="outline" onClick={handleCopyCode}>
              <Copy className="h-3 w-3" />
            </Button>
            <Button size="sm" onClick={handleShare}>
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Earning Info */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-muted-foreground">
              Earn <strong>30 EXP</strong> per signup + <strong>50 EXP</strong>{" "}
              when they become active
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
