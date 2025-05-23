import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";

@Entity({ name: "chapters" })
export class Chapter {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "simple-array" })
  grammar_focus: string[];

  @Column({ type: "simple-array" })
  vocabulary_themes: string[];

  @OneToMany(() => Task, (task) => task.chapter)
  tasks: Task[];
}
