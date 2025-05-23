import PageWrapper from "@/components/pageWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">
            About This Boilerplate
          </h1>
          <p className="text-xl text-muted-foreground">
            A modern, feature-rich foundation for building Next.js applications.
          </p>
        </div>

        <Tabs defaultValue="features" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Features</CardTitle>
                <CardDescription>
                  Key features included in this boilerplate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modern Next.js 15 with App Router</li>
                  <li>TypeScript for type safety</li>
                  <li>Tailwind CSS for styling</li>
                  <li>ShadCN UI components</li>
                  <li>Dark mode / light mode theming</li>
                  <li>Internationalization with three languages</li>
                  <li>Responsive design</li>
                  <li>Interactive data visualizations</li>
                  <li>Mobile-friendly navigation</li>
                  <li>SEO optimized</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technologies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>
                  The technologies used in this boilerplate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Frontend</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Next.js 15</li>
                      <li>React 19</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>ShadCN UI</li>
                      <li>Lucide Icons</li>
                      <li>Recharts</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">Development</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>ESLint</li>
                      <li>Prettier</li>
                      <li>Storybook</li>
                      <li>Vitest</li>
                      <li>Playwright</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
}
