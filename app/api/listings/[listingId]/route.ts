import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";
import getListingById from "@/app/actions/getListingById";

interface IParams {
  listingId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { searchParams } = new URL(request.url);
  const listingId = params.listingId;
  const email = searchParams.get("email");

  // console.log(params, "PARAMS_____");

  if (!listingId || typeof listingId !== "string") {
    return new Response("Invalid request", { status: 400 });
  }

  if (!email || typeof email !== "string") {
    return new Response("Missing parameter email", { status: 401 });
  }

  try {
    const res = await getListingById(listingId);
    const currentUser = await getUser({ userEmail: email });

    if (res) {
      const listing = res;
      return Response.json({ listing, currentUser });
    }
  } catch (error) {
    console.error(error);
    return new Response("Invalid request", { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession();
  const currentUser = await getUser({ userEmail: session?.user?.email });

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
