const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//db
const Task = require('./db/tasks')
mongoose.connect('mongodb://127.0.0.1:27017/calendardb')

app.get("/", async function(req, res, next) {
  try {
    console.log(req)
    const tasks = await Task.find()
  res.json(tasks);
} catch(e) {
  console.error(e.message)
}
});

app.post("/", async function (req, res, next) {
  const item = req.body;
  const newTask = await Task.create({
    list: item.list,
    ID: item.id,
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
});


module.exports = app;
