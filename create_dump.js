const axios = require("axios");
const fs = require("fs");

/**
 * This script will fetch the data available at each country listed below and create json dump file that can be used and added into MongoDB.
 * 
 * The country ISO codes need to be 2 characters long ONLY.
 */
const query_arr = ["UK", "TH", "DE", "MX", "TR", "IT", "CN", "US", "ES", "FR", "PL", "CA", "PT", "RU", "MY", "GR", "AT", "JP"];
let json = [];

const ACCOUNT = "OGIER92O";
const TOKEN = "5ramecfgkf0u2x0hw8eatg3008f4krkt";

// /**
//  * Get all the ISO 2 digit country codes from the country_codes.json
//  */
// function prepareQueryArr() {
//     return new Promise((resolve, reject) => {
//         fs.readFile("country_codes.json", (err, data) => {
//             if (err) console.log(err);

//             // Get json arr
//             const json_arr = JSON.parse(data);

//             // Iterate through each
//             json_arr.forEach(d => {
//                 query_arr.push(d.Code);
//             });

//             // Remove countries unsupported by Triposo
//             const blacklist = ["SH", "AQ", "CW", "BQ", "IO", "VA", "BV", "CX", "TF", "PM", "NF", "AX", "GI", "HM", "GB", "YT", "CC", "SJ", "GS", "HK", "DO", "TR", "VN", "ZW", "FO", "MO", "UM", "EH", "FK", "SX", "ER", "VE", "NL"]; // TODO: Find all the countries not supported by Triposo
//             blacklist.forEach(n => query_arr.splice(
//                 query_arr.indexOf(n), 1))

//             if (query_arr.length === (249 - blacklist.length)) resolve();
//         });
//     })
// }

/**
 * Retrieves the data from the Triposo urls
 */
async function getData() {
    // await prepareQueryArr();

    let count = 0

    query_arr.forEach(async country => {
        let url = `https://www.triposo.com/api/20190906/location.json?account=${ACCOUNT}&token=${TOKEN}&countrycode=${country}&count=100&fields=images,coordinates,intro,climate,name,part_of`;

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