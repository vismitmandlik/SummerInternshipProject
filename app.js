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
const PORT = process.env.PORT || 7000;

const products_routes = require("./routes/products");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api/products", products_routes);

// Routes

// Home Route
app.get("/", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.find().sort({ StudentID: -1 }); // Sort by StudentID

    // Render the EJS template with the data
    res.render("login", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// Dashboard Route
app.get("/student-dashboard", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.find().sort({ StudentID: -1 });;
    res.render('student-dashboard', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Admin Dashboard Route
app.get("/admin-dashboard", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.find().sort({ StudentID: 1 }); // Sort by StudentID
    res.render('admin-dashboard', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Confirmation Page
app.get("/confirmation-form", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.findOne().lean().sort({ StudentID: -1 });; // Fetch data from the database
    res.render("confirmation-form", { data }); // Create an EJS file for confirmation
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Approval Form
app.get("/approval-form", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const data = await Product.findOne().lean().sort({ StudentID: -1 });; // Fetch data from the database
    res.render("approval-form", { data }); // Create an EJS file for confirmation
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Define a route to fetch students
app.get("/get-students", async (req, res) => {
  try {
    const Product = mongoose.model("Product");
    const students = await Product.find().sort({ StudentID: -1 });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ...

app.get("/manage-requests", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const studentsPerPage = 10; // Set the number of students per page
        const currentPage = parseInt(req.query.page) || 1; // Get the current page from the query parameters, default to page 1

        const totalStudents = await Product.countDocuments();
        const totalPages = Math.ceil(totalStudents / studentsPerPage);

        const students = await Product.find()
            .skip((currentPage - 1) * studentsPerPage)
            .limit(studentsPerPage)
            .sort({ StudentID: -1 }) // Sort by StudentID in descending order
            .lean(); // Fetch students for the current page

        res.render("manage-requests", { students, currentPage, totalPages });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

  

// Define the route for the confirmation for
app.get("/form", (req, res) => {
  res.render("confirmation-form", { data: {} });
});

app.post("/form", (req, res) => {
  try {
    var StudentID = req.body.StudentID; // Corrected property name
    var StudentName = req.body.StudentName
    var FirstName = req.body.FirstName
    var MidName = req.body.MidName;
    var LastName = req.body.LastName;
    var Semester = req.body.semester;
    var CompanyName = req.body.CompanyName; // Corrected property name
    var CompanyAddress = req.body.CompanyAddress;
    var Counsellor_InternalGuide = req.body.Counsellor_InternalGuide;
    var HRphonenumber = req.body.HRphonenumber; // Corrected property name
    var Duration = req.body.duration;
    var StartDate = req.body.startDate;
    var EndDate = req.body.endDate;
    var TypeofInternship = req.body.TypeofInternship; // Corrected property name
    var ProjectTitle = req.body.ProjectTitle;
    var ToolsandTechnology = req.body.ToolsandTechnology;

    var data = {
      "StudentID": StudentID, // Corrected property na
      "StudentName": StudentName,
      "FirstName": FirstName,
      "MidName": MidName,
      "LastName": LastName,
      "Semester": Semester,
      "CompanyName": CompanyName, // Corrected property name
      "CompanyAddress": CompanyAddress,
      "Counsellor_InternalGuide": Counsellor_InternalGuide,
      "HRphonenumber": HRphonenumber, // Corrected property name
      "Duration": Duration,
      "StartDate": StartDate,
      "EndDate": EndDate,
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
    

    return res.redirect('/student-dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Add this route to your existing app.js
app.get("/viewdetails", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const studentID = req.query.StudentID; // Get StudentID from the query parameter

        // Fetch the details of the specific student using the StudentID
        const student = await Product.findOne({ StudentID: studentID }).lean();

        if (!student) {
            // Handle the case where the student is not found
            return res.status(404).send("Student not found");
        }
        // Render the "viewdetails.ejs" page with the student's data
        res.render("viewdetails", { student });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update the student's status by StudentID
app.post("/update-status", async (req, res) => {
    const { studentID, newStatus } = req.body;

    try {
        const Product = mongoose.model("Product");

        // Update the status in the database
        await Product.updateOne({ StudentID: studentID }, { Status: newStatus });

        // Respond with a success message (you can customize this)
        res.redirect('/manage-requests');
    } catch (error) {
        console.error("Error updating status:", error);
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
