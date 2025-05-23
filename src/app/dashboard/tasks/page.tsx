"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import TaskGenerator from "@/components/taskGenerator";
import PageWrapper from "@/components/pageWrapper";
import { ChapterWithTasks, Task } from "@/types";

export default function AdminTaskGeneratorPage() {
  const [chapters, setChapters] = useState<ChapterWithTasks[]>([]);
  const [selectedChapter, setSelectedChapter] =
    useState<ChapterWithTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/chapters")
      .then((res) => res.json())
      .then(setChapters)
      .catch((err) => console.error("Fehler beim Laden der Kapitel:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleTasksGenerated = (tasks: Task[]) => {
    setGeneratedTasks(tasks);
  };

  const saveTasksToDatabase = async () => {
    if (!selectedChapter || generatedTasks.length === 0) return;
    setSaving(true);
    try {
      const tasksToSave = generatedTasks.map((task) => ({
        chapterId: selectedChapter.id,
        type: task.type,
        difficulty: task.difficulty,
        points: task.points,
        timeEstimate: task.timeEstimate,
        content: task.content,
      }));
      const res = await fetch("/api/save-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: tasksToSave }),
      });
      if (!res.ok) throw new Error("Fehler beim Speichern");
      alert("Aufgaben erfolgreich gespeichert!");
      setGeneratedTasks([]);
    } catch (err) {
      console.error(err);
      alert("Fehler beim Speichern der Aufgaben");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">KI-Aufgaben Generator</h1>
          <p className="text-muted-foreground">
            Generieren Sie automatisch neue Aufgaben für bestehende Kapitel
          </p>
        </div>

        {!selectedChapter ? (
          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedChapter(chapter)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{chapter.title}</h3>
                  {chapter.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {chapter.description}
                    </p>
                  )}
                  <div className="mt-2 text-sm text-muted-foreground">
                    {chapter.tasks ? chapter.tasks.length : 0} vorhandene
                    Aufgaben
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedChapter(null);
                  setGeneratedTasks([]);
                }}
              >
                ← Zurück zur Kapitelauswahl
              </Button>

              {generatedTasks.length > 0 && (
                <Button
                  onClick={saveTasksToDatabase}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Speichern...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {generatedTasks.length} Aufgaben speichern
                    </>
                  )}
                </Button>
              )}
            </div>

            <TaskGenerator
              chapterData={{
                id: selectedChapter.id,
                title: selectedChapter.title,
                description: selectedChapter.description || "",
                grammarFocus: selectedChapter.grammar_focus,
                vocabularyThemes: selectedChapter.vocabulary_themes,
                tasks: selectedChapter.tasks,
              }}
              onTasksGenerated={handleTasksGenerated}
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
