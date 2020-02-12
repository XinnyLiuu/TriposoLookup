import React from "react";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";
import Details from "../../components/Details";
import fetch from 'isomorphic-unfetch'

/**
 * This file routes to /location/:id 
 * 
 * Refer to https://nextjs.org/docs/routing/dynamic-routes
 * 
 * Shows the details of the location with the given id
 */

const LocationId = (props) => {
    if (props.data !== undefined || props.data !== null) {
        return (
            <Layout component={<Details data={props.data} />} />
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
        try {
            const resp = await fetch(`http://${ctx.req.headers.host}/api/location/${id}`);
            const details = await resp.json();

            return { data: JSON.stringify(details) };
        } catch (e) {
            // TODO: Error handling
            console.log(e);
        }
    }
}

export default LocationId;