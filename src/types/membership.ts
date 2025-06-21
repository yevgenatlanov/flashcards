export enum MembershipTier {
  BRONZE = "bronze",
  SILVER = "silver",
  PLATINUM = "platinum",
  DIAMOND = "diamond",
}

export enum MembershipStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export enum MembershipSource {
  PAYMENT = "payment",
  EXP = "exp",
  TOKEN = "token",
  HYBRID = "hybrid",
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  country: string;
  joinDate: string;
}

export interface Membership {
  id: string;
  member: Member;
  tier: MembershipTier;
  source: MembershipSource;
  tokenStakeAmount: number;
  expAmount: number;
  hubAccess: string[];
  votingPower: number;
  status: MembershipStatus;
  expiryDate: string | null;
  benefits: string[];
  lastActivity: string;
  partnerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipFilters {
  search?: string;
  tier?: MembershipTier[];
  status?: MembershipStatus[];
  source?: MembershipSource[];
  partnerId?: string;
}
