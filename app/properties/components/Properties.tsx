'use client'

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';
import { Listing, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface IPropertiesProps {
  listings: Listing[];
  currentUser: User | null;
}

const Properties: FC<IPropertiesProps> = ({ currentUser, listings }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>('')

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted!')
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
        title='Properties'
        subtitle='List of places your properties!'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            actionLabel='Delete property'
            disabled={deletingId === listing.id}

          />
        ))}
      </div>
    </Container>
  )
}

export default Properties