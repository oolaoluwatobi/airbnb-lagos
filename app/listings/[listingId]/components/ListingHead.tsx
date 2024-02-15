import Heading from "@/app/components/Heading";
import { HeartButton } from "@/app/components/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Image from "next/image";

interface IListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null | undefined;
}

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: IListingHeadProps) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)
  
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
        <Image
          src={imageSrc}
          alt={title}
          height={0}
          width={0}
          sizes="100vw"
          priority
          className="rounded-xl h-full w-full object-cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
