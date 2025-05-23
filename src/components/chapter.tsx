import { ChapterWithTasks } from "@/types";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";

// Chapter Selection Componentex
export function ChapterSelection({
  chapters,
  onChapterSelect,
}: {
  chapters: ChapterWithTasks[];
  onChapterSelect: (chapterId: string) => void;
}) {
  return (
    <div className=" container min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Kapitel auswählen</h1>
      {chapters.length === 0 ? (
        <p>Keine Kapitel verfügbar</p>
      ) : (
        <div className="grid gap-4 w-full max-w-md">
          {chapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onChapterSelect(chapter.id)}
            >
              <CardContent className="p-4">
                <div className="w-full">
                  <h3 className="font-semibold text-lg">{chapter.title}</h3>
                  {chapter.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {chapter.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">
                      {chapter?.tasks ? chapter?.tasks?.length : 0} Fragen
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
