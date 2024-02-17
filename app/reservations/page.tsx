import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import EmptyState from "../components/EmptyState"
import Reservations from "./components/Reservations";

const ReservatonsPage = async () => {
  const currentUser = await getCurrentUser();
  
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
    )
  }
  
  return (
    <Reservations
    currentUser={currentUser}
    reservations={reservations}
    />
  )
}

export default ReservatonsPage