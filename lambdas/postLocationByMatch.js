'use strict';

/** 
 * POST /api/location/match
 * 
 * Connects to db and queries all fields in collection by the provided search text
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
 * Query db for all matching documents
 * 
 * @param {*} query 
 */
async function queryMatchedDocs(query) {
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
	const { value } = JSON.parse(event.body);

	// Build the query
	const regex = { $regex: `\\b(${value})`, $options: "i" };
	const query = {
		$or: [
			{ "part_of": regex },
			{ "name": regex },
			{ "intro": regex }
		]
	};

	try {
		// Get the matching documents
		const docs = await queryMatchedDocs(query);

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*', // Required for CORS support to work
				'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS			
			},
			body: JSON.stringify(docs)
		};
	} catch (e) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*', // Required for CORS support to work
				'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS			
			},
			body: JSON.stringify(e)
		};
	}
}
