import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";

export async function POST(request: Request) {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession();
  const currentUser = await getUser({ userEmail: session?.user?.email });

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let query = {};

  const category =
    typeof searchParams.get("category") === "string"
      ? searchParams.get("category")
      : null;
  const roomCount =
    typeof searchParams.get("roomCount") === "string"
      ? searchParams.get("roomCount")
      : null;
  const bathroomCount =
    typeof searchParams.get("bathroomCount") === "string"
      ? searchParams.get("bathroomCount")
      : null;
  const guestCount =
    typeof searchParams.get("guestCount") === "string"
      ? searchParams.get("guestCount")
      : null;
  const startDate =
    typeof searchParams.get("startDate") === "string"
      ? searchParams.get("startDate")
      : null;
  const endDate =
    typeof searchParams.get("endDate") === "string"
      ? searchParams.get("endDate")
      : null;
  const locationValue =
    typeof searchParams.get("locationValue") === "string"
      ? searchParams.get("locationValue")
      : null;
  const email =
    typeof searchParams.get("email") === "string"
      ? searchParams.get("email")
      : null;

  query = {
    category,
    roomCount,
    bathroomCount,
    guestCount,
    startDate,
    endDate,
    locationValue,
  };

  const currentUser = await getUser({ userEmail: email });
  const listings = await getListings(query);

  return NextResponse.json({ listings, currentUser });
}
