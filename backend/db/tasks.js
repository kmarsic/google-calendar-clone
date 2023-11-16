const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    list: String,
    ID: String,
    type: String,
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: Date,
    location : String,
    description: String,
    color: String,
    title: String,
    completed: Boolean
})

module.exports = mongoose.model("Task", taskSchema)