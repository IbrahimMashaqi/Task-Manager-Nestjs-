import { Transform } from 'class-transformer';
import { TaskStatus } from '../task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
