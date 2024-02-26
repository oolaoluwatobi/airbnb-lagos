import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import Listing from "./components/Listing";
import getReservations from "@/app/actions/getReservations";
import { getServerSession } from "next-auth";
import getUser from "@/app/actions/getUser";

interface IParams {
  listingId: string;
}

const ListingsPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  // const currentUser = await getCurrentUser();
  const session = await getServerSession();
  const currentUser = await getUser({ userEmail: session?.user?.email });

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <Listing
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};

export default ListingsPage;
