import { Suspense } from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { unstable_noStore } from "next/cache";

interface HomeProps {
  // searchParams: { [key: string]: string | string[] | undefined };
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  unstable_noStore();
  let query = {};
  const category =
    typeof searchParams.category === "string" ? searchParams.category : null;
  const roomCount =
    typeof searchParams.roomCount === "string" ? searchParams.roomCount : null;
  const bathroomCount =
    typeof searchParams.bathroomCount === "string"
      ? searchParams.bathroomCount
      : null;
  const guestCount =
    typeof searchParams.guestCount === "string"
      ? searchParams.guestCount
      : null;
  const startDate =
    typeof searchParams.startDate === "string" ? searchParams.startDate : null;
  const endDate =
    typeof searchParams.endDate === "string" ? searchParams.endDate : null;
  const locationValue =
    typeof searchParams.locationValue === "string"
      ? searchParams.locationValue
      : null;

  query = {
    category,
    roomCount,
    bathroomCount,
    guestCount,
    startDate,
    endDate,
    locationValue,
  };

  const listings = await getListings(query);
  const currentUser = await getCurrentUser();

  console.log(listings, "LISTINGS____");
  console.log(searchParams, category, "searchparams____");

  if (listings.length === 0) {
    return (
      <Container>
        <EmptyState showReset />
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <Suspense fallback={<div>Loading..</div>}>
          {listings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            );
          })}
        </Suspense>
      </div>
    </Container>
  );
}
