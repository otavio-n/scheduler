import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { QuerySchedulesDto } from './dto/query-schedules.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  private data = [
    {
      id: 1,
      name: 'Camila Mendes',
      date: '2025-01-22T16:00',
      room: 'Sala 012',
      status: 'EM_ANALISE',
    },
    {
      id: 2,
      name: 'Anny Cardoso',
      date: '2025-01-22T09:00',
      room: 'Sala 012',
      status: 'AGENDADO',
    },
  ];

  create(createScheduleDto: CreateScheduleDto) {
    return this.data.push(createScheduleDto);
  }

  async findAll({ page = 1, limit = 10, customerId, date }: QuerySchedulesDto) {
    const items = await this.prisma.schedule.findMany({
      where: { customerId, date: { gte: date } },
    });

    const total = items.length;
    const start = (page - 1) * limit;

    return {
      data: items.slice(start, start + limit),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 0,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
