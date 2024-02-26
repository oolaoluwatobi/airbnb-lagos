import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import { getServerSession } from "next-auth";
import getUser from "./getUser";

export default async function getProperties() {
  try {
    // const currentUser = await getCurrentUser();
    const session = await getServerSession();
    const currentUser = await getUser({ userEmail: session?.user?.email });

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
