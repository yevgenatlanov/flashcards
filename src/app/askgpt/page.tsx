"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageWrapper from "@/components/pageWrapper";

export default function AskChatGPTCard() {
  const [query, setQuery] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setCopied(false);

    // Build the ChatGPT URL
    const encodedQuery = encodeURIComponent(query.trim());
    const fullUrl = `https://chat.openai.com/?model=gpt-4&q=${encodedQuery}`;

    try {
      // Use is.gd API to shorten without auth
      const response = await fetch(
        `https://is.gd/create.php?format=json&url=${encodeURIComponent(
          fullUrl
        )}`
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to shorten link: ${errText}`);
      }

      const data = await response.json();
      if (data.errorcode) {
        throw new Error(data.errormessage || "Unknown error");
      }
      setShortUrl(data.shorturl);
    } catch (err) {
      console.error(err);
      setShortUrl("Error creating short link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <PageWrapper>
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardContent>
            <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
              Ask ChatGPT for me
            </h2>

            <div className="mb-4">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question here…"
                rows={4}
                className="w-full"
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleAsk}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Generating…" : "Ask"}
              </Button>
            </div>

            {shortUrl && (
              <div className="mt-6">
                <p className="mb-2 text-sm text-muted-foreground">
                  Shortened link (click to copy):
                </p>
                <Input
                  value={shortUrl}
                  readOnly
                  onClick={handleCopy}
                  className="cursor-pointer text-blue-600 dark:text-blue-400"
                />
                {copied && (
                  <p className="mt-2 text-center text-sm text-green-500">
                    Copied to clipboard!
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
