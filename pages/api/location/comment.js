import { connect, addComment } from "../../../utils/mongo";
import { ObjectId } from "mongodb";

/**
 * Refers to /api/location/comment/:id, where id refers to the location in MongoDB
 * 
 * Refer to https://nextjs.org/docs/api-routes/introduction
 */

export default async (req, res) => {
    if (req.method === "POST") {
        // Get data sent through the request
        const data = req.body;
        const { id, comment } = data;

        // Build the query and update
        const query = {
            _id: new ObjectId(id)
        }

        const update = {
            $push: { comments: comment }
        }

        try {
            // Connect to MongoDB
            const db = await connect();
            const result = await addComment(db, query, update);

            return res.status(200).json(result.modifiedCount);
        } catch (e) {
            // TODO:
            console.log(e);
        }
    }
}