import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import { getServerSession } from "next-auth";
import getUser from "./getUser";

export default async function getFavoriteListings() {
  try {
    // const currentUser = await getCurrentUser();
    const session = await getServerSession();
    const currentUser = await getUser({ userEmail: session?.user?.email });

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
