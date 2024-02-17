import useCountries from "@/app/hooks/useCountries";

import { Listing, Reservation, User } from "@prisma/client";
import { FC, MouseEvent, useCallback, useMemo } from "react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { HeartButton } from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null | undefined;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const isOwner = useMemo(() => {
    if (currentUser) {
      return currentUser.id === data.userId;
    }

    return false;
  }, [currentUser, data]);

  return (
    <Link href={`/listings/${data.id}`}>
      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              src={data.imageSrc}
              alt={"listing"}
              height={0}
              width={0}
              sizes="100vw"
              priority
              className="rounded-xl w-full h-full object-cover group-hover:scale-110 transition-all"
            />
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </div>
          <p className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </p>
          <p className="font-light text-neutral-500">
            {reservationDate || data?.category}
          </p>
          <div className="flex flex-row items-center gap-1 ">
            <p className="font-semibold">$ {price}</p>
            {!reservation ? <p className="font-light">night</p> : null}
          </div>
            {onAction && actionLabel ? (
              <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
              />
            ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
