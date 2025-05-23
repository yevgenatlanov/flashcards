import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubdomainData } from "@/lib/tenant";
import { protocol } from "@/lib/utils";
import PageWrapper from "@/components/pageWrapper";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const rootDomain = "atlanov.me";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain,
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  return (
    <PageWrapper>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <div className="text-6xl md:text-8xl">{subdomainData.emoji}</div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            This is your custom subdomain page, fully themed and responsive.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href={`${protocol}://${rootDomain}`}>
                Go to Main Site
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">
                View Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
