import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto, TaskStatus, UpdateTaskDto } from './dto/task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ id: 'someId', title: 'Test Task', description: 'Test Desc', status: 'To Do' }),
    create: jest.fn().mockResolvedValue({ id: 'someId', title: 'Test Task', description: 'Test Desc', status: 'To Do' }),
    update: jest.fn().mockResolvedValue({ id: 'someId', title: 'Updated Task', description: 'Updated Desc', status: 'In Progress' }),
    delete: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const result = await controller.findOne('someId');
      expect(result).toEqual({ id: 'someId', title: 'Test Task', description: 'Test Desc', status: 'To Do' });
      expect(service.findOne).toHaveBeenCalledWith('someId');
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const dto: CreateTaskDto = {
        title: 'Test Task', description: 'Test Desc',
        status: TaskStatus.TODO
      };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 'someId', title: 'Test Task', description: 'Test Desc', status: 'To Do' });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a task by ID', async () => {
      const dto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Desc', status: TaskStatus.IN_PROGRESS };
      const result = await controller.update('someId', dto);
      expect(result).toEqual({ id: 'someId', title: 'Updated Task', description: 'Updated Desc', status: 'In Progress' });
      expect(service.update).toHaveBeenCalledWith('someId', dto);
    });
  });

  describe('delete', () => {
    it('should delete a task by ID', async () => {
      const result = await controller.delete('someId');
      expect(result).toEqual({ deleted: true });
      expect(service.delete).toHaveBeenCalledWith('someId');
    });
  });
});

