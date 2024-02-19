import React from "react";
import EmptyState from "../components/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import Favorites from "./components/Favorites";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites yet"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <Favorites 
      listings={listings} 
      currentUser={currentUser}
    />
  )
};

export default FavoritesPage;
