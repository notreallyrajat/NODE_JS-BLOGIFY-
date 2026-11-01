const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const UserRouter = require("./routes/userrouter");
const BlogRouter = require("./routes/blog");
const { AuthenticationCookie } = require("./service/auth");
const {returnBlogs} = require("./controller/blog")

const app = express();
const PORT = 8000;

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Blogify")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// Static files
app.use(express.static(path.join(__dirname, "public")));

// Multer configuration
const upload = multer({
  dest: path.join(__dirname, "public", "uploads"),
});

// Make upload middleware available to routes that need it
app.locals.upload = upload;

// User routes
app.use("/user",UserRouter);


// Home route
app.get("/",AuthenticationCookie ,returnBlogs);



// Blog routes
app.use("/",AuthenticationCookie, BlogRouter);
console.log("Hello this is me ")

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});