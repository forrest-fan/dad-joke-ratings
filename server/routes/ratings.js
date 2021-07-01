const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');

router.route('/ratings').get(function (req, res) {
    let db_connect = dbo.getDb("ratings");
    db_connect
        .collection()
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
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