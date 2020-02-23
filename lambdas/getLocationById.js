'use strict';

/** 
 * Connects to db and queries the location by id
 */

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const GridFSBucket = require("mongodb").GridFSBucket;

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
 * Prepare the image stored in GridFS 
 * 
 * @param {*} db 
 * @param {*} file 
 */
async function getImage(db, file) {
	// Create GridFS bucket
	const bucket = new GridFSBucket(db);

	// Download the image file with specified name and build the image data 
	const chunks = [];
	return new Promise((resolve, reject) => {
		bucket.openDownloadStreamByName(file)
			.on('data', (chunk) => chunks.push(chunk))
			.on('error', (err) => {
				// We still want the page to load, return undefined
				resolve(undefined)
			})
			.on('end', () => resolve(Buffer.concat(chunks).toString("base64")));
	})
}


/**
 * Query db for a matching document with the provided id
 * 
 * @param {*} query 
 */
async function getDocById(query) {
	try {
		// Connect to MongoDB
		const db = await connect(CONNECTION_URL);

		// Get the document
		let doc = await db.collection(DB_COLLECTION)
			.find(query)
			.toArray();
		doc = doc[0];

		// Get the image 
		if (doc.gridFSFile !== undefined) {
			const image = await getImage(db, doc.gridFSFile);
			doc.image = image !== undefined ? `data:image/jpeg;base64,${image}` : undefined;
			return doc;
		}

		if (doc.images !== undefined || doc.iamges !== null) {
			doc.image = doc.images[0].sizes.original.url;
			return doc;
		}
	} catch (e) {
		throw new Error(e);
	}
}

exports.handler = async (event, context) => {
	// Get the id from the path
	const { id } = event.pathParameters;

	// Build the query
	const query = {
		_id: new ObjectId(id)
	};

	try {
		// Get the location
		const location = await getDocById(query);

		return {
			statusCode: 200,
			body: JSON.stringify(location)
		};
	} catch (e) {
		return {
			statusCode: 500
		};
	}
}
