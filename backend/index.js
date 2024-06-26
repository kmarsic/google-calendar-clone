const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const app = express();

const uri = "mongodb+srv://test:vQQ4OIU6sNJliXJd@calendar-clone.pgdlqha.mongodb.net/?retryWrites=true&w=majority&appName=calendar-clone";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


async function main() {

    try {
        await client.connect();
        await client.db("admin").command({ ping: 1});

        await createListing(client, {
             name: "testuser",
             events: [
                "date1", "date2", "date3"
             ],
             dates: "exampledates",
             tasks: "list tasks"
        })
        console.log("Pinged deployment. Nice")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error)

async function createListing(client, newUser) {
    const result = await client.db("todo").collection("item").insertOne(newUser);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createMultipleListings(client, newListings) {
    client.db("todo").collection("item").insertMany(newListings);
}

async function listDatabases() {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    })
}