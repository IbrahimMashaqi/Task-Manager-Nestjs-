import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async getTaskById(id: string, user): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) throw new NotFoundException(`Task with ID: "${id}" not found`);
    return found;
  }

  async CreateTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      user: user,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID: "${id}" not found.`);
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    let task: Task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search?.trim()) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER (task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    const task = await query.getMany();
    return task;
  }
}
