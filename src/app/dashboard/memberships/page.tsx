"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Crown,
  Star,
  Shield,
  Diamond,
  Coins,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_MEMBERSHIPS } from "@/_mock/membership";
import {
  MembershipStatus,
  MembershipTier,
  type Membership,
} from "@/types/membership";
import PageWrapper from "@/components/pageWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getTierIcon = (tier: MembershipTier) => {
  switch (tier) {
    case "diamond":
      return <Diamond className="h-4 w-4" />;
    case "platinum":
      return <Crown className="h-4 w-4" />;
    case "silver":
      return <Star className="h-4 w-4" />;
    case "bronze":
      return <Shield className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

const getTierColor = (tier: MembershipTier) => {
  switch (tier) {
    case "diamond":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "platinum":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "silver":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "bronze":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const getStatusColor = (status: MembershipStatus) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "expired":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "cancelled":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Lifetime";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export default function MembershipTable() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Filter memberships based on search and filters
  const filteredMemberships = MOCK_MEMBERSHIPS.filter(
    (membership: Membership) => {
      const matchesSearch =
        membership.member.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        membership.member.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesTier =
        selectedTier === "all" || membership.tier === selectedTier;
      const matchesStatus =
        selectedStatus === "all" || membership.status === selectedStatus;

      return matchesSearch && matchesTier && matchesStatus;
    }
  );

  const handleView = (id: string) => {
    console.log("View membership:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit membership:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete membership:", id);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-1 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Memberships
                </h1>
                <p className="text-muted-foreground text-sm">
                  Manage Good Game Show member subscriptions and access
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Tiers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Token Stake</TableHead>
                  <TableHead>EXP</TableHead>
                  <TableHead>Voting Power</TableHead>
                  <TableHead>Hub Access</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMemberships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      <div className="text-muted-foreground">
                        No memberships found matching your criteria.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMemberships.map((membership) => (
                    <TableRow key={membership.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={membership.member.avatar}
                              alt={membership.member.name}
                            />
                            <AvatarFallback>
                              {membership.member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {membership.member.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {membership.member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                            membership.tier
                          )}`}
                        >
                          {getTierIcon(membership.tier)}
                          {membership.tier.toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">
                          {membership.source}
                        </span>
                      </TableCell>
                      <TableCell>
                        {membership.tokenStakeAmount > 0 ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Coins className="h-3 w-3 text-yellow-500" />
                            {formatNumber(membership.tokenStakeAmount)}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="h-3 w-3 text-blue-500" />
                          {formatNumber(membership.expAmount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {formatNumber(membership.votingPower)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[120px]">
                          {membership.hubAccess.slice(0, 2).map((hub) => (
                            <Badge
                              key={hub}
                              variant="outline"
                              className="text-xs"
                            >
                              {hub}
                            </Badge>
                          ))}
                          {membership.hubAccess.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{membership.hubAccess.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            membership.status
                          )}`}
                        >
                          {membership.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatDate(membership.expiryDate)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleView(membership.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(membership.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(membership.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
