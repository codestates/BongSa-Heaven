require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const fs = require("fs");
// const multer = require("multer");
// const upload = multer({dest: "uploads/"});

const DB = require("./config/config");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const mailRouter = require("./routes/mail");
const mapRouter = require("./routes/map");
const imageRouter = require("./routes/image");

//use modules
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.REACT_APP_API_URI || `https://bongsa-heavne.com`,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(cookieParser());
DB();
app.get("/", (req, res) => {
  res.status(200).send("hello world....!!");
});

//routes

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/comment", commentRouter);
app.use("/mail", mailRouter);
app.use("/map", mapRouter);
app.use("/image", imageRouter);

// app.post("/images", controller.imageControl);

//server
const HTTPS_PORT = process.env.HTTPS_PORT || 8080;

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = {key: privateKey, cert: certificate};

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log(` 🚀 Server is starting on ${HTTPS_PORT}`),
  );
  //인증서 없는경우
} else {
  app.listen(HTTPS_PORT, () => {
    console.log(`      🚀 Server is starting on ${HTTPS_PORT}`);
  });
}

module.exports = app;
