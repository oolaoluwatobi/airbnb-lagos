import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import Properties from "./components/Properties";
import getProperties from "../actions/getProperties";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  // const listings = await getProperties();
  const listings = await getListings({ userId: currentUser?.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties yet"
        subtitle="Looks like you have no properties."
      />
    );
  }

  if (!currentUser) {
    return (
      <EmptyState
        title="No properties yet"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <Properties 
      listings={listings} 
      currentUser={currentUser}
    />
  )
};

export default PropertiesPage;
