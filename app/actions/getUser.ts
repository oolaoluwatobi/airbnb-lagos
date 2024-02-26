import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prisma from "@/app/libs/prismadb";

interface Props {
  userEmail?: string | null;
}

// async function getSessionUser() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return null;
//   }
// }
export default async function getUser({ userEmail }: Props) {
  try {
    if (!userEmail) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;

    // Merge the user data returned from the database with the JWT claims
    // to create a single object for the session
    // const user = {
    //   ...currentUser,
    //   ...session.user,
    // };
    // return user;
  } catch (error) {
    return null;
  }
}
