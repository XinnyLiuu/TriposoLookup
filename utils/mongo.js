import MongoClient from "mongodb";
import { GridFSBucket } from "mongodb";

const DB_NAME = "triposo";
const COLLECTION = "locations";
const CONNECTION_URL = "mongodb://localhost:27017";

/**
 * Connect to MongoDB and returns the db object
 */
export const connect = async () => {
	try {
		// Connect to the database
		const connection = await MongoClient.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		// Return the reference for the database
		return connection.db(DB_NAME);
	} catch (e) {
		console.log(e);
        throw new Error(e);
	}
}

/**
 * Uses the `find` method to query MongoDB
 * 
 * @param {*} db 
 * @param {*} query 
 */
export const find = async (db, query) => {
	try {
		return await db.collection(COLLECTION).find(query).toArray();
	} catch (e) {
		console.log(e);
        throw new Error(e);
	}
}

/**
 * Prepare the image stored in GridFS 
 * 
 * @param {*} db 
 * @param {*} file 
 */
export const getImage = (db, file) => {
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
 * Adds an comment to a location
 * 
 * @param {*} db 
 * @param {*} query 
 * @param {*} update 
 */
export const addComment = async (db, query, update) => {
	try {
		return await db.collection(COLLECTION).updateOne(query, update);
	} catch (e) {
		console.log(e);
        throw new Error(e);	}
} 