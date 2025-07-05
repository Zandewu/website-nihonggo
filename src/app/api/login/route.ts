// Nihonggo API Route: Login
// Fitur: Autentikasi user/admin, validasi email & password, return role dan data user
// Kebutuhan: Prisma Client, hashing password (bcrypt)

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }
    // Cari user di database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 401 });
    }
    // Cek password (hash)
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }
    // Return data user (role, email, name, point)
    return NextResponse.json({
      email: user.email,
      name: user.name,
      role: user.role,
      point: user.quizPoint,
    });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
