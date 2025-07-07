/* // test to run a server
const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.listen();

/* for testing to huh ? console.log("Nagana"); */

const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const post = require("./postRoutes");
const contactMessage = require("./contactPage");
const users = require("./userRoutes");
const awsRoutes = require("./awsRoutes");
const multer = require("multer");
const upload = multer();

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();


app.use(cors());

app.use(express.json({ limit: "15mb" }));  
app.use(express.urlencoded({ limit: "15mb", extended: true }));

app.use(express.json());
app.use(upload.any());
app.use(post); // Mount the Router with a base path
app.use(users)
app.use(awsRoutes)
app.use(contactMessage)

app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Natakbo na yun Server Yun port ay nasa: ${PORT}`);
});
