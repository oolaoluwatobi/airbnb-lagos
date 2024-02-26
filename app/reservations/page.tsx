import { Suspense } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import EmptyState from "../components/EmptyState";
import Reservations from "./components/Reservations";
import { getServerSession } from "next-auth";
import getUser from "../actions/getUser";

const ReservatonsPage = async () => {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession();
  const currentUser = await getUser({ userEmail: session?.user?.email });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations "
      />
    );
  }

  return (
    <>
      <Suspense fallback={<div>Loading..</div>}>
        <Reservations currentUser={currentUser} reservations={reservations} />
      </Suspense>
    </>
  );
};

export default ReservatonsPage;
