import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";

export async function GET(request: Request) {
  console.log("GETTING...");

  try {
    // const currentUser = await getCurrentUser();
    const session = await getServerSession();
    const currentUser = await getUser({ userEmail: session?.user?.email });

    if (!currentUser) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
        data: null,
      });
    }

    return NextResponse.json({
      message: "Success",
      status: 200,
      data: currentUser,
    });
  } catch (error: any) {
    console.log("ERROR :", error, error?.message);
    return NextResponse.json({
      Error: "Something went wrong, failed to get user",
    });
  }
}
