import { IsOptional, IsString } from 'class-validator';

export class QuerySchedulesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  date?: string;

  @IsOptional()
  page: number = 1;

  @IsOptional()
  limit: number = 10;
}
