const axios = require("axios");
const fs = require("fs");

/**
 * Query Triposo API for countries - US, BRA, FRA, JPN
 * 
 * and fields - images, coordinates, intro, climate, name, part_of
 */
const US_LOC_QUERY = "https://www.triposo.com/api/20190906/location.json?account=OGIER92O&token=5ramecfgkf0u2x0hw8eatg3008f4krkt&countrycode=US&count=100&fields=images,coordinates,intro,climate,name,part_of";
const CA_LOC_QUERY = "https://www.triposo.com/api/20190906/location.json?account=OGIER92O&token=5ramecfgkf0u2x0hw8eatg3008f4krkt&countrycode=CA&count=100&fields=images,coordinates,intro,climate,name,part_of";
const EG_LOC_QUERY = "https://www.triposo.com/api/20190906/location.json?account=OGIER92O&token=5ramecfgkf0u2x0hw8eatg3008f4krkt&countrycode=EG&count=100&fields=images,coordinates,intro,climate,name,part_of";
const DE_LOC_QUERY = "https://www.triposo.com/api/20190906/location.json?account=OGIER92O&token=5ramecfgkf0u2x0hw8eatg3008f4krkt&countrycode=DE&count=100&fields=images,coordinates,intro,climate,name,part_of";


const query_arr = [
    US_LOC_QUERY,
    CA_LOC_QUERY,
    EG_LOC_QUERY,
    DE_LOC_QUERY
];

const loc_json = {
    results: []
};

query_arr.forEach(async url => {
    try {
        const resp = await axios.get(url);
        const data = resp.data;

        loc_json.results.push(data.results);

        if (loc_json.results.length == 4) {
            fs.writeFile("dump.json", JSON.stringify(loc_json), err => {
                if (err) console.log(err);
                console.log("dump.json created!");

                fs.readFile("dump.json", (err, data) => {
                    if (err) console.log(err);
                    console.log(JSON.parse(data));
                })
            });
        }
    } catch (e) {
        console.log(e);
    }
});