import { NextRequest, NextResponse } from "next/server";
import { getSubdomainData } from "@/lib/tenant";

const ROOT_DOMAIN = "atlanov.me";

function extractSubdomainFromHost(host: string): string | null {
  const hostname = host.split(":")[0];
  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
    return null;
  }
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return hostname.replace(`.${ROOT_DOMAIN}`, "");
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = extractSubdomainFromHost(host);

  if (!subdomain) return NextResponse.next();

  if (subdomain === "flashcards") {
    return NextResponse.next();
  }

  if (subdomain === "decision") {
    return NextResponse.rewrite(new URL(`/decision`, request.url));
  }

  const tenant = await getSubdomainData(subdomain);
  if (!tenant) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
