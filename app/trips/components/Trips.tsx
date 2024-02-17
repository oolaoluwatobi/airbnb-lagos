'use client'

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';
import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast';

interface ITripsProps {
  reservations: (Reservation & { "listing": Listing})[]
  currentUser?: User;
}

const Trips: FC<ITripsProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = React.useState<string | null>('')

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error?.response?.data?.message || error?.response?.data?.error || 'Something went wrong')
      })
      .finally(() => {
        setDeletingId(null)
        router.refresh()
      })  
    
  }, [router])

  useEffect(() => {
    router.refresh()
  }, [router])
  
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle='Where you&apos;ve been and where you&apos;re going'
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            actionLabel='Cancel reservation'
            currentUser={currentUser}

          />
        ))}
      </div>
    </Container>
  )
}

export default Trips