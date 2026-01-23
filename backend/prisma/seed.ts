import { PrismaClient, StatusSchedule } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      name: 'Sponge Bob Square Pants',
      email: 'admin@demo.com',
      password: adminPassword,
    },
  });

  const customersData = [
    'Camila Mendes',
    'Beatriz Costa',
    'Joana Barbosa',
    'Lucas Coutinho',
    'Lucas Alex',
    'Anny Cardoso',
  ];

  const customers: any = [];

  for (const name of customersData) {
    const email = `${name.toLowerCase().replace(' ', '.')}@email.com`;
    const customer = await prisma.customer.upsert({
      where: { email: email },
      update: {},
      create: {
        name,
        email: email,
        address:
          'R. Coronel Irineu de Castro nº43, Jardim Anália Franco, São Paulo - SP',
        active: true,
      },
    });

    customers.push(customer);
  }

  const horarios = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  for (let i = 0; i < horarios.length; i++) {
    const customer = customers[i % customers.length];
    const status =
      i < 2
        ? StatusSchedule.EM_ANALISE
        : i < 6
          ? StatusSchedule.AGENDADO
          : StatusSchedule.CANCELADO;

    const date = new Date(`2025-01-22T${horarios[i]}:00`);

    await prisma.schedule.create({
      data: {
        date,
        room: 'Sala 012',
        status,
        customerId: customer.id,
      },
    });
  }

  console.log('✅ Seed finalizado com sucesso!');
}

try {
  main();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  prisma.$disconnect();
}
