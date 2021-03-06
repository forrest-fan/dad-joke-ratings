const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: "./config.env"});
const dbo = require('./db/conn');
const ratingsRoute = require('./routes/ratings');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(ratingsRoute);
app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) {
            console.log(err);
        }
    });

    console.log("Server listening on port " + port);
})