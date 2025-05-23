export function isValidIcon(str: string): boolean {
  if (str.length > 10) {
    return false;
  }

  try {
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(str)) {
      return true;
    }
  } catch (error) {
    console.warn(
      "Emoji regex validation failed, using fallback validation",
      error
    );
  }

  return str.length >= 1 && str.length <= 10;
}

type SubdomainData = {
  emoji: string;
  createdAt: number;
};

// Mock data in JSON-style object
const mockSubdomainJson: Record<string, SubdomainData> = {
  "tenant-x": {
    emoji: "🌟",
    createdAt: 1716200000000,
  },
  "tenant-y": {
    emoji: "🚀",
    createdAt: 1716300000000,
  },
};

export async function getSubdomainData(subdomain: string) {
  const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9.-]/g, "");
  return mockSubdomainJson[sanitized] ?? null;
}

export async function getAllSubdomains() {
  return Object.entries(mockSubdomainJson).map(([subdomain, data]) => ({
    subdomain,
    emoji: data.emoji || "❓",
    createdAt: data.createdAt || Date.now(),
  }));
}
