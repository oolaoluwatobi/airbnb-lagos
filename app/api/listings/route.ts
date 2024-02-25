import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

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

  const category = searchParams.get("category");
  const roomCount = searchParams.get("roomCount");
  const bathroomCount = searchParams.get("bathroomCount");
  const guestCount = searchParams.get("guestCount");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const locationValue = searchParams.get("locationValue");

  // const category =
  //   typeof searchParams.category === "string" ? searchParams.category : null;
  // const roomCount =
  //   typeof searchParams.roomCount === "string" ? searchParams.roomCount : null;
  // const bathroomCount =
  //   typeof searchParams.bathroomCount === "string"
  //     ? searchParams.bathroomCount
  //     : null;
  // const guestCount =
  //   typeof searchParams.guestCount === "string"
  //     ? searchParams.guestCount
  //     : null;
  // const startDate =
  //   typeof searchParams.startDate === "string" ? searchParams.startDate : null;
  // const endDate =
  //   typeof searchParams.endDate === "string" ? searchParams.endDate : null;
  // const locationValue =
  //   typeof searchParams.locationValue === "string"
  //     ? searchParams.locationValue
  //     : null;

  query = {
    category,
    roomCount,
    bathroomCount,
    guestCount,
    startDate,
    endDate,
    locationValue,
  };

  const listings = await getListings(query);

  return NextResponse.json(listings);
}
