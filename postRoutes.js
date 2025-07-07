const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "./pass.env" }); // .env

let postRoutes = express.Router();

// Read all posts
postRoutes.route("/posts").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("Di Makita yung DATA");
  }
});

// Read one post
postRoutes.route("/posts/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });

  if (data && Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// Create a post
postRoutes.route("/posts").post(verifyToken, async (request, response) => {
  let db = database.getDb();

  let mongoObject = {
    Title: request.body.Title,
    Description: request.body.Description,
    Content: request.body.Content,
    Author: request.body.user.Name,
    Date: request.body.Date,
    imageId: request.body.imageId
  };

  let data = await db.collection("posts").insertOne(mongoObject);
  response.json(data);
});

// Update a post
postRoutes.route("/posts/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();

  let mongoObject = {
    $set: {
      Title: request.body.Title,
      Description: request.body.Description,
      Content: request.body.Content,
      Author: request.body.Author,
      Date: request.body.Date,
      imageId: request.body.imageId
    },
  };

  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

// Delete a post
postRoutes.route("/posts/:id").delete(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

// verify Token
function verifyToken(request, response, next) {
  const authHeaders = request.headers["authorization"]
  const token = authHeaders && authHeaders.split(' ')[1]
  if (!token) {
  return response.status(401).json({message: 'Authentication token is missing'})
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
    return response.status(403).json({message: 'Invalid Token'})
    }
    request.body.user = user;
    next()
    })
}

module.exports = postRoutes;
console.log("Ok sa Blog Posts");
