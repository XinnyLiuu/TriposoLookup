import React from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";
import Details from "../../components/Details";

/**
 * This file routes to /location/:id 
 * 
 * Refer to https://nextjs.org/docs/routing/dynamic-routes
 * 
 * Shows the details of the location with the given id
 */

const LocationId = () => {
    // Get the ID
    const router = useRouter();
    const id = router.query.id;

    // Check if id exists
    if (id !== undefined || id !== null) {
        try {
            // Render the location deatils
            return (
                <Layout component={<Details id={id} />} />
            )
        } catch (e) {
            // TODO: Error handling
            console.log(e);
        }
    }

    return (
        <Layout component={<Spinner />} />
    );
}

export default LocationId;