import { NextResponse } from "next/server";
import { saveTasksToDatabase } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { tasks, chapterId } = await req.json();

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { error: "Tasks array is required" },
        { status: 400 }
      );
    }

    if (!chapterId) {
      return NextResponse.json(
        { error: "Chapter ID is required" },
        { status: 400 }
      );
    }

    // Convert generated tasks to database format
    const tasksToSave = tasks.map((task) => ({
      chapterId: chapterId,
      type: task.type,
      difficulty: task.difficulty,
      points: task.points,
      timeEstimate: task.timeEstimate,
      content: task.content,
    }));

    console.log(
      `Saving ${tasksToSave.length} tasks to database for chapter ${chapterId}`
    );
    await saveTasksToDatabase(tasksToSave);

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${tasks.length} tasks`,
    });
  } catch (error) {
    console.error("Error in /api/save-tasks:", error);
    return NextResponse.json(
      {
        error: "Failed to save tasks",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
