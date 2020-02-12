import MongoClient from "mongodb";

const CONNECTION_URL = "mongodb://localhost:27017";
const DB_NAME = "triposo";
const COLLECTION = "locations";

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
		// TODO: Add error handler
		console.log(e);
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
		const docs = await db.collection(COLLECTION).find(query).toArray();

		return docs;
	} catch (e) {
		// TODO: Add error handler
		console.log(e);
	}
}