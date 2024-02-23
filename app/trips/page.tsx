import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Trips from "./components/Trips";
import { Suspense } from "react";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found!"
        subtitle="Looks like you havent reserved any trips"
      />
    );
  }

  return (
    <>
      <Suspense fallback={<div>Loading..</div>}>
        <Trips reservations={reservations} currentUser={currentUser} />
      </Suspense>
    </>
  );
};

export default TripsPage;
