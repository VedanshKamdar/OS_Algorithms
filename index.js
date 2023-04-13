// const express = require("express");
// const mongoose = require("mongoose");
// const app=express();

// const uri= "mongodb+srv://osproject:osproject@mycluster.pdgmcwx.mongodb.net/test"

// async function connect() {
//   try {
//     await mongoose.connect(uri);
//     console.log("Connected to MongoDB");
// }
// catch(error){
//   console.error(error);
// }
// }

// connect();

// app.listen(8000, () => {
//   console.log("Server started on port 8000");
// });

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://osproject:osproject@mycluster.pdgmcwx.mongodb.net/test'; // Replace with your actual MongoDB connection URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

MongoClient.connect(url, options, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
    // Code to be executed when connected to MongoDB
    // ...
    client.close(); // Close the MongoDB connection when done
  }
});