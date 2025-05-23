import { ChapterWithTasks, MultipleChoiceContent, Task } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import PageWrapper from "./pageWrapper";

// Quiz Component
export function QuizScreen({
  selectedChapter,
  onReset,
}: {
  selectedChapter: ChapterWithTasks;
  onReset: () => void;
}) {
  const [quizCards, setQuizCards] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [incorrectIds, setIncorrectIds] = useState<string[]>([]);
  const [repeatMode, setRepeatMode] = useState(false);

  // Initialize quiz when chapter changes
  useEffect(() => {
    if (selectedChapter) {
      setQuizCards(selectedChapter.tasks);
      setIndex(0);
      setScore(0);
      setSelected(null);
      setShowAnswer(false);
      setIncorrectIds([]);
      setRepeatMode(false);
    }
  }, [selectedChapter]);

  const selectOption = (option: string) => {
    if (showAnswer) return;

    setSelected(option);
    setShowAnswer(true);

    const content = quizCards[index].content as MultipleChoiceContent;
    if (option === content.correctAnswer) {
      setScore(score + 1);
    } else {
      setIncorrectIds((prev) => [...prev, quizCards[index].id]);
    }
  };

  const next = () => {
    setSelected(null);
    setShowAnswer(false);

    if (index + 1 < quizCards.length) {
      setIndex(index + 1);
    } else if (!repeatMode && incorrectIds.length > 0 && selectedChapter) {
      // Start repeat mode for incorrect answers
      const repeatedTasks = selectedChapter.tasks.filter((task) =>
        incorrectIds.includes(task.id)
      );
      setQuizCards(repeatedTasks);
      setIndex(0);
      setScore(0);
      setIncorrectIds([]);
      setRepeatMode(true);
    } else {
      // Quiz completed
      alert(`Quiz abgeschlossen! Endpunktzahl: ${score}/${quizCards.length}`);
    }
  };

  if (quizCards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p>Keine Fragen in diesem Kapitel verfügbar.</p>
        <Button onClick={onReset} variant="secondary">
          <RefreshCw className="w-4 h-4 mr-2" /> Zurück zur Kapitelauswahl
        </Button>
      </div>
    );
  }

  const current = quizCards[index];
  const currentContent = current.content as MultipleChoiceContent;

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{selectedChapter.title}</h2>
          <p className="text-sm text-muted-foreground">
            {repeatMode ? "Wiederholung: " : ""}Frage {index + 1} von{" "}
            {quizCards.length}
          </p>
        </div>

        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">
                {currentContent.question}
              </h3>
              <div className="flex flex-col gap-3">
                {currentContent.options.map((option, key) => (
                  <Button
                    key={key}
                    variant={
                      showAnswer
                        ? option === currentContent.correctAnswer
                          ? "default"
                          : option === selected
                          ? "destructive"
                          : "outline"
                        : "outline"
                    }
                    className="justify-start text-left h-auto p-3 whitespace-normal"
                    onClick={() => selectOption(option)}
                    disabled={showAnswer}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {showAnswer && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>💡 Hinweis:</strong> {currentContent.hint}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-muted-foreground">
                Punkte: {score} / {quizCards.length}
              </div>
              <div className="flex gap-2">
                <Button onClick={onReset} variant="secondary" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" /> Kapitel wechseln
                </Button>
                <Button onClick={next} disabled={!showAnswer} size="sm">
                  {index + 1 === quizCards.length ? "Beenden" : "Weiter"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
