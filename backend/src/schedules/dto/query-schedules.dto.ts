import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QuerySchedulesDto {
  @ApiPropertyOptional({
    minimum: 1,
    type: Number,
    required: false,
    description: 'Customer ID',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @ApiPropertyOptional({
    type: Date,
    required: false,
    description: 'Schedule date',
    default: '2025-01-22T13:00:00.000Z',
  })
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({
    minimum: 1,
    type: Number,
    default: 1,
  })
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    type: Number,
    default: 10,
  })
  @IsOptional()
  limit: number = 10;
}
