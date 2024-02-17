'use client'

import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useState } from "react";
import { toast } from 'react-hot-toast'

interface IReservationProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser?: User;
}
// reservaton:  (Reservation & { "listing": Listing})[] ,
// reservaton:  {"reservations": ((Listing & User)[])},
// reservaton:  {"reservations": ((Listing & User)[]), "currentUser": User},

const Reservations: FC<IReservationProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    fetch(`/api/reservations/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => {
      toast.success('Reservation cancelled');
      router.refresh();
    }).catch(err => {
      toast.error('Failed to cancel reservation');
    }).finally(() => {
      setDeletingId('');
    })
  }, [router])
  
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
  )
};

export default Reservations;
