"use client";

import { ChapterSelection } from "@/components/chapter";
import { QuizScreen } from "@/components/chapterScreen";
import { ErrorScreen } from "@/components/error";
import { LoadingScreen } from "@/components/loading";
import PageWrapper from "@/components/pageWrapper";
import { ChapterWithTasks } from "@/types";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const [chapters, setChapters] = useState<ChapterWithTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] =
    useState<ChapterWithTasks | null>(null);

  useEffect(() => {
    async function fetchChapters() {
      try {
        setLoading(true);
        const response = await fetch("/api/chapters");

        if (!response.ok) {
          throw new Error("Failed to fetch chapters");
        }

        const data = await response.json();
        setChapters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching chapters:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, []);

  const handleChapterSelect = (chapterId: string) => {
    const chapter = chapters.find((c) => c.id === chapterId) || null;
    setSelectedChapter(chapter);
  };

  const handleReset = () => {
    setSelectedChapter(null);
  };

  // Render screens
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (!selectedChapter) {
    return (
      <PageWrapper>
        <ChapterSelection
          chapters={chapters}
          onChapterSelect={handleChapterSelect}
        />
      </PageWrapper>
    );
  }

  return <QuizScreen selectedChapter={selectedChapter} onReset={handleReset} />;
}
