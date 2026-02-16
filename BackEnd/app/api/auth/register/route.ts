import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { corsOptionsResponse, withCors } from "@/lib/cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function OPTIONS() {
  return corsOptionsResponse();
}

function signToken(payload: any) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  // token 7 jours
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "").toUpperCase(); // "DRIVER" | "PASSENGER"

    if (!fullName || !email || !password || !role) {
      const res = NextResponse.json(
        { error: "fullName, email, password, role are required" },
        { status: 400 }
      );
      return withCors(res);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const res = NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      return withCors(res);
    }

    if (password.length < 6) {
      const res = NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
      return withCors(res);
    }

    if (role !== "DRIVER" && role !== "PASSENGER") {
      const res = NextResponse.json(
        { error: "role must be DRIVER or PASSENGER" },
        { status: 400 }
      );
      return withCors(res);
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const res = NextResponse.json({ error: "Email already exists" }, { status: 409 });
      return withCors(res);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        role, // doit matcher ton enum/string en DB
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });

    const token = signToken({ sub: user.id, role: user.role });

    const res = NextResponse.json({ token, user }, { status: 201 });
    return withCors(res);
  } catch (err: any) {
    console.error("REGISTER ERROR =>", err);
    const res = NextResponse.json(
      { error: err?.message || "Bad request" },
      { status: 400 }
    );
    return withCors(res);
  }
}
