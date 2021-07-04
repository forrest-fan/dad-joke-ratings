const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');

router.route('/ratings').get(async (req, res) => {
    try {
        let db_connect = await dbo.getDb("Dad-Joke-Ratings");
        const allRatings = await db_connect.collection("ratings").find({}).toArray();
        res.send(allRatings);
    } catch {
        console.log("error, all ratings");
    }
    
});

router.route('/ratings/byId').get(async (req, res) => {
    try {
        let db_connect = await dbo.getDb("Dad-Joke-Ratings");
        const ratingById = await db_connect.collection("ratings").find({id: {$eq: req.query.id}}).toArray();
        res.send(ratingById);
    } catch {
        console.log("error, by id");
    }
})

router.route('/ratings/add').post(async function (req, res) {
    try {
        let id = req.body.id;
        let db_connect = await dbo.getDb("Dad-Joke-Ratings");
        const ratingById = await db_connect.collection("ratings").find({id: req.body.id}).toArray();
        let stars = Number(req.body.stars);
        if (ratingById.length > 0) {
            // Update document if joke already exists in db
            let prev = ratingById[0];
            let newStars = Math.round((prev.stars * prev.count + stars) / (prev.count + 1), 2);
            console.log(newStars);
            db_connect.collection("ratings").updateOne(
                { id: id },
                {
                    $push: { 
                        reviews: {
                            stars: stars,
                            name: req.body.name,
                            message: req.body.message,
                            timestamp: new Date()
                        } 
                    },
                    $set: {
                        stars: newStars,
                        count: prev.count + 1
                    }
                }
            );
        } else {
            // Insert new document if no reviews yet for this joke
            db_connect.collection("ratings").insertOne({
                id: id,
                stars: stars,
                count: 1,
                reviews: [
                    {
                        stars: stars,
                        name: req.body.name,
                        message: req.body.message,
                        timestamp: new Date()
                    }
                ]
            });
        }
        res.send("success");
    } catch {
        console.log("error updating db");
        res.send("error");
    }
});

module.exports = router;