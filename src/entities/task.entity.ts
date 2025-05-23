/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Chapter } from "./chapter.entity";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", name: "chapter_id" })
  chapterId: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.tasks, { lazy: true })
  @JoinColumn({ name: "chapter_id" })
  chapter: Promise<Chapter>;

  @Column({ type: "varchar", length: 100 })
  type: string;

  @Column({ type: "varchar", length: 50 })
  difficulty: string;

  @Column({ type: "integer" })
  points: number;

  @Column({ type: "integer", name: "time_estimate" })
  timeEstimate: number;

  @Column({ type: "jsonb" })
  content: any;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;
}
