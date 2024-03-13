import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";

interface IParams {
  email?: string;
}

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

export async function OPTIONS(request: Request) {
  console.log("OPTIONS...");
  const { data } = await request.json();
  const email = data;
  try {
    // const currentUser = await getCurrentUser();
    const session = await getServerSession();
    const currentUser = await getUser({ userEmail: data });

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
