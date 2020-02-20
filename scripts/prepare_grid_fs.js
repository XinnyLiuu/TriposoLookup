const axios = require("axios");
const async = require("async");

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const ObjectID = require("mongodb").ObjectID;

const DB_NAME = "triposo";
const COLLECTION_NAME = "locations";
const CONNECTION_URL = "mongodb://localhost:27017";

/**
 * This script will retrieve all triposo records in the database, download the specific image, upload them to GridFS, update the document to have a reference to the GridFS document
 */

async function prepareGridFS() {
	try {
		// Connect to db 
		const connection = await MongoClient.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		const db = connection.db(DB_NAME);

		// Get the docs
		const docs = await db.collection(COLLECTION_NAME)
			.find({})
			.toArray();

		// Setup GridFS
		const bucket = new GridFSBucket(db);

		// Iterate through the documents using the async library to prevent EMFILE
		async.eachLimit(docs, 1000, async (d) => {
			if ("images" in d && d["images"].length > 0) {
				// Get the image url  
				const url = d.images[0].source_url;

				// Setup custom axios interceptor. These intercept the responses before they are handled by then / catch
				axios.interceptors.response.use(response => {
					return response;
				}, error => {
					return error;
				});

				// Call the GET request
				const resp = await axios({
					url: url,
					method: "GET",
					responseType: "stream"
				});
				const data = resp.data;

				if (data !== undefined) {
					// Save the image data into GridFS
					const arr = url.split("/");
					const file = arr[arr.length - 1];

					data.pipe(
						bucket.openUploadStream(file)
							.on('error', (err) => {
								console.log(err);
								throw err;
							})
							.on('finish', () => {
								console.log(`Saved ${file}`);
							})
					)

					// Update the doc - save the image saved in GridFS as a field and delete the images field
					const id = d._id;
					const update = {
						$set: { gridFSFile: file },
						$unset: { images: "" }
					}

					await db.collection(COLLECTION_NAME)
						.updateOne({ _id: new ObjectID(id) }, update);
				}
			}
		}, (err) => {
			if (err) throw err;
		});
	} catch (e) {
		console.log(e);
	}
}

prepareGridFS();