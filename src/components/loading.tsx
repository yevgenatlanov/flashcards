"use client";

import { Loader2 } from "lucide-react";

// Loading Component
export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p>Kapitel werden geladen...</p>
    </div>
  );
}
