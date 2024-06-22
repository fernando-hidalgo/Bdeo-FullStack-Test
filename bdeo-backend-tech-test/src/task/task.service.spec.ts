import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTaskDto, TaskStatus, UpdateTaskDto } from './dto/task.dto';
import { Model } from 'mongoose';

const mockTask = {
  id: 'someId',
  title: 'Test Task',
  description: 'Test Desc',
  status: TaskStatus.TODO,
};

const mockTaskModel = () => ({
  find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockTask]) }),
  findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockTask) }),
  create: jest.fn().mockImplementation((task: Partial<Task>) => ({
    ...task,
    save: jest.fn().mockResolvedValue(task),
  })),
  findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockTask) }),
  deleteOne: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue({ deletedCount: 1 }) }),
});

type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;

describe('TaskService', () => {
  let service: TaskService;
  let model: MockModel<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel(),
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    model = module.get<MockModel<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = await service.findAll();
      expect(tasks).toEqual([mockTask]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const task = await service.findOne('someId');
      expect(task).toEqual(mockTask);
      expect(model.findById).toHaveBeenCalledWith('someId');
    });

    it('should throw NotFoundException if task not found', async () => {
      model.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(null) });
      await expect(service.findOne('someId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Desc', status: TaskStatus.TODO };
      const result = await service.create(createTaskDto);
      expect(result).toEqual(expect.objectContaining(createTaskDto));
      expect(model.create).toHaveBeenCalledWith(createTaskDto);
    });

    it('should throw BadRequestException on validation error', async () => {
      model.create.mockImplementationOnce(() => {
        throw { name: 'ValidationError' };
      });
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Desc', status: TaskStatus.TODO };
      await expect(service.create(createTaskDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a task by ID with a valid status transition', async () => {
        model.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockTask) });
        const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Desc', status: TaskStatus.IN_PROGRESS };
        const result = await service.update('someId', updateTaskDto);
        expect(result).toEqual(mockTask);
        expect(model.findById).toHaveBeenCalledWith('someId');
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', updateTaskDto, { new: true, runValidators: true });
    });

    it('should throw BadRequestException for invalid status transition', async () => {
        model.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockTask) });
        const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Desc', status: TaskStatus.DONE };
        await expect(service.update('someId', updateTaskDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if task not found', async () => {
        model.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(null) });
        const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Desc', status: TaskStatus.IN_PROGRESS };
        await expect(service.update('someId', updateTaskDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException on validation error', async () => {
        model.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(mockTask) });
        model.findByIdAndUpdate.mockImplementationOnce(() => {
            throw { name: 'ValidationError' };
        });
        const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Desc', status: TaskStatus.IN_PROGRESS };
        await expect(service.update('someId', updateTaskDto)).rejects.toThrow(BadRequestException);
    });
});


  describe('delete', () => {
    it('should delete a task by ID', async () => {
      const result = await service.delete('someId');
      expect(result).toEqual({ deleted: true });
      expect(model.deleteOne).toHaveBeenCalledWith({ _id: 'someId' });
    });

    it('should throw NotFoundException if task not found', async () => {
      model.deleteOne.mockReturnValueOnce({ exec: jest.fn().mockResolvedValue({ deletedCount: 0 }) });
      await expect(service.delete('someId')).rejects.toThrow(NotFoundException);
    });
  });
});
