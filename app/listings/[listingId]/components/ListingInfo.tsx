import { Reservation, User } from '@prisma/client';
import { FC } from 'react'
import { categories } from '@/utils/categoriesData';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '@/app/components/Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });

interface IListingInfoProps {
  user: User;
  category: (typeof categories[0]) | undefined;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  reservations: Reservation[] | undefined;
  locationValue: string;
}

const ListingInfo: FC<IListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  reservations,
  locationValue
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  
  return (
    <div className='col-span-4 flex flex-col gap-8   '>
      <div className='flex flex-col gap-2   '>
        <div className='text-xl font-semibold flex flex-row items-center gap-2   '>
          <div>Hosted by {user.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4'>
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category ? (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      ) : null}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo