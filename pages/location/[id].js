import React from "react";
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

const LocationId = (props) => {
    if (props.id !== undefined || props.id !== null) {
        return (
            <Layout component={<Details id={props.id} />} />
        );
    }

    return <Layout component={<Spinner />} />;
}

/**
 * Refer to https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 * 
 * Get location data from the server first before loading this page
 */
LocationId.getInitialProps = async (ctx) => {
    // Get the ID
    const id = ctx.query.id;

    // Check if id exists
    if (id !== undefined || id !== null) {
        return { id: id };
    }
}

export default LocationId;