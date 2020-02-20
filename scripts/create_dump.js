const axios = require("axios");
const fs = require("fs");

/**
 * This script will fetch the data available at each state in the US and grabs its images, coordinates, intro, climate and name and create json dump file that can be used and added into MongoDB.
 */
let json = [];

const query_arr = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

const ACCOUNT = "OGIER92O";
const TOKEN = "5ramecfgkf0u2x0hw8eatg3008f4krkt";

/**
 * Retrieves the data from the Triposo urls
 */
async function getData() {
    let count = 0

    for (const state of query_arr) {
        let url = `https://www.triposo.com/api/20190906/location.json?account=${ACCOUNT}&token=${TOKEN}&us_statecode=${state}&count=100&fields=images,coordinates,intro,climate,name,part_of`;

        console.log(`GET ${url}`);

        try {
            // Fire request calls
            const resp = await axios.get(url);
            const data = resp.data;

            // Iterate through results on each data and append to json
            for (const d of data.results) json.push(d);

            // Tally
            count++;

            // Once all urls have been parsed, create the json dump file
            if (count === query_arr.length) writeToDump(json);
        } catch (e) {
            console.log(e);
        }
    }
}

/**
 * Writes the data from Triposo to the dump json file
 */
function writeToDump(json) {
    // Write to file
    fs.writeFile("dump.json", JSON.stringify(json), err => {
        if (err) console.log(err);
        console.log("dump.json created!");

        // Output file contents 
        fs.readFile("dump.json", (err, data) => {
            if (err) console.log(err);
            console.log(JSON.parse(data));
        })
    });
}

getData();