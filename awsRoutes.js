const express = require("express");
const { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./pass.env" });

const awsRoutes = express.Router();
const s3Bucket = "myblogbucketlist";

const s3client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Read one image
awsRoutes.route("/images/:id").get(verifyToken, async (request, response) => {
  const id = request.params.id
  const bucketParams = {
    Bucket: s3Bucket,
    Key: id
    
  }
  const data = await s3client.send(new GetObjectCommand(bucketParams));
  const contentType = data.ContentType;
  const srcString = await data.Body.transformToString('base64')
  const imageSource = `data:${contentType};base64, ${srcString}`

  response.json(imageSource);
});

// Upload an image
awsRoutes.route("/images").post(verifyToken, async (request, response) => {
  const file = request.files[0]
  const bucketParams = {
    Bucket: s3Bucket,
    Key: file.originalname,
    Body: file.buffer
  }
  const data = await s3client.send(new PutObjectCommand(bucketParams));
  response.json(data);
});

// Delete an image
awsRoutes.route("/images/:id").delete(verifyToken, async (request, response) => {
  const id = request.params.id
  const bucketParams = {
    Bucket: s3Bucket,
    Key: id
    
  }
  const data = await s3client.send(new DeleteObjectCommand(bucketParams));

  response.json(data);
});

// Verify Token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authentication token is missing" });

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid Token" });
    req.body.user = user;
    next();
  });
}

module.exports = awsRoutes;
console.log("Ok sa AWS storage");
