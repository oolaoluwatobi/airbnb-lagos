import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

const getListingById = async (listingId: string | null) => {
  // const { listingId } = params;

  if (!listingId) {
    throw new Error("Listing ID is required");
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      user: true,
    },
  });

  if (!listing) {
    return null;
  }

  return listing;
};

export default getListingById;
