"use client";

import { useState } from "react";
import PageWrapper from "@/components/pageWrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Link as LinkIcon } from "lucide-react";

export default function AskChatGPTCard() {
  const [query, setQuery] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    setError(null);
    if (!query.trim()) {
      setError("Please enter a query");
      return;
    }

    setIsLoading(true);
    setCopied(false);

    try {
      const encodedQuery = encodeURIComponent(query.trim());
      const fullUrl = `https://chat.openai.com/?model=gpt-4&q=${encodedQuery}`;

      const response = await fetch(
        `https://is.gd/create.php?format=json&url=${encodeURIComponent(
          fullUrl
        )}`
      );
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Error shortening the link");
      }

      const data = await response.json();
      if (data.errorcode) {
        throw new Error(data.errormessage || "Unknown error");
      }

      setShortUrl(data.shorturl);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Error creating short link"
      );
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
      <div className="w-full px-8 md:px-6 lg:px-36 py-12">
        {error && (
          <div className="text-sm text-red-500 bg-red-100 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Ask ChatGPT for me
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your query to get a shortened ChatGPT link
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-4">
                <Textarea
                  id="query-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Explain quantum entanglement"
                  rows={8}
                />
              </div>

              <Button
                onClick={handleAsk}
                disabled={isLoading}
                className="w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Generating…
                  </>
                ) : (
                  "Shorten and Get"
                )}
              </Button>

              {shortUrl && (
                <div className="space-y-2">
                  <Label htmlFor="short-url">Shortened Link</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="short-url"
                      value={shortUrl}
                      readOnly
                      className="pr-10 cursor-pointer"
                      onClick={handleCopy}
                    />
                    <LinkIcon className="absolute right-3 h-5 w-5 text-blue-600" />
                  </div>
                  {copied && (
                    <p className="text-sm text-green-500">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
