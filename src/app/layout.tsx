import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/themeProvider";
import { I18nProvider } from "@/lib/i18n";

import "./globals.css";
import ScrollProgressWithBackToTop from "@/components/backToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Multi-tenant App",
  description: "A multi-tenant application built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ScrollProgressWithBackToTop />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
