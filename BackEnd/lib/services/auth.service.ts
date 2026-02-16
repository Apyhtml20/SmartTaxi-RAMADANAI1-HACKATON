import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function registerUser(input: {
  fullName: string;
  email: string;
  password: string;
  role: "DRIVER" | "PASSENGER";
}) {
  const { fullName, email, password, role } = input;

  if (!fullName || !email || !password || !role) {
    throw new Error("Missing fields: fullName, email, password, role");
  }
  if (!["DRIVER", "PASSENGER"].includes(role)) {
    throw new Error("Invalid role. Use DRIVER or PASSENGER");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { fullName, email, passwordHash, role },
    select: { id: true, fullName: true, email: true, role: true },
  });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
}

export async function loginUser(input: { email: string; password: string }) {
  const { email, password } = input;

  if (!email || !password) throw new Error("Missing email or password");

  const userRecord = await prisma.user.findUnique({ where: { email } });
  if (!userRecord) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, userRecord.passwordHash);
  if (!ok) throw new Error("Invalid credentials");

  const user = {
    id: userRecord.id,
    fullName: userRecord.fullName,
    email: userRecord.email,
    role: userRecord.role,
  };

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
}
