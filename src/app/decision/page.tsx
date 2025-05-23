"use client";

import { useState } from "react";
import PageWrapper from "@/components/pageWrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const QUESTIONS = [
  {
    id: "decisionType",
    question: "What exactly are you deciding?",
    options: ["Career", "Financial", "Relationship", "Education", "Other"],
  },
  {
    id: "importanceReason",
    question: "Why does this matter to you?",
    options: [
      "Future Impact",
      "Relationships",
      "Financial Risk",
      "Health",
      "Other",
    ],
  },
  {
    id: "desiredOutcome",
    question: "What outcome is most important?",
    options: [
      "Financial",
      "Growth",
      "Relationships",
      "Risk Minimization",
      "Happiness",
    ],
  },
  {
    id: "riskTolerance",
    question: "What's your risk tolerance?",
    options: ["Low", "Moderate", "High"],
  },
  {
    id: "timeUrgency",
    question: "Time urgency for decision?",
    options: ["Immediate", "Flexible", "None"],
  },
  {
    id: "emotionalImpact",
    question: "Emotional impact of options?",
    options: ["Positive", "Neutral", "Negative", "Mixed"],
  },
];

export default function DecisionHelper() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleDropdownChange = (id: string, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const checkForPropaganda = async () => {
    setError(null);
    if (!inputText.trim())
      return setError("Please enter some text to analyze.");

    setIsLoading(true);

    const messages = [
      {
        role: "system",
        content: `You are a talented and experienced decision maker. Your job is to analyze situations using key decision factors and provide clear, actionable guidance.

The user has answered the following questions:
${Object.entries(responses)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join("\n")}

Now, based on the user's situation below, give a concise decision-making response. Focus on key trade-offs, give a brief rationale, and suggest the most practical path forward in under 200 words. Avoid repetition, avoid fluff. Be decisive and helpful.`,
      },
      { role: "user", content: inputText },
    ];

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4-turbo",
            messages,
            max_tokens: 2000,
            temperature: 0.3,
          }),
        }
      );

      if (!response.ok)
        throw new Error(
          (await response.json()).error?.message || "API request failed"
        );
      const data = await response.json();
      setOutputText(data.choices[0].message.content);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error analyzing text. Please check your API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Decision Helper</h1>
          <p className="text-muted-foreground text-sm">
            Use structured prompts to evaluate complex decisions with clarity.
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-500 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        <Card className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="input-text">Describe your decision</Label>
                <Textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="E.g. Should I switch jobs or stay for another year?"
                />
              </div>

              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2">
                  <Label>{q.question}</Label>
                  <Select
                    value={responses[q.id]}
                    onValueChange={(value) => handleDropdownChange(q.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {q.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <Button
                onClick={checkForPropaganda}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  "Get Decision Advice"
                )}
              </Button>
            </div>

            <div>
              <div className="space-y-4">
                <Label htmlFor="output-text">Analysis Results</Label>
                <Textarea
                  id="output-text"
                  className="flex h-[500px] "
                  value={outputText}
                  readOnly
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
