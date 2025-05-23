import { NextResponse } from "next/server";
import { getChaptersWithTasks } from "@/lib/data";

export async function GET() {
  try {
    const chapters = await getChaptersWithTasks();
    return NextResponse.json(chapters);
  } catch (error) {
    console.error("Error in /api/chapters:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 }
    );
  }
}
