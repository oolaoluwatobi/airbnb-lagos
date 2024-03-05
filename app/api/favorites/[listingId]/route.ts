import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";
import { list } from "postcss";
import { User } from "@prisma/client";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { data } = await request.json();
  const currentUser = data;

  console.log(data, currentUser?.id, "currentUser______favorite/routes.ts");

  const { listingId } = params;

  if (!currentUser?.id) {
    return new Response("Missing parameter currentUserId", { status: 401 });
  }

  if (!listingId || typeof listingId !== "string") {
    return new Response("Missing parameter listingId", { status: 400 });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId!);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
  return Response.json(currentUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();
  const currentUser: User = await request.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
