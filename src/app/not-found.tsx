import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/pageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved. Let's
          get you back on track.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
