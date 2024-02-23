"use client";

import React from "react";
import ListingCard from "./listings/ListingCard";
import { useQuery } from "@tanstack/react-query";
import getListings, { IListingsParams } from "../actions/getListings";
import { Container } from "postcss";
import EmptyState from "./EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import { useSearchParams } from "next/navigation";
import { User } from "@prisma/client";

interface IListingPageProps {
  searchParams: IListingsParams;
  currentUser: User;
}

const ListingsPage = ({ searchParams, currentUser }: IListingPageProps) => {
  // const searchParams = useSearchParams()

  const {
    data: user,
    error: userError,
    isFetched: userIsFetched,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    initialData: currentUser,
  });
  console.log(user, searchParams, "user____");
  return <div>{user?.name}</div>;

  // const {
  //   data: listings,
  //   error,
  //   isFetched,
  // } = useQuery({
  //   queryKey: ["listings"],
  //   queryFn: () => getListings(searchParams),
  // });

  // console.log(listings, "LISTINGS____");

  // if (listings?.length === 0) {
  //   return (
  //     <EmptyState showReset />
  //     // <Container>
  //     // </Container>
  //   );
  // }

  // return (
  //   <>
  //     {listings?.map((listing) => {
  //       return (
  //         <ListingCard
  //           key={listing.id}
  //           data={listing}
  //           // currentUser={currentUser}
  //         />
  //       );
  //     })}
  //   </>
  // );
};

export default ListingsPage;
