const express = require("express");
const database = require("./connect");
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "./pass.env" }); // .env

let contact = express.Router();


// Create a Message
contact.route("/contact").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    Subject: request.body.Subject,
    Sender: request.body.user.Name,
    Email: request.body.user.Email,
    Date: request.body.Date,
    Message: request.body.Message

  };

  let data = await db.collection("contact-info").insertOne(mongoObject);
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

module.exports = contact;
console.log("Ok sa Contact Form");
