import React from "react";

export interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface Task {
  id: string;
  chapterId: string;
  type: TaskType;
  difficulty: TaskDifficulty;
  points: number;
  timeEstimate: number;
  content: TaskContent;
  createdAt: Date;
}

export type TaskType = "multiple-choice" | "fill-blank" | "essay" | "listening";
export type TaskDifficulty = "beginner" | "intermediate" | "advanced";

export type TaskContent =
  | MultipleChoiceContent
  | FillBlankContent
  | EssayContent;

export interface MultipleChoiceContent {
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

export interface FillBlankContent {
  sentence: string;
  blanks: { position: number; answer: string }[];
}

export interface EssayContent {
  prompt: string;
  minWords: number;
  maxWords: number;
}

export interface ChapterWithTasks {
  id: string;
  title: string;
  description: string | null;
  grammar_focus: string[];
  vocabulary_themes: string[];
  tasks: Task[];
}

export type NewTaskData = Omit<Task, "id" | "createdAt">;
