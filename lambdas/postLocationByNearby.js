'use strict';

/** 
 * POST /api/location/nearby 
 * 
 * Connects to db and queries for nearby locations
 */

const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION;

/**
 * Connects to MongoDB and returns the db object
 * @param {*} uri 
 */
async function connect(uri) {
    try {
        // Connect to the database
        const connection = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Return the reference for the database
        return connection.db(DB_NAME);
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Query db for all matching nearby documents
 * 
 * @param {*} query 
 */
async function queryNearbyDocs(query) {
    try {
        // Connect to MongoDB
        const db = await connect(CONNECTION_URL);

        // Get every matching document in MongoDB
        return await db.collection(DB_COLLECTION)
            .find(query)
            .toArray();
    } catch (e) {
        throw new Error(e);
    }
}

exports.handler = async (event, context) => {
    // Get data sent through the request
    const { coords } = JSON.parse(event.body);

    // Build the query
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
        // Get the matching documents
        const docs = await queryNearbyDocs(query);

        return {
            statusCode: 200,
            body: JSON.stringify(docs)
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    }
}
