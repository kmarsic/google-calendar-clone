var express = require("express");
var router = express.Router();

const obj = [
    
]


router.get("/", function(req, res, next) {
    res.json(obj);
});

router.post("/", function (req, res, next) {
    const newItem = req.body; // The new item to be added

    console.log(newItem)

    // Add the new item to the array
    obj.push(newItem);

    res.json({ message: "Item added", newItem });
});

module.exports = router;