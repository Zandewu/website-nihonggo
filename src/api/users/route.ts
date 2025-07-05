import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcryptjs';



const prisma = new PrismaClient();



// GET: Ambil semua user dengan pagination & sort

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);

  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const sort = searchParams.get("sort") || "id";

  const order = (searchParams.get("order") || "asc") as "asc" | "desc";



  const skip = (page - 1) * pageSize;

  const take = pageSize;



  const [users, total] = await Promise.all([

    prisma.user.findMany({

      skip,

      take,

      orderBy: { [sort]: order },

      select: { id: true, email: true, name: true, quizPoint: true, role: true }

    }),

    prisma.user.count()

  ]);

  return NextResponse.json({ users, total });

}



// POST: Tambah user baru

export async function POST(req: NextRequest) {

  const { email, password, name, quizPoint, role } = await req.json();

  if (!email || !password) {

    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });

  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {

    return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 400 });

  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({

    data: { email, password: hash, name, quizPoint: quizPoint || 0, role: role || 'user' }

  });

  return NextResponse.json({ id: user.id, email: user.email, name: user.name, quizPoint: user.quizPoint, role: user.role });

}



// PATCH: Update point/role user

export async function PATCH(req: NextRequest) {

  const { id, quizPoint, role } = await req.json();

  if (!id) return NextResponse.json({ error: 'ID user wajib.' }, { status: 400 });

  const user = await prisma.user.update({

    where: { id },

    data: { quizPoint, role },

    select: { id: true, email: true, name: true, quizPoint: true, role: true }

  });

  return NextResponse.json(user);

}



// DELETE: Hapus user

export async function DELETE(req: NextRequest) {

  const { id } = await req.json();

  if (!id) return NextResponse.json({ error: 'ID user wajib.' }, { status: 400 });

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });

}

