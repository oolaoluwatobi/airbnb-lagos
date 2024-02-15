'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { Reservation, Listing as TListing, User } from "@prisma/client";

import ListingInfo from "./ListingInfo";

import Container from "@/app/components/Container";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingHead from "./ListingHead";
import { categories } from "@/utils/categoriesData";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IListingProps {
  reservations?: Reservation[];
  listing: TListing & { user: User };
  currentUser?: User | null;
}

const Listing = ({
  reservations = [],
  listing,
  currentUser,
}: IListingProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
 
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen()
      return;
    }

    setIsLoading(true);
    // Create reservation
    axios.post("/api/reservations", {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    })
    .then(() => {
      toast.success("Listing reserved");
      setDateRange(initialDateRange);
      // Redirect to trips
      router.refresh();
    })
    .catch(() => {
      toast.error("Something went wrong. Please try again.");
    })
    .finally(() => {
      setIsLoading(false);
    });

  }, [currentUser, dateRange, totalPrice, listing?.id, router, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }

      setTotalPrice(dayCount * listing.price);
    }
  }, [listing?.price, dateRange.startDate, dateRange.endDate]);
  
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservations) => {
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-5">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              reservations={reservations}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: Range) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
