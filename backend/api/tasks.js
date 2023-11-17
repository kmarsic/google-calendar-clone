const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Task = require('../db/tasksdb')
mongoose.connect('mongodb://127.0.0.1:27017/calendardb')
 
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
    await Task.deleteOne({
        ...req.body
})
    res.json({message: "Task removed successfuly"})
  } catch(e) {
    console.error(e.message)
  }
})

router.post("/", async function (req, res, next) {
  const item = req.body;
    const newTask = await Task.create({
      list: item.list,
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