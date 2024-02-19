import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';
import { Listing, User } from '@prisma/client';
import React, { FC } from 'react'

interface IFavoritesProps {
  listings: Listing[];
  currentUser: User | null;
}

const Favorites: FC<IFavoritesProps> = ({ currentUser, listings }) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default Favorites