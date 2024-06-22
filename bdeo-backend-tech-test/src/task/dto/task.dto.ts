import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(TaskStatus)
    @ApiProperty()
    readonly status: TaskStatus;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly title?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    @ApiProperty()
    readonly status?: TaskStatus;
}