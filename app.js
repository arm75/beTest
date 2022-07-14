// import mongoose from "mongoose";
// import express from "express";
// import bodyParser from "body-parser";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// create express app
const app = express();

async function main() {

  // await db connection. db doesn't have to exist yet. get's created when written to...
  await mongoose.connect('mongodb://localhost:27017/test');

  // create a new db schema...
  const kittenSchema = new mongoose.Schema({
    name: String
  });
  
  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittenSchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow, my name is " + this.name + "!!!"
      : "Hiss, I don't have a name!!!";
    console.log(greeting);
  };

  // schema becomes a model...
  const Kitten = mongoose.model('Kitten', kittenSchema);

  // create one new kitten...
  // const george = new Kitten({ name: 'George' });
  // console.log(george.name); // 'George'

  // create another
  // const fluffy = new Kitten({ name: 'fluffy' });
  // fluffy.speak(); // "Meow name is fluffy"
  
  // await george.save();
  //george.speak();

  // await fluffy.save();
  //fluffy.speak();

  // const kittens = await Kitten.find();
  // console.log(kittens);

  const foundKitten = await Kitten.find({ name: /^fluff/ });

  foundKitten.name = 'Aaron';
  await foundKitten.save();

}

main().catch(err => console.log(err)).finally(() => { console.log('Connected to MongoDB...'); });

// Database
// mongoose.connect('mongodb://localhost/beTest', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     mongoose.connection.once('open', () => {
//         console.log("Connected to MongoDB database...");
//     });
// });

// Middleware
//app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

//const QuotesRoute = require('./routes/Quotes');

//app.use('/quotes', QuotesRoute);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));



