"use client";

import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import PageWrapper from "@/components/pageWrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { CheckCircle } from "lucide-react";
import UserCalendarComponent from "@/components/claimCalendar";
import UserTimelineComponent from "@/components/timelineCard";
import SimpleReferralComponent from "@/components/referralCard";
import UnifiedMembershipComponent from "@/components/memberCard";
import ClaimableRewardsComponent from "@/components/rewardsWidget";
import UpcomingEventsComponent from "@/components/upcomingEvents";

// Clean data types
interface DashboardData {
  recentActions: string[];
  notifications: number;
  userName: string;
  userLevel: number;
  totalEXP: number;
}

// Generate realistic Good Game data
function generateGoodGameData(): DashboardData {
  return {
    recentActions: [
      "Watched Good Game India Episode 3",
      "Joined Mumbai Tournament",
      "Invited friend @priyagamer",
      "Completed weekly survey",
      "Claimed daily reward",
    ].slice(0, faker.number.int({ min: 3, max: 5 })),
    notifications: faker.number.int({ min: 1, max: 5 }),
    userName: faker.person.firstName(),
    userLevel: faker.number.int({ min: 5, max: 50 }),
    totalEXP: faker.number.int({ min: 1000, max: 10000 }),
  };
}

export default function UpgradedGoodGameDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const generated = generateGoodGameData();
    setData(generated);
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto"></div>
          <p className="text-muted-foreground">
            Loading your gaming universe...
          </p>
        </div>
      </div>
    );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Welcome back, {data.userName}! 👋
                </h1>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>Level {data.userLevel} Gamer</span>
                <span>•</span>
                <span>{data.totalEXP.toLocaleString()} Total EXP</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid - Improved Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Primary Cards */}
            <div className="lg:col-span-8 space-y-6">
              {/* Top Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UnifiedMembershipComponent />

                {/* Recent Activity */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your latest gaming actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.recentActions.map((action, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 dark:bg-muted/10 hover:bg-muted/50 transition-colors"
                        >
                          <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30">
                            <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm flex-1">{action}</span>
                          <span className="text-xs text-muted-foreground">
                            {index === 0 ? "Just now" : `${index + 1}h ago`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Quick Actions */}
                {/* <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Jump into the action</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-1 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                      >
                        <Play className="h-5 w-5" />
                        <span className="text-xs">Watch Latest</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-1 hover:bg-orange-50 dark:hover:bg-orange-950/30"
                      >
                        <Trophy className="h-5 w-5" />
                        <span className="text-xs">Join Tournament</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-1 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span className="text-xs">Invite Friends</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex-col gap-1 hover:bg-green-50 dark:hover:bg-green-950/30"
                      >
                        <Gift className="h-5 w-5" />
                        <span className="text-xs">View Rewards</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              {/* Middle Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClaimableRewardsComponent />
                <UpcomingEventsComponent />
              </div>

              {/* Calendar Section */}
              <UserCalendarComponent />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="lg:col-span-4 space-y-6">
              <SimpleReferralComponent />

              <UserTimelineComponent />
            </div>
          </div>

          {/* Timeline Section */}

          {/* Footer CTA */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <h3 className="text-xl font-bold">
                  Ready for the Next Challenge? 🎮
                </h3>
                <p className="text-purple-100">
                  Join today's tournament or check out new episodes to keep your
                  streak going!
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="secondary"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Join Tournament
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Watch Episodes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
