const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const ejs = require("ejs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // to parse form data

app.use(express.static(path.join(__dirname, "Images"))); // serve the Images directory as a static folder

const flicks = [];

const { v4: uuidv4 } = require('uuid');

const id = uuidv4();



app.get("/", (req, res) => {
  res.render("index", { flicks: flicks });
});

app.post("/", upload.single("image"), (req, res) => {
  const { title, description, tags } = req.body;
  const imageFileName = req.file.filename;

  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Tags:", tags);
  console.log("Image Filename:", imageFileName);
  console.log("EIB",id);

  flicks.push({ title, description, tags, imageFileName, id });

  res.render("index", { flicks: flicks });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
