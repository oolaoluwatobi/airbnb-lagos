import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";
import { list } from "postcss";
import { User } from "@prisma/client";

interface IParams {
  listingId?: string;
  userId?: string;
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
  { params }: { params: IParams },
  searchParams: any
) {
  console.log(params, searchParams, "DELETE______favorite/routes.ts");
  // const { data } = await request.json();
  // const currentUser = data;

  const { listingId, userId } = params;

  if (!userId) {
    return new Response("Missing parameter currentUserId", { status: 401 });
  }

  if (!listingId || typeof listingId !== "string") {
    return new Response("Missing parameter listingId", { status: 400 });
  }

  // let favoriteIds = [...(currentUser.favoriteIds || [])];

  // favoriteIds = favoriteIds.filter((id) => id !== listingId);

  console.log(listingId, "beforeFetch______favorite/del/routes.ts");

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  console.log(listingId, "after1stFetch______favorite/del/routes.ts");

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      favoriteIds: {
        set: currentUser?.favoriteIds?.filter((id: string) => id !== listingId),
      },
    },
  });

  console.log(listingId, "aftreFetchcurrentUser______favorite/del/routes.ts");
  return NextResponse.json(updatedUser);
}
