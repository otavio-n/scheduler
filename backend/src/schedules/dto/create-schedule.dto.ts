import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ScheduleStatus } from './schedule-status.enum';

export class CreateScheduleDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  room: string;

  @IsEnum(ScheduleStatus)
  @IsNotEmpty()
  status: ScheduleStatus;
}
