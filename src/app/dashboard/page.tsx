/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import PageWrapper from "@/components/pageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  Activity,
  Package,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Bell,
  Eye,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Demo data for charts
const revenueData = [
  { month: "Jan", revenue: 18500, target: 15000 },
  { month: "Feb", revenue: 17200, target: 16000 },
  { month: "Mar", revenue: 21500, target: 18000 },
  { month: "Apr", revenue: 19800, target: 19000 },
  { month: "May", revenue: 24600, target: 20000 },
  { month: "Jun", revenue: 29800, target: 22000 },
  { month: "Jul", revenue: 32500, target: 25000 },
  { month: "Aug", revenue: 35700, target: 27000 },
  { month: "Sep", revenue: 41200, target: 30000 },
  { month: "Oct", revenue: 39800, target: 32000 },
  { month: "Nov", revenue: 45600, target: 35000 },
  { month: "Dec", revenue: 51250, target: 40000 },
];

const trafficData = [
  { name: "Mon", direct: 1400, organic: 2400, referral: 1800 },
  { name: "Tue", direct: 1200, organic: 2100, referral: 1500 },
  { name: "Wed", direct: 1800, organic: 2800, referral: 1600 },
  { name: "Thu", direct: 1600, organic: 2600, referral: 1700 },
  { name: "Fri", direct: 2000, organic: 3000, referral: 1900 },
  { name: "Sat", direct: 1500, organic: 2500, referral: 1300 },
  { name: "Sun", direct: 1300, organic: 2200, referral: 1100 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home", value: 20 },
  { name: "Beauty", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

// Recent order data
const recentOrders = [
  {
    id: "ORD-7352",
    customer: {
      name: "Olivia Martinez",
      email: "olivia.m@example.com",
      avatar: "OM",
    },
    amount: 125.99,
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: "ORD-7351",
    customer: {
      name: "Noah Wilson",
      email: "noah.w@example.com",
      avatar: "NW",
    },
    amount: 89.99,
    status: "processing",
    date: "5 hours ago",
  },
  {
    id: "ORD-7350",
    customer: {
      name: "Emma Johnson",
      email: "emma.j@example.com",
      avatar: "EJ",
    },
    amount: 249.95,
    status: "completed",
    date: "8 hours ago",
  },
  {
    id: "ORD-7349",
    customer: {
      name: "Liam Brown",
      email: "liam.b@example.com",
      avatar: "LB",
    },
    amount: 34.99,
    status: "completed",
    date: "12 hours ago",
  },
  {
    id: "ORD-7348",
    customer: {
      name: "Sophia Davis",
      email: "sophia.d@example.com",
      avatar: "SD",
    },
    amount: 124.5,
    status: "pending",
    date: "1 day ago",
  },
];

const topProducts = [
  { name: "Premium Headphones", sales: "$24,350", growth: 12.5 },
  { name: "Wireless Earbuds", sales: "$18,675", growth: 8.7 },
  { name: "Smart Watch Pro", sales: "$16,982", growth: 16.2 },
  { name: "Bluetooth Speaker", sales: "$12,541", growth: -3.8 },
  { name: "Laptop Stand", sales: "$10,876", growth: 7.2 },
];

export default function DashboardPage() {
  const [selectedReport, setSelectedReport] = useState("weekly");

  // Status badge color helper
  const getStatusColor = (status: any) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "processing":
        return "text-blue-500 bg-blue-500/10";
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <PageWrapper>
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your key metrics and data in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search..." className="w-[200px]" />
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="analytics" className="flex-1">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex-1">
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,250,320.00</div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-500">+12.5%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Compared to $1,110,280.00
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Active Subscriptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24,350</div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-500">+8.2%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      620 new subscriptions this week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Active Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128,450</div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-500">+5.8%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      3,642 online right now
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Conversion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.2%</div>
                    <div className="mt-2 flex items-center text-sm">
                      <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-500">-0.3%</span>
                      <span className="ml-1">from last month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Industry average is 3.6%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Monthly revenue for the current year
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      YTD: +24.5%
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3b82f6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorTarget"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ef4444"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#ef4444"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis
                          tickFormatter={(value) => `$${value / 1000}k`}
                          width={60}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip
                          formatter={(value) => [
                            `$${value.toLocaleString()}`,
                            undefined,
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                        <Area
                          type="monotone"
                          dataKey="target"
                          stroke="#ef4444"
                          fillOpacity={0}
                          fill="url(#colorTarget)"
                          strokeDasharray="5 5"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Actual Revenue</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full border border-red-500"></div>
                      <span className="font-medium">Target Revenue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="row-span-2">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>
                    Best performing products this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topProducts.map((product, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{product.name}</div>
                          <div className="font-medium">{product.sales}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={85 - i * 12} className="h-2" />
                          <span
                            className={`text-xs flex items-center ${
                              product.growth > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {product.growth > 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(product.growth)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Products
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>
                              {order.customer.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {order.customer.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {order.customer.email}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-right">
                            ${order.amount}
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Source</CardTitle>
                  <CardDescription>Website traffic by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="direct" stackId="a" fill="#3b82f6" />
                        <Bar dataKey="organic" stackId="a" fill="#10b981" />
                        <Bar dataKey="referral" stackId="a" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Direct</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Organic</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span>Referral</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>
                    Distribution of sales across categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-60 justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    {categoryData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="mr-2 h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Performance Reports</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button
                    variant={selectedReport === "daily" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setSelectedReport("daily")}
                  >
                    Daily
                  </Button>
                  <Button
                    variant={selectedReport === "weekly" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setSelectedReport("weekly")}
                  >
                    Weekly
                  </Button>
                  <Button
                    variant={selectedReport === "monthly" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setSelectedReport("monthly")}
                  >
                    Monthly
                  </Button>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Sales Report",
                  description: "Comprehensive sales performance data",
                  icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
                  updated: "Updated 2 hours ago",
                },
                {
                  title: "Customer Analysis",
                  description: "Demographics and behavior metrics",
                  icon: <Users className="h-8 w-8 text-green-500" />,
                  updated: "Updated 1 day ago",
                },
                {
                  title: "Financial Summary",
                  description: "Revenue, expenses and profitability",
                  icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
                  updated: "Updated 3 hours ago",
                },
                {
                  title: "Inventory Status",
                  description: "Stock levels and product performance",
                  icon: <Package className="h-8 w-8 text-purple-500" />,
                  updated: "Updated 5 hours ago",
                },
                {
                  title: "Website Analytics",
                  description: "Traffic, conversion, and user behavior",
                  icon: <Activity className="h-8 w-8 text-red-500" />,
                  updated: "Updated 3 hours ago",
                },
                {
                  title: "Payment Processing",
                  description: "Transaction and payment method analytics",
                  icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
                  updated: "Updated 2 days ago",
                },
              ].map((report, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="p-2 rounded-md bg-primary/10">
                      {report.icon}
                    </div>
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-6 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">
                          {report.updated}
                        </span>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" /> View
                        </Button>
                      </div>
                      <Progress value={75 - index * 8} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
                <CardDescription>
                  Customize your dashboard preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Settings content would be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
}
