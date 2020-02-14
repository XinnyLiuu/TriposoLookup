/**
 * This script is to be ran through mongo and adds a '2dsphere' index and parses the dataset to add a 'loc' field that will be used by MongoDB to query for geolocation
 * 
 * USAGE: `mongo add_location.js`
 */

// Connection + Data
const connection = new Mongo("localhost:27017");
const db = connection.getDB("triposo");
const collectionLocations = db.getCollection("locations");

// Create 2dsphere index
function createIndex() {
    collectionLocations.createIndex({
        loc: "2dsphere"
    });

    printjson(
        collectionLocations.getIndexes()
    );
}

// Iterate through locations data and add the 'loc' field
function addLoc() {
    collectionLocations.find().forEach(doc => {

        // Check if the coordinates for the location has lat and long
        if ("coordinates" in doc) {
            const coords = doc.coordinates;

            if (("latitude" in coords && coords.latitude !== "") && ("longitude" in coords && coords.longitude !== "")) {

                // Create the loc field
                doc.loc = {
                    type: "Point",
                    coordinates: [
                        coords.longitude,
                        coords.latitude
                    ]
                }

                // Remove the old coordinates field
                delete doc.coordinates;

                // Save the updated document
                collectionLocations.save(doc);
                printjson(doc);
            }
        }
    });
}

createIndex();
addLoc();