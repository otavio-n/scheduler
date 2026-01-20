// import { PrismaClient, StatusSchedule } from '../generated/prisma/client';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Seeding database...');

//   // 🔐 ADMIN
//   const adminPassword = await bcrypt.hash('admin123', 10);

//   const admin = await prisma.user.upsert({
//     where: { email: 'admin@demo.com' },
//     update: {},
//     create: {
//       name: 'Mateus Barbosa',
//       email: 'admin@demo.com',
//       password: adminPassword,
//     },
//   });

//   // 👥 CLIENTES
//   const clientesData = [
//     'Camila Mendes',
//     'Beatriz Costa',
//     'Joana Barbosa',
//     'Lucas Coutinho',
//     'Lucas Alex',
//     'Anny Cardoso',
//   ];

//   const clientes = [];

//   for (const name of clientesData) {
//     const cliente = await prisma.cliente.create({
//       data: {
//         name,
//         email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
//         address:
//           'R. Coronel Irineu de Castro nº43, Jardim Anália Franco, São Paulo - SP',
//         active: true,
//       },
//     });

//     clientes.push(cliente);
//   }

//   // 📅 AGENDAMENTOS (igual às telas)
//   const horarios = [
//     '08:00',
//     '09:00',
//     '10:00',
//     '11:00',
//     '12:00',
//     '13:00',
//     '14:00',
//     '15:00',
//     '16:00',
//   ];

//   for (let i = 0; i < horarios.length; i++) {
//     const cliente = clientes[i % clientes.length];
//     const status =
//       i < 2
//         ? StatusSchedule.EM_ANALISE
//         : i < 6
//           ? StatusSchedule.AGENDADO
//           : StatusSchedule.CANCELADO;

//     const date = new Date(`2025-01-22T${horarios[i]}:00`);

//     await prisma.agendamento.create({
//       data: {
//         date,
//         room: 'Sala 012',
//         status,
//         clienteId: cliente.id,
//       },
//     });
//   }

//   console.log('✅ Seed finalizado com sucesso!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
