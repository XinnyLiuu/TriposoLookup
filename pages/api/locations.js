import { connect, find } from "../../utils/mongo";

/**
 * Refer to https://nextjs.org/docs/api-routes/introduction
 * 
 * This file routes to the endpoint /api/locations
 * 
 * Retrieves all data regarding the location collection in MongoDB
 */

export default async (req, res) => {
    try {
        // Connect to MongoDB
        const db = await connect();

        // Get every location in MongoDB
        const locations = await find(db, {});

        return res.status(200).json(locations);
    } catch (e) {
        // TODO: Add error handler
        console.log(e);
    }
};
