import React from "react";
import EmptyState from "../components/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import Favorites from "./components/Favorites";
import { getServerSession } from "next-auth";
import getUser from "../actions/getUser";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  // const currentUser = await getCurrentUser();
  const session = await getServerSession();
  const currentUser = await getUser({ userEmail: session?.user?.email });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites yet"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return <Favorites listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
