require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Product = require("./models/product");

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.use('/public/img', express.static(__dirname + '/public/img'));
app.set('views', path.join(__dirname, 'views'));

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

// PORT
const PORT = process.env.PORT || 5000;
const products_routes = require("./routes/products");

// Middlewares
app.use(express.static('public'));
app.use("/api/products", products_routes);
app.use(express.urlencoded({ extended: true }));

// Routes

// Home
app.get("/", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.find().sort({ StudentID: 1 }); // Sort by StudentID

    // Render the EJS template with the data
    res.render("index", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Dashboard
app.get("/dashboard", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.find();
    res.render('dashboard', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Admin Dashboard
app.get("/admin", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.find().sort({ StudentID: 1 }); // Sort by StudentID
    res.render('admin', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Confirmation Page
app.get("/confirmation_page", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.findOne().lean(); // Fetch data from the database
    res.render("confirmation_page", { data }); // Create an EJS file for confirmation
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Approved
app.get("/approved", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const studentsPerPage = 10; // Set the number of students per page
    const currentPage = req.query.page || 1; // Get the current page from the query parameters, default to page 1

    const totalStudents = await Product.countDocuments();
    const totalPages = Math.ceil(totalStudents / studentsPerPage);

    const students = await Product.find()
      .skip((currentPage - 1) * studentsPerPage)
      .limit(studentsPerPage)
      .sort({ StudentID: 1 }) // Sort by StudentID
      .lean(); // Fetch students for the current page

    res.render("approved", { students, currentPage, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Define the route for the confirmation form
app.get("/form", (req, res) => {
  res.render("confirmationform", { data: {} });
});

app.post("/form", (req, res) => {
  try {
    var StudentID = req.body.StudentID; // Corrected property name
    var semester = req.body.semester;
    var CompanyName = req.body.CompanyName; // Corrected property name
    var CompanyAddress = req.body.CompanyAddress;
    var Counsellor_InternalGuide = req.body.Counsellor_InternalGuide;
    var HRphonenumber = req.body.HRphonenumber; // Corrected property name
    var duration = req.body.duration;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var TypeofInternship = req.body.TypeofInternship; // Corrected property name
    var ProjectTitle = req.body.ProjectTitle;
    var ToolsandTechnology = req.body.ToolsandTechnology;

    var data = {
      "StudentID": StudentID, // Corrected property name
      "semester": semester,
      "CompanyName": CompanyName, // Corrected property name
      "CompanyAddress": CompanyAddress,
      "Counsellor_InternalGuide": Counsellor_InternalGuide,
      "HRphonenumber": HRphonenumber, // Corrected property name
      "duration": duration,
      "startDate": startDate,
      "endDate": endDate,
      "TypeofInternship": TypeofInternship, // Corrected property name
      "ProjectTitle": ProjectTitle,
      "ToolsandTechnology": ToolsandTechnology,
    };

    // Insert the data into the database
    db.collection('products').insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log("Record Inserted Successfully");
    });

    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Connected to port :${PORT}`);
    });
  }
  catch (error) {
    console.log(error);
  }
}

start();
