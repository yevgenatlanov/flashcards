import { getDatabase } from "@/config/db.config";
import { Chapter } from "@/entities/chapter.entity";
import { Task } from "@/entities/task.entity";
import { ChapterWithTasks, NewTaskData } from "@/types";

export async function saveTasksToDatabase(tasks: NewTaskData[]): Promise<void> {
  if (!tasks.length) return;

  try {
    const dataSource = await getDatabase();
    const taskRepository = dataSource.getRepository(Task);

    // Cleaner task creation using Object.assign
    const taskEntities = tasks.map((taskData) =>
      Object.assign(new Task(), taskData)
    );

    await taskRepository.save(taskEntities);
    console.log(`Successfully saved ${tasks.length} tasks to database`);
  } catch (error) {
    console.error("Error saving tasks to database:", error);
    throw new Error("Failed to save tasks to database");
  }
}

export async function getChaptersWithTasks(): Promise<ChapterWithTasks[]> {
  try {
    const dataSource = await getDatabase();
    const chapterRepository = dataSource.getRepository(Chapter);

    const chapters = (await chapterRepository.find({
      relations: ["tasks"],
    })) as ChapterWithTasks[];

    // Return directly - no need for manual mapping if entity matches interface
    return chapters;
  } catch (error) {
    console.error("Error fetching chapters with tasks:", error);
    throw new Error("Failed to fetch chapters and tasks from database");
  }
}

export async function getChapterById(
  id: string
): Promise<ChapterWithTasks | null> {
  if (!id) return null;

  try {
    const dataSource = await getDatabase();
    const chapterRepository = dataSource.getRepository(Chapter);

    const chapter = (await chapterRepository.findOne({
      where: { id },
      relations: ["tasks"],
    })) as ChapterWithTasks | null;

    // Return directly if your entity structure matches the interface
    return chapter || null;
  } catch (error) {
    console.error("Error fetching chapter by ID:", error);
    throw new Error("Failed to fetch chapter from database");
  }
}
