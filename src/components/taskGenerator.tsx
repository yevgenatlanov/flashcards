"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { Task } from "@/types";

interface TaskGeneratorProps {
  chapterData: {
    id: string;
    title: string;
    description: string;
    grammarFocus: string[];
    vocabularyThemes: string[];
    tasks: Task[];
  };
  onTasksGenerated: (tasks: Task[]) => void;
}

export default function TaskGenerator({
  chapterData,
  onTasksGenerated,
}: TaskGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateTasks = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterData }),
      });

      if (!response.ok) throw new Error("Fehler beim Generieren");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value);
        }
      }

      const lines = result.trim().split("\n");
      const lastLine = lines[lines.length - 1];
      if (lastLine.startsWith("data: ")) {
        const jsonData = lastLine.slice(6);
        const tasks = JSON.parse(jsonData);
        onTasksGenerated(tasks);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      console.error("Error generating tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" /> KI-Aufgaben Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{chapterData.title}</h3>
              <p className="text-sm text-muted-foreground">
                {chapterData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Grammatik Fokus:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {chapterData.grammarFocus.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Wortschatz Themen:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {chapterData.vocabularyThemes.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={generateTasks}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generieren...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Aufgaben generieren
                  </span>
                )}
              </Button>
            </div>

            {error && (
              <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
                Fehler: {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
