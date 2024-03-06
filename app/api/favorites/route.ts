import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";
import { list } from "postcss";
import { User } from "@prisma/client";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

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
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  console.log(params, "PUT______favorite/routes.ts");
  const { data } = await request.json();
  const currentUser = data;

  const { listingId } = params;

  if (!currentUser?.id) {
    return new Response("Missing parameter currentUserId", { status: 401 });
  }

  if (!listingId || typeof listingId !== "string") {
    return new Response("Missing parameter listingId", { status: 400 });
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

  console.log(data, listingId, "currentUser______favorite/put/routes.ts");
  return NextResponse.json(user);
}

export async function OPTIONS(request: Request) {
  const { data } = await request.json();
  const currentUser = data;

  const favoriteListings = await getFavoriteListings(currentUser);

  // const listings = await getListings(query);

  return NextResponse.json({ favoriteListings, currentUser });
}
