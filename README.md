# Triposo Lookup

## Description
Triposo Lookup is a project that demonstrates the use of a document-oriented database (MongoDB) in an application.

All data is owned by and taken from __[Triposo](https://www.triposo.com/)__'s api. The data has been cleaned and processed to be stored in our database to utilize MongoDB's __[GridFS](https://docs.mongodb.com/manual/core/gridfs/)__ and __[Geolocation](https://docs.mongodb.com/manual/geospatial-queries/)__ features. There are currently 4782 documents containing information various locations throughout the United States. Due to Mongo Atlas' free tier restrictions, the database only stored 930 images for these locations and the rest of the images are queried from an image URL that is indicated in each document.

## Technologies
* __[Next.js](https://nextjs.org/)__ 
* __[React](https://reactjs.org/)__
* __[MongoDB](https://www.mongodb.com/)__
* __[Material UI](https://material-ui.com/)__
* __[AWS Lambda](https://aws.amazon.com/lambda/)__ - note: Originally the application used an API that we written using __[Next.js' API routing](https://nextjs.org/docs/api-routes/introduction)__, but upon project deployment, we have migrated the logic to using AWS lambda. The code for the API is still available in the project under `pages/api`.
* __[ZEIT Now](https://zeit.co/)__

## Setup
NOTE: Ensure npm is installed on the machine

```javascript
npm install
npm run dev
```

 