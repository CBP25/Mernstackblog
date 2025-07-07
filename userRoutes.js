const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt"); // install bcrypt
const jwt = require("jsonwebtoken") // npm install jsonwebtoken
require("dotenv").config({ path: "./pass.env" }); // .env

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

// Create User
userRoutes.route("/blogusers").post(async (request, response) => {
  try {
    let db = database.getDb();
    const takenEmail = await db.collection("blogUsers").findOne({ Email: request.body.Email });

    if (takenEmail) {
      return response.status(400).json({ message: "Itong email ay nasa Database na" });
    }

    const hash = await bcrypt.hash(request.body.Password, SALT_ROUNDS);
    let mongoObject = {
      Name: request.body.Name,
      Email: request.body.Email,
      Password: hash,
      JoinDate: new Date(),
      posts: [],
    };

    let data = await db.collection("blogUsers").insertOne(mongoObject);
    return response.status(200).json({ message: "Na-create ang account mo Congrats!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

// Update User
userRoutes.route("/blogusers/:id").put(async (request, response) => {
  let db = database.getDb();

  let mongoObject = {
    $set: {
      Name: request.body.Name,
      Email: request.body.Email,
      Password: request.body.Password,
      JoinDate: request.body.JoinDate,
      posts: request.body.posts,
    },
  };

  let data = await db
    .collection("blogUsers")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

// Delete User
userRoutes.route("/blogusers/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("blogUsers")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

// Log in User
userRoutes.route("/blogusers/login").post(async (request, response) => {
  let db = database.getDb();
  const user = await db.collection("blogUsers").findOne({ Email: request.body.Email });

  if (user) {
    let passconfirm = await bcrypt.compare(request.body.Password, user.Password);
    const token = jwt.sign(user, process.env.SECRETKEY, {expiresIn: "2h"})
    if (passconfirm) {
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect password" });
    }
  } else {
    response.json({ success: false, message: "User not found" });
  }
});

module.exports = userRoutes;
console.log("Ok sa User");
