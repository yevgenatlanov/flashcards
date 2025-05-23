import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";

@Entity({ name: "user_progress" })
export class UserProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  user_id: string;

  @Column({ type: "uuid" })
  task_id: string;

  @Column({ type: "boolean" })
  correct: boolean;

  @Column({ type: "integer", default: 1 })
  attempts: number;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "last_attempt",
  })
  lastAttempt: Date;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: "user_id" })
  user: Promise<User>;

  @ManyToOne(() => Task, { lazy: true })
  @JoinColumn({ name: "task_id" })
  task: Promise<Task>;
}
