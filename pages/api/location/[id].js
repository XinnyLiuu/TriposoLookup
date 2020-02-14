
import { connect, find, getImage } from "../../../utils/mongo";
import { ObjectId } from "mongodb";

/**
 * Refers to endpoint /api/location/:id, where id refers to the id of the document in MongoDB
 * 
 * Refer to https://nextjs.org/docs/api-routes/introduction
 */

export default async (req, res) => {
    if (req.method === "GET") {
        // Get the id for the location being queried
        const id = req.query.id;

        // Build the query
        const query = {
            _id: new ObjectId(id)
        }

        try {
            // Get the location
            const location = await getDocById(query);

            return res.status(200).json(location);
        } catch (e) {
            // TODO: Error handling 
            console.log(e);
        }
    }
}

/**
 * Query db for a matching document with the provided id
 * @param {*} query 
 */
async function getDocById(query) {
    try {
        // Connect to MongoDB
        const db = await connect();

        // Get the document
        let doc = await find(db, query);
        doc = doc[0];

        // Get the image 
        if (doc.gridFSFile !== undefined) {
            const image = await getImage(db, doc.gridFSFile);
            doc.image = `data:image/jpeg;base64,${image}`;
        }

        return doc;
    } catch (e) {
        // TODO: Error handling
        console.log(e);
    }
}