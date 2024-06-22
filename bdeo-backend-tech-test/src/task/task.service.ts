import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto, TaskStatus, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async findAll() {
        try {
            const tasks = await this.taskModel.find().exec();
            return tasks;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string): Promise<Task> {
        try {
            const task = await this.taskModel.findById(id).exec();
            if (!task) {
                throw new NotFoundException(`Task with id ${id} not found`);
            }
            return task;
        } catch (error) {
            if (error.name === 'CastError' || error.kind === 'ObjectId') {
                throw new NotFoundException(`Task with id ${id} not found`);
            }
            throw error;
        }
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const createdTask = await this.taskModel.create(createTaskDto);
            return createdTask;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Invalid task data');
            }
            throw error;
        }
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        try {
            const existingTask = await this.taskModel.findById(id).exec();
            if (!existingTask) {
                throw new NotFoundException(`Task with id ${id} not found`);
            }
    
            // Validate correct status flow: TO DO <-> IN_PROGRESS <-> DONE
            // TO DO -> DONE is not allowed
            const validTransitions = {
                [TaskStatus.TODO]: [TaskStatus.TODO, TaskStatus.IN_PROGRESS],
                [TaskStatus.IN_PROGRESS]: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
                [TaskStatus.DONE]: [TaskStatus.IN_PROGRESS, TaskStatus.DONE]
            };
    
            if (updateTaskDto.status && !validTransitions[existingTask.status].includes(updateTaskDto.status)) {
                throw new BadRequestException(`Invalid status transition from ${existingTask.status} to ${updateTaskDto.status}`);
            }
    
            const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
                new: true,
                runValidators: true,
            }).exec();
    
            return updatedTask;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Invalid task data');
            }
            if (error.name === 'CastError' || error.kind === 'ObjectId') {
                throw new NotFoundException(`Task with id ${id} not found`);
            }
            throw error;
        }
    }
    

    async delete(id: string): Promise<{ deleted: boolean }> {
        try {
            const result = await this.taskModel.deleteOne({ _id: id }).exec();
            if (result.deletedCount === 0) {
                throw new NotFoundException(`Task with id ${id} not found`);
            }
            return { deleted: true };
        } catch (error) {
            if (error.name === 'CastError' || error.kind === 'ObjectId') {
                throw new NotFoundException(`Task with id ${id} not found`);
            }
            throw error;
        }
    }
}