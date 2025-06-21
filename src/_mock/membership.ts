import { faker } from "@faker-js/faker";
import {
  Membership,
  MembershipTier,
  MembershipStatus,
  MembershipSource,
} from "../types/membership";

const HUBS = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
];

const TIER_BENEFITS = {
  [MembershipTier.BRONZE]: [
    "Basic Hub Access",
    "Community Discord",
    "Monthly Newsletter",
  ],
  [MembershipTier.SILVER]: [
    "Live Event Streaming",
    "Behind-the-Scenes Content",
    "Merchandise Discounts",
    "Discord Access",
  ],
  [MembershipTier.PLATINUM]: [
    "VIP Event Access",
    "Meet & Greet Opportunities",
    "Exclusive Merchandise",
    "Early Show Access",
    "Priority Support",
  ],
  [MembershipTier.DIAMOND]: [
    "Governance Voting Rights",
    "Judge Interaction Sessions",
    "Hub Priority Booking",
    "NFT Collectibles",
    "Revenue Sharing",
    "Exclusive Events",
  ],
};

function generateMockMembership(): Membership {
  const tier = faker.helpers.enumValue(MembershipTier);
  const source = faker.helpers.enumValue(MembershipSource);
  const status = faker.helpers.enumValue(MembershipStatus);

  // Token stake logic
  let tokenStakeAmount = 0;
  if (
    tier === MembershipTier.DIAMOND ||
    source === MembershipSource.TOKEN ||
    source === MembershipSource.HYBRID
  ) {
    tokenStakeAmount = faker.number.int({ min: 1000, max: 15000 });
  }

  // EXP amount based on tier
  const expRanges = {
    [MembershipTier.BRONZE]: { min: 0, max: 800 },
    [MembershipTier.SILVER]: { min: 800, max: 2500 },
    [MembershipTier.PLATINUM]: { min: 2500, max: 5000 },
    [MembershipTier.DIAMOND]: { min: 5000, max: 10000 },
  };

  const expAmount = faker.number.int(expRanges[tier]);

  // Hub access based on tier
  const hubCount = {
    [MembershipTier.BRONZE]: 1,
    [MembershipTier.SILVER]: faker.number.int({ min: 1, max: 2 }),
    [MembershipTier.PLATINUM]: faker.number.int({ min: 2, max: 4 }),
    [MembershipTier.DIAMOND]: faker.number.int({ min: 3, max: 6 }),
  };

  const hubAccess = faker.helpers.arrayElements(HUBS, hubCount[tier]);

  // Voting power based on tier and tokens
  const basePower = {
    [MembershipTier.BRONZE]: 5,
    [MembershipTier.SILVER]: 25,
    [MembershipTier.PLATINUM]: 100,
    [MembershipTier.DIAMOND]: 500,
  };

  const votingPower = basePower[tier] + Math.floor(tokenStakeAmount / 100);

  // Expiry date logic
  let expiryDate: string | null = null;
  if (source !== MembershipSource.TOKEN && tier !== MembershipTier.DIAMOND) {
    const futureDate = faker.date.future({ years: 1 });
    expiryDate = futureDate.toISOString();
  }

  const joinDate = faker.date.past({ years: 1 });

  return {
    id: faker.string.uuid(),
    member: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      country: "India",
      joinDate: joinDate.toISOString(),
    },
    tier,
    source,
    tokenStakeAmount,
    expAmount,
    hubAccess,
    votingPower,
    status,
    expiryDate,
    benefits: TIER_BENEFITS[tier],
    lastActivity: faker.date.recent({ days: 30 }).toISOString(),
    partnerId: "good-game-show",
    createdAt: joinDate.toISOString(),
    updatedAt: faker.date.recent({ days: 7 }).toISOString(),
  };
}

// Generate mock data
export const MOCK_MEMBERSHIPS: Membership[] = Array.from({ length: 50 }, () =>
  generateMockMembership()
);

// Add some specific Good Game Show members for consistency
MOCK_MEMBERSHIPS.unshift(
  {
    id: "1",
    member: {
      id: "member-1",
      name: 'Arjun "TechNinja" Sharma',
      email: "arjun@goodgameshow.tv",
      avatar: faker.image.avatar(),
      country: "India",
      joinDate: "2025-01-15T00:00:00Z",
    },
    tier: MembershipTier.DIAMOND,
    source: MembershipSource.TOKEN,
    tokenStakeAmount: 8500,
    expAmount: 5200,
    hubAccess: ["Mumbai", "Delhi", "Bangalore"],
    votingPower: 950,
    status: MembershipStatus.ACTIVE,
    expiryDate: null,
    benefits: TIER_BENEFITS[MembershipTier.DIAMOND],
    lastActivity: "2025-06-07T10:30:00Z",
    partnerId: "good-game-show",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-06-07T10:30:00Z",
  },
  {
    id: "2",
    member: {
      id: "member-2",
      name: 'Priya "GameQueen" Patel',
      email: "priya@goodgameshow.tv",
      avatar: faker.image.avatar(),
      country: "India",
      joinDate: "2025-03-20T00:00:00Z",
    },
    tier: MembershipTier.PLATINUM,
    source: MembershipSource.PAYMENT,
    tokenStakeAmount: 0,
    expAmount: 3800,
    hubAccess: ["Mumbai", "Pune"],
    votingPower: 150,
    status: MembershipStatus.ACTIVE,
    expiryDate: "2025-09-20T00:00:00Z",
    benefits: TIER_BENEFITS[MembershipTier.PLATINUM],
    lastActivity: "2025-06-06T15:45:00Z",
    partnerId: "good-game-show",
    createdAt: "2025-03-20T00:00:00Z",
    updatedAt: "2025-06-06T15:45:00Z",
  }
);

export default MOCK_MEMBERSHIPS;
