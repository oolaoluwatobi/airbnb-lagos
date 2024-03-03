import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  // const currentUser = await getCurrentUser();
  // const session = await getServerSession();
  // const currentUser = await getUser({ userEmail: session?.user?.email });

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    throw new Error("Invalid credentials");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user?.hashedPassword) {
    throw new Error("Invalid credentials");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!isCorrectPassword) {
    throw new Error("Invalid credentials");
  }

  return NextResponse.json(user);
}
