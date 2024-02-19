import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getProperties() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // const userId = /* the ID of the user */

    const listings = await prisma.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
