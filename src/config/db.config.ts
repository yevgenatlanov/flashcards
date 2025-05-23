import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "@/entities/task.entity";
import { Chapter } from "@/entities/chapter.entity";
import { User } from "@/entities/user.entity";
import { UserProgress } from "@/entities/user-progress.entity";

let dataSource: DataSource | null = null;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [Task, Chapter, User, UserProgress],
  dropSchema: false,
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  logging: process.env.NODE_ENV === "development" ? ["error", "warn"] : false,
});

export async function getDatabase(): Promise<DataSource> {
  if (!dataSource || !dataSource.isInitialized) {
    if (!process.env.POSTGRES_URL) {
      throw new Error("POSTGRES_URL is not defined");
    }

    try {
      console.log("Initializing database connection...");
      dataSource = await AppDataSource.initialize();
      console.log("Database connection initialized successfully");
    } catch (error) {
      console.error("Error during database initialization:", error);
      throw error;
    }
  }

  return dataSource;
}
