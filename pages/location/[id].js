import React from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";

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
            // Get the location based on id
            // TODO: Build out component to show the location details
            return (
                <Layout component={<p>{id}</p>} />
            )
        } catch(e) {
            // TODO: Error handling
            console.log(e);
        }
    }

    return (
        <Layout component={<Spinner />} />
    );
}

/**
 * Retrieves the location based on the id given
 * 
 * @param {*} id 
 */
async function getLocation(id) {
    try {
        const resp = await fetch(`/api/location/${id}`);
        const location = await resp.json();

        return location;
    } catch(e) {
        // TODO: Error handling
        console.log(e);
    }
}

export default LocationId;