const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const crud = require("./crud");
const cors = require('cors');

dotenv.config();

const app = express();
const router = express.Router();

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.use("/", router);

router.get("/fetchItems", async function (req, res) {
  try {
    const items = await crud.find(client, "userid");
    console.log(items);
    res.json(items);
  } catch (e) {
    console.error(e.message);
  }
});

router.delete("/deleteItem", async function (req, res) {
  try {
    const documentID = req.body.uuid;
    await client.connect();
    await crud.delete(client, "userid", documentID);
  } catch (e) {
    console.error(e.message);
  }
});

router.post("/newItem", async function (req, res) {
  try {
    const item = req.body;
    await client.connect();
    await crud.create(client, "userid", item);
  } catch (e) {
    console.error(e.message);
  }
});

router.put("/updateItem", async function (req, res) {
  try {
    const item = req.body;
    const id = item.uuid;
    await client.connect();
    await crud.update(client, "userid", id, item);
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = app;
