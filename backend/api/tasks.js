const express = require('express')
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb')
const router = express.Router()

const credentials = './X509-cert-5442510045449212021.pem';
const client = new MongoClient('mongodb+srv://calendar-clone.pgdlqha.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=calendar-clone', {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
})

const Task = require('../db/tasksdb')

async function run() {
  try {
    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


router.get("/", async function(req, res, next) {
  try {
  const tasks = await Task.find()
  res.json(tasks);
} catch(e) {
  console.error(e.message)
}
});

router.delete("/", async function (req, res, next) {
  try {
  const { ID } = req.body
    await Task.deleteOne({ ID })
    res.json({message: "Task removed successfuly", Task})
  } catch(e) {
    console.error(e.message)
  }
})

router.post("/", async function (req, res, next) {
  const item = req.body;
    const newTask = await Task.create({
      list: item.list,
      ID: item.ID,
      name: item.name,
      type: item.type,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      location : item.location,
      description: item.description,
      color: item.color,
      title: item.title,
      completed: item.completed
  })
  res.json({ message: "Item added", newTask });
  }
)

module.exports = router