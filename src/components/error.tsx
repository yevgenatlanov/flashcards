import { Button } from "./ui/button";

export function ErrorScreen({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <p className="text-red-500">Fehler beim Laden der Kapitel: {error}</p>
      <Button onClick={() => window.location.reload()}>Neu laden</Button>
    </div>
  );
}
