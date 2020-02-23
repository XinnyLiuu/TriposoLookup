import { connect, find } from "../../../utils/mongo";

/**
 * Refer to https://nextjs.org/docs/api-routes/introduction
 * 
 * This file routes to the endpoint /api/location/nearby
 * 
 * Takes in coordinates and uses it to query MongoDB and returns nearby locations
 */

export default async (req, res) => {
    // Listen for POST request
    if (req.method === "POST") {
        // Get the value
        const coords = req.body;

        // Create the query
        const query = {
            loc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [coords.long, coords.lat]
                    },
                    $maxDistance: 100000
                }
            }
        };

        try {
            // Get the docs and return it
            const docs = await queryNearbyDocs(query);
            return res.status(200).json(docs);
        } catch (e) {
            console.log(e);
            return res.status(500).end();
        }
    }
}

/**
 * Query db for all matching nearby documents
 * @param {*} query 
 */
async function queryNearbyDocs(query) {
    try {
        // Connect to MongoDB
        const db = await connect();

        // Get every matching document in MongoDB
        return await find(db, query);
    } catch (e) {
        throw new Error(e);
    }
}