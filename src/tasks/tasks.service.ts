import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) throw new NotFoundException(`Task with ID: ${id} not found`);
    return found;
  }

  async CreateTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
}

//   getAllTasks(): Task[] {
//     return this.tasks;
//   }

//   getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
//     const { status, search } = filterDto;
//     let tasks = this.tasks;
//     if (status) {
//       tasks = tasks.filter((task) => task.status === status);
//     }

//     if (search) {
//       tasks = tasks.filter(
//         (task) =>
//           task.title.toLocaleLowerCase().includes(search) ||
//           task.description.toLocaleLowerCase().includes(search),
//       );
//     }
//     return tasks;
//   }

//   getTaskByID(id: string): Task {
//     const task = this.tasks.find((task) => task.id === id);
//     if (!task) throw new NotFoundException(`Task with ID: ${id} not found.`);
//     return task;
//   }

//   deleteTask(id: string): void {
//     this.tasks = this.tasks.filter((task) => task.id !== id);
//   }

//   updateTaskStatus(id: string, status: TaskStatus): Task {
//     const task: Task = this.getTaskByID(id);
//     task.status = status;
//     return task;
//   }
// }
