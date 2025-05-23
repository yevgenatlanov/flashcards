export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  customDomains?: string[];
  settings: {
    theme: string;
    logo?: string;
    features: string[];
    customCss?: string;
  };
  status: "active" | "inactive" | "maintenance";
}

// User's relationship with a tenant
export interface TenantMembership {
  tenantId: string;
  userId: string;
  role: "owner" | "admin" | "member" | "guest";
  status: "active" | "invited" | "suspended";
}

export interface TenantFeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}
