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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  TrendingUp,
  Users,
  FileText,
  Settings,
  BarChart3,
  Plus,
  Eye,
  UserPlus,
  Trophy,
  Target,
  Moon,
  Sun,
  MessageSquare,
  Calendar,
  Gift,
} from "lucide-react";

// Partner dashboard data types
interface PartnershipData {
  partnerName: string;
  status: "Active" | "Pending" | "Suspended";
  planType: "Basic" | "Pro" | "Enterprise";
  accountHealth: number;
  memberSince: string;
}

interface MemberStatsData {
  totalMembers: number;
  newMembersThisWeek: number;
  membersByTier: {
    bronze: number;
    silver: number;
    platinum: number;
    diamond: number;
  };
  churnRate: number;
  weeklyGrowth: number;
}

interface RevenueData {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  outstandingInvoices: number;
  nextBillingDate: string;
  paymentMethodStatus: "Active" | "Expired" | "Pending";
  monthlyGrowth: number;
}

interface ContentData {
  activeCampaigns: number;
  publishedContent: number;
  mostPopularContent: string;
  contentViews: number;
  engagementRate: number;
}

interface TierConfigData {
  tiers: Array<{
    name: string;
    price: number;
    memberCount: number;
    features: number;
  }>;
}

interface AnalyticsData {
  memberEngagement: number;
  conversionRate: number;
  popularTier: string;
  topRegion: string;
  averageSessionTime: string;
}

interface PartnerDashboardData {
  partnership: PartnershipData;
  memberStats: MemberStatsData;
  revenue: RevenueData;
  content: ContentData;
  tiers: TierConfigData;
  analytics: AnalyticsData;
}

// Generate realistic partner data
function generatePartnerData(): PartnerDashboardData {
  const currentRevenue = faker.number.int({ min: 5000, max: 50000 });
  const previousRevenue = faker.number.int({ min: 4000, max: 45000 });
  const totalMembers = faker.number.int({ min: 100, max: 2000 });

  return {
    partnership: {
      partnerName: faker.helpers.arrayElement([
        "Mumbai Gaming Hub",
        "Delhi Esports Center",
        "Bangalore Game Zone",
        "Chennai Gaming Arena",
        "Hyderabad Pro Gaming",
      ]),
      status: faker.helpers.arrayElement([
        "Active",
        "Active",
        "Active",
        "Pending",
      ]) as "Active" | "Pending" | "Suspended",
      planType: faker.helpers.arrayElement(["Basic", "Pro", "Enterprise"]) as
        | "Basic"
        | "Pro"
        | "Enterprise",
      accountHealth: faker.number.int({ min: 75, max: 100 }),
      memberSince: faker.date.past({ years: 2 }).toLocaleDateString(),
    },
    memberStats: {
      totalMembers,
      newMembersThisWeek: faker.number.int({ min: 5, max: 50 }),
      membersByTier: {
        bronze: Math.round(totalMembers * 0.4),
        silver: Math.round(totalMembers * 0.35),
        platinum: Math.round(totalMembers * 0.2),
        diamond: Math.round(totalMembers * 0.05),
      },
      churnRate: faker.number.float({ min: 2, max: 8, fractionDigits: 1 }),
      weeklyGrowth: faker.number.float({ min: 1, max: 15, fractionDigits: 1 }),
    },
    revenue: {
      currentMonthRevenue: currentRevenue,
      previousMonthRevenue: previousRevenue,
      outstandingInvoices: faker.number.int({ min: 0, max: 3 }),
      nextBillingDate: faker.date.soon({ days: 15 }).toLocaleDateString(),
      paymentMethodStatus: faker.helpers.arrayElement([
        "Active",
        "Active",
        "Active",
        "Expired",
      ]) as "Active" | "Expired" | "Pending",
      monthlyGrowth:
        ((currentRevenue - previousRevenue) / previousRevenue) * 100,
    },
    content: {
      activeCampaigns: faker.number.int({ min: 2, max: 8 }),
      publishedContent: faker.number.int({ min: 15, max: 100 }),
      mostPopularContent: faker.helpers.arrayElement([
        "BGMI Tournament Highlights",
        "Free Fire Championship Series",
        "Valorant Strategy Guide",
        "Gaming Setup Reviews",
      ]),
      contentViews: faker.number.int({ min: 1000, max: 50000 }),
      engagementRate: faker.number.float({
        min: 15,
        max: 45,
        fractionDigits: 1,
      }),
    },
    tiers: {
      tiers: [
        {
          name: "Bronze",
          price: 199,
          memberCount: Math.round(totalMembers * 0.4),
          features: 5,
        },
        {
          name: "Silver",
          price: 999,
          memberCount: Math.round(totalMembers * 0.35),
          features: 8,
        },
        {
          name: "Platinum",
          price: 2999,
          memberCount: Math.round(totalMembers * 0.2),
          features: 12,
        },
        {
          name: "Diamond",
          price: 0, // Token-based
          memberCount: Math.round(totalMembers * 0.05),
          features: 15,
        },
      ],
    },
    analytics: {
      memberEngagement: faker.number.float({
        min: 60,
        max: 90,
        fractionDigits: 1,
      }),
      conversionRate: faker.number.float({
        min: 12,
        max: 35,
        fractionDigits: 1,
      }),
      popularTier: faker.helpers.arrayElement(["Silver", "Platinum", "Bronze"]),
      topRegion: faker.helpers.arrayElement([
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
      ]),
      averageSessionTime: `${faker.number.int({ min: 15, max: 45 })}m`,
    },
  };
}

// Helper functions for styling with dark mode support
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
    case "Suspended":
      return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
  }
};

const getPlanColor = (plan: string) => {
  switch (plan) {
    case "Basic":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "Pro":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "Enterprise":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function FixedPartnerDashboard() {
  const [data, setData] = useState<PartnerDashboardData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const generated = generatePartnerData();
    setData(generated);

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto"></div>
          <p className="text-muted-foreground">Loading partner dashboard...</p>
        </div>
      </div>
    );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header with Partnership Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Partner Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your gaming community and track performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-card dark:bg-card">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(data.partnership.status)}
                  >
                    {data.partnership.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getPlanColor(data.partnership.planType)}
                  >
                    {data.partnership.planType}
                  </Badge>
                </div>
                <div className="text-sm font-medium text-foreground">
                  {data.partnership.partnerName}
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {data.revenue.outstandingInvoices > 0 && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                )}
              </Button>
              <Avatar>
                <AvatarImage src={faker.image.avatar()} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  PG
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Member Growth History */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Member Growth
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {data.memberStats.totalMembers.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total Members
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        +{data.memberStats.newMembersThisWeek}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        This Week
                      </div>
                    </div>
                  </div>

                  {/* Member Growth Chart */}
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Last 6 months member growth
                    </div>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {[420, 485, 520, 580, 645, 720].map((members, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <div
                            className="w-full bg-blue-200 dark:bg-blue-800 rounded-sm transition-colors"
                            style={{ height: `${(members / 720) * 100}%` }}
                          ></div>
                          <div className="text-xs text-muted-foreground">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Weekly Growth
                      </span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        +{data.memberStats.weeklyGrowth}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Churn Rate</span>
                      <span className="font-medium text-foreground">
                        {data.memberStats.churnRate}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Monthly Growth
                      </span>
                      <span className="font-medium text-foreground">
                        +{(((720 - 645) / 645) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Add Member
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  View All
                </Button>
              </CardFooter>
            </Card>

            {/* 2. Membership Revenue & Retention */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Membership Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(data.revenue.currentMonthRevenue)}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-muted-foreground">
                        Monthly Recurring Revenue
                      </span>
                      <span
                        className={`font-medium ${
                          data.revenue.monthlyGrowth >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {data.revenue.monthlyGrowth >= 0 ? "+" : ""}
                        {data.revenue.monthlyGrowth.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Revenue Trend Chart */}
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Last 6 months revenue trend
                    </div>
                    <div className="flex items-end justify-between h-12 gap-1">
                      {[65, 72, 68, 81, 76, 100].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-green-200 dark:bg-green-800 rounded-sm transition-colors"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div>
                      <div className="font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(data.revenue.currentMonthRevenue * 12)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Annual Run Rate
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-600 dark:text-purple-400">
                        {formatCurrency(
                          data.revenue.currentMonthRevenue /
                            data.memberStats.totalMembers
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">ARPU</div>
                    </div>
                  </div>

                  {/* Tier Revenue Breakdown */}
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      Revenue by tier
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-xs">
                      <div className="text-center">
                        <div className="h-2 bg-amber-200 dark:bg-amber-700 rounded mb-1"></div>
                        <div className="font-medium text-foreground">35%</div>
                        <div className="text-muted-foreground">Bronze</div>
                      </div>
                      <div className="text-center">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                        <div className="font-medium text-foreground">45%</div>
                        <div className="text-muted-foreground">Silver</div>
                      </div>
                      <div className="text-center">
                        <div className="h-2 bg-purple-300 dark:bg-purple-700 rounded mb-1"></div>
                        <div className="font-medium text-foreground">18%</div>
                        <div className="text-muted-foreground">Platinum</div>
                      </div>
                      <div className="text-center">
                        <div className="h-2 bg-blue-300 dark:bg-blue-700 rounded mb-1"></div>
                        <div className="font-medium text-foreground">2%</div>
                        <div className="text-muted-foreground">Diamond</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Revenue Analytics
                </Button>
              </CardFooter>
            </Card>

            {/* 3. Content & Campaigns */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Content & Campaigns
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {data.content.activeCampaigns}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active Campaigns
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {data.content.publishedContent}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Published Content
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Views</span>
                      <span className="font-medium text-foreground">
                        {data.content.contentViews.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Engagement Rate
                      </span>
                      <span className="font-medium text-foreground">
                        {data.content.engagementRate}%
                      </span>
                    </div>
                  </div>

                  <div className="p-2 bg-muted/30 dark:bg-muted/20 rounded text-center">
                    <p className="text-xs font-medium text-foreground">
                      Most Popular
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.content.mostPopularContent}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">
                  <Plus className="h-3 w-3 mr-1" />
                  New Campaign
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  Add Content
                </Button>
              </CardFooter>
            </Card>

            {/* 4. Membership Tiers */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Membership Tiers
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-1 text-center text-xs">
                    <div className="p-2 border rounded">
                      <div className="font-bold text-amber-600 dark:text-amber-400">
                        {data.memberStats.membersByTier.bronze}
                      </div>
                      <div className="text-muted-foreground">Bronze</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(199)}
                      </div>
                    </div>
                    <div className="p-2 border rounded">
                      <div className="font-bold text-gray-600 dark:text-gray-400">
                        {data.memberStats.membersByTier.silver}
                      </div>
                      <div className="text-muted-foreground">Silver</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(999)}
                      </div>
                    </div>
                    <div className="p-2 border rounded">
                      <div className="font-bold text-purple-600 dark:text-purple-400">
                        {data.memberStats.membersByTier.platinum}
                      </div>
                      <div className="text-muted-foreground">Platinum</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(2999)}
                      </div>
                    </div>
                    <div className="p-2 border rounded">
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {data.memberStats.membersByTier.diamond}
                      </div>
                      <div className="text-muted-foreground">Diamond</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Token
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {data.tiers.tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className="flex items-center justify-between p-2 border dark:border-border rounded text-sm"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {tier.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {tier.name === "Diamond"
                              ? "Token-based"
                              : formatCurrency(tier.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">
                            {tier.memberCount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            members
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Tiers
                </Button>
              </CardFooter>
            </Card>

            {/* 5. Analytics & Performance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Analytics & Performance
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {data.analytics.memberEngagement}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Member Engagement
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {data.analytics.conversionRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Conversion Rate
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Popular Tier
                      </span>
                      <span className="font-medium text-foreground">
                        {data.analytics.popularTier}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Top Region</span>
                      <span className="font-medium text-foreground">
                        {data.analytics.topRegion}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Avg. Session
                      </span>
                      <span className="font-medium text-foreground">
                        {data.analytics.averageSessionTime}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Member Activity
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="space-y-2">
                    {[
                      {
                        name: "Priya Sharma",
                        action: "Upgraded to Platinum",
                        time: "2 min ago",
                        type: "upgrade",
                      },
                      {
                        name: "Rahul Kumar",
                        action: "Joined BGMI Tournament",
                        time: "15 min ago",
                        type: "event",
                      },
                      {
                        name: "Anita Patel",
                        action: "Redeemed Gaming Gear Discount",
                        time: "1 hour ago",
                        type: "reward",
                      },
                      {
                        name: "Vikram Singh",
                        action: "Completed Weekly Challenge",
                        time: "2 hours ago",
                        type: "achievement",
                      },
                      {
                        name: "Sneha Gupta",
                        action: "Invited 3 new friends",
                        time: "4 hours ago",
                        type: "referral",
                      },
                    ]
                      .slice(0, 4)
                      .map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border dark:border-border rounded text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                activity.type === "upgrade"
                                  ? "bg-green-500"
                                  : activity.type === "event"
                                  ? "bg-blue-500"
                                  : activity.type === "reward"
                                  ? "bg-purple-500"
                                  : activity.type === "achievement"
                                  ? "bg-orange-500"
                                  : "bg-cyan-500"
                              }`}
                            ></div>
                            <div>
                              <p className="font-medium text-foreground">
                                {activity.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.action}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activity.time}
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-between text-sm pt-1 border-t">
                    <span className="text-muted-foreground">
                      Activity Score
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Very Active
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Quick Actions Bar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-sm">
                Frequently used tools and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-14 flex-col gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">Create Event</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-14 flex-col gap-1"
                >
                  <Gift className="h-4 w-4" />
                  <span className="text-xs">Add Reward</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-14 flex-col gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">Send Announcement</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-14 flex-col gap-1"
                >
                  <Target className="h-4 w-4" />
                  <span className="text-xs">Generate Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
