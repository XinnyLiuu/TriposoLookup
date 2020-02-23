'use strict';

/** 
 * POST /api/location/comment 
 * 
 * Connects to db and adds a comment to a specified location by id
 */

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

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
 * Adds a comment to a location
 * @param {*} query 
 * @param {*} update 
 */
async function addComment(query, update) {
    try {
        // Connect to MongoDB
        const db = await connect(CONNECTION_URL);

        // Update the document
        return await db.collection(DB_COLLECTION)
            .updateOne(query, update);
    } catch (e) {
        throw new Error(e);
    }
}

exports.handler = async (event, context) => {
    // Get data sent through the request
    const { id, comment } = JSON.parse(event.body);

    // Build the query and update
    const query = {
        _id: new ObjectId(id)
    }

    const update = {
        $push: { comments: comment }
    };

    try {
        // Update the document
        const result = await addComment(query, update);

        return {
            statusCode: 200,
            body: JSON.stringify(result.modifiedCount)
        };
    } catch (e) {
		return {
			statusCode: 500,
			body: JSON.stringify(e)
		};
    }
}
