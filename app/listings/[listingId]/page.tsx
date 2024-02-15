import EmptyState from '@/app/components/EmptyState'

import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import Listing from './components/Listing'
import getReservations from '@/app/actions/getReservations'

interface IParams {
  listingId: string
}

const ListingsPage = async ({ params}: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  
  if (!listing) {

    return (
      <EmptyState />
    )
  }
  
  return (
    <div>
      <Listing
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  )
}

export default ListingsPage