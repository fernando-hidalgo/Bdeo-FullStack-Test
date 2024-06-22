import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    @ApiTags('Tasks')
    @ApiResponse({ status: 200, description: 'Tasks found.' })
    @ApiResponse({ status: 404, description: 'Tasks NOT found.' })
    @ApiOperation({ summary: 'Get all Tasks'})
    async findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':taskId')
    @ApiTags('Tasks')
    @ApiParam({ name: 'taskId', required: true })
    @ApiResponse({ status: 200, description: 'Task found.' })
    @ApiResponse({ status: 404, description: 'Task NOT found.' })
    @ApiOperation({ summary: 'Get Task by ID'})
    async findOne(@Param('taskId') id: string): Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Post()
    @ApiTags('Tasks')
    @ApiBody({ type: CreateTaskDto })
    @ApiResponse({ status: 200, description: 'Task created sucessfully.' })
    @ApiOperation({ summary: 'Create Task'})
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Put(':taskId')
    @ApiTags('Tasks')
    @ApiBody({ type: UpdateTaskDto })
    @ApiResponse({ status: 200, description: 'Task updated sucessfully.' })
    @ApiResponse({ status: 404, description: 'Task NOT found.' })
    @ApiParam({ name: 'taskId', required: true })
    @ApiOperation({ summary: 'Update Task by ID'})
    async update(@Param('taskId') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':taskId')
    @ApiTags('Tasks')
    @ApiResponse({ status: 200, description: 'Task deleted sucessfully.' })
    @ApiResponse({ status: 404, description: 'Task NOT found.' })
    @ApiParam({ name: 'taskId', required: true })
    @ApiOperation({ summary: 'Delete Task by ID'})
    async delete(@Param('taskId') id: string): Promise<{ deleted: boolean }> {
        return this.taskService.delete(id);
    }
}
