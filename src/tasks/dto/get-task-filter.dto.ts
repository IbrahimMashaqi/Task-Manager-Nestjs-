import { Optional } from '@nestjs/common';
import { TaskStatus } from '../task.model';
import { IsEnum, IsString } from 'class-validator';

export class GetTaskFilterDto {
  @Optional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Optional()
  @IsString()
  search?: string;
}
