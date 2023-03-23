const MongoClient = require('mongodb').MongoClient;

function connectToDB() {
    const url = 'mongodb://localhost:27017/mydatabase';
    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect()
        .then(() => {
            console.log('Connected to MongoDB');
            return client.db();
        })
        .catch(err => {
            console.error('Error connecting to MongoDB', err);
            process.exit(1);
        });
}

module.exports = { connectToDB };

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// Create an Express application
const app = express();

// Define port number
const port = 3000;

// Define MongoDB connection URL
const url = "mongodb://localhost:27017";

// Define MongoDB database name
const dbName = "peterson";

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files in the "public" directory
app.use(express.static('public'));

// Define a route to handle POST requests to "/save-data"
app.post('/save-data', function (req, res) {
    // Get the data from the request body
    const data = {
        processId: req.body.processId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        dateTime: new Date()
    };

    // Connect to MongoDB and insert the data into the "executions" collection
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("Error connecting to MongoDB:", err);
            res.send("Error connecting to MongoDB");
            return;
        }

        console.log("Connected to MongoDB successfully!");

        const db = client.db(dbName);

        db.collection("executions").insertOne(data, function (err, result) {
            if (err) {
                console.log("Error saving data to MongoDB:", err);
                res.send("Error saving data to MongoDB");
            } else {
                console.log("Data saved to MongoDB successfully!");
                res.send("Data saved to MongoDB successfully!");
            }

            client.close();
        });
    });
});

// Start the server
app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});
