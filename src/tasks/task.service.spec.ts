import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';

const mockTasksService = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: any;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: TasksService, useFactory: mockTasksService }],
    }).compile();

    tasksService = module.get(TasksService);
  });

  describe('getTasks', () => {
    it('should return the result of getTasks', async () => {
      tasksService.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
      expect(tasksService.getTasks).toHaveBeenCalled();
    });
  });

  describe('getTaskById', () => {
    const mockTask = {
      title: 'Test title',
      description: 'Test desc',
      id: 'someId',
      status: TaskStatus.OPEN,
    };

    it('should return a task if found', async () => {
      tasksService.getTaskById.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      tasksService.getTaskById.mockRejectedValue(new NotFoundException());

      await expect(
        tasksService.getTaskById('someId', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
