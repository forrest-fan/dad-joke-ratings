const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');

router.route('/ratings').get(async (req, res) => {
    try {
        let db_connect = await dbo.getDb("Dad-Joke-Ratings");
        const allRatings = await db_connect.collection("ratings").find({}).toArray().catch((err) => {throw err});
        res.send(allRatings);
    } catch {
        console.log("error");
    }
    
});

router.route('/ratings/add').post(function (req, res) {
    let db_connect = dbo.getDb("ratings");
    let prev = db_connect
        .collection()
        .find({
            id: {$eq: req.body.id}
        });
    let newRating = Math.round(((prev.stars * prev.count) + req.body.stars) / (prev.count + 1), 2);
    
    db_connect
        .collection()
        .find({
            id: {$eq: req.body.id}
        })
        .ratings
        .insertOne({
            stars: req.body.stars,
            message: req.body.review,
            name: req.body.name,
            timestamp: new Date()
        });
    db_connect
        .collection()
        .updateOne({
            id: {$eq: req.body.id}
        }, {
            $set: {
                stars: newRating,
                count: prev.count + 1
            }
        });
});

module.exports = router;