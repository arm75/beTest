const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// create express app
const app = express();

async function dbConnect() {

  // await db connection. db doesn't have to exist yet. get's created when written to...
  await mongoose.connect('mongodb://localhost:27017/test');
}

dbConnect().catch(err => console.log(err)).finally(() => { console.log('Connected to MongoDB...'); });

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

const topBarRoutes = require('./routes/top-bar.js');
app.use('/top-bar', topBarRoutes);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));

