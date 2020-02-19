/**
 * This script is to be ran through mongo and adds a comments array to each document to store comments for locations.
 * 
 * USAGE: `mongo add_comments.js`
 */

// Connection + Data
const connection = new Mongo("localhost:27017");
const db = connection.getDB("triposo");
const collectionLocations = db.getCollection("locations");

function addComments() {
    // Go through each location in the collection
    collectionLocations.find().forEach(doc => {
        collectionLocations.update(
            { _id: doc._id },
            { $set: { comments: [] } }
        )
    })
}

addComments();