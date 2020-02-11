const axios = require("axios");
const fs = require("fs");

/**
 * This script will fetch the data available at each country listed below and create json dump file that can be used and added into MongoDB.
 * 
 * Countries were taken from https://www.worldatlas.com/articles/10-most-visited-countries-in-the-world.html.
 * 
 * https://www.farandwide.com/s/best-time-to-travel-around-the-world-0df967e053fa4328
 * 
 * The country ISO codes need to be 2 characters long ONLY.
 */
const query_arr = [
    "UK", "TH", "DE", "MX", "TR", "IT", "CN", "US", "ES", "FR", "PL", "CA", "PT", "RU", "MY", "GR", "AT", "JP"
];

let json = [];

/**
 * Retrieves the data from the Triposo urls
 */
function getData() {
    let count = 0

    query_arr.forEach(async country => {
        let url = `https://www.triposo.com/api/20190906/location.json?account=OGIER92O&token=5ramecfgkf0u2x0hw8eatg3008f4krkt&countrycode=${country}&count=100&fields=images,coordinates,intro,climate,name,part_of`;

        try {
            // Fire request calls
            const resp = await axios.get(url);
            const data = resp.data;

            // Iterate through results on each data and append to json
            data.results.forEach(d => json.push(d));

            // Tally
            count++;

            // Once all urls have been parsed, create the json dump file
            if (count === query_arr.length) writeToDump(json);
        } catch (e) {
            console.log(e);
        }
    });
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