// Nihonggo Seed Script
// Jalankan dengan: npx tsx prisma/seed.ts
// Akan membuat user admin dan user biasa dengan password sudah di-hash

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@nihonggo.com',
        password: adminPassword,
        role: 'admin',
        name: 'Admin Nihonggo',
      },
      {
        email: 'user@nihonggo.com',
        password: userPassword,
        role: 'user',
        name: 'User Nihonggo',
      },
    ],
    skipDuplicates: true,
  });
  console.log('Seed selesai!');
}

main().finally(() => prisma.$disconnect());
