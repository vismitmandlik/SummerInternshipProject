require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const {Product} = require("./models/product");
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const puppeteer = require("puppeteer");
const passport = require('passport');
const expressSession = require('express-session');
require('events').EventEmitter.defaultMaxListeners = 20; // Increase the limit as needed


// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('views', path.join(__dirname, 'views'));


app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.use('/public/img', express.static(__dirname + '/public/img'));

app.use(expressSession({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

// PORT
const PORT = process.env.PORT || 7000;

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));    
app.use(express.urlencoded({
    extended: true
}));    


//Headers
const headers = [
    "StudentID",
    "StudentName",
    "FirstName",
    "MidName",  
    "LastName",
    "Semester",
    "CompanyName",
    "CompanyAddress",
    "Counsellor_InternalGuide",
    "HRphonenumber",
    "Duration",
    "StartDate",
    "EndDate",
    "TypeofInternship",
    "ProjectTitle",
    "ToolsandTechnology",
];    

// // // Routes



// //  // Use routes
app.use('/', require("./routes"));
app.use('/register-faculty', require("./routes/authRoutes"));
app.use('/student-dashboard', require("./routes/studentRoutes"));
app.use('/admin-dashboard', require("./routes/adminRoutes"));
app.use('/certification', require("./routes/certificateRoutes"))
app.use('/generate/', require("./routes/reportGenerationRoutes"))


// For NOC generation
// Define a route to render your EJS template

app.get("/render/:StudentID", async (req, res) => {
    try {
        // Get the StudentID parameter from the URL
        const { StudentID } = req.params;
        
        // Fetch the latest student from the database
        const student = await Product.findOne({ StudentID });
        console.log(student);

        // Check if a student was found
        if (!student) {
            return res.status(404).send("Student data not found for the specified StudentID");
        }    

        // Render the EJS template with the student data
        res.render("noc", { student }); // Assuming your EJS file is named "noc.ejs"
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error in /render");
    }    
});    
  

// Define a route to capture a PDF of the rendered content using Puppeteer
app.get("/capture-pdf/:StudentID", async (req, res) => {
    try {

        // Get the StudentID parameter from the URL
        const { StudentID } = req.params;

        const browser = await puppeteer.launch({
            headless: true, // Set to true if running on a server without a graphical interface
        });    
        const page = await browser.newPage();

        // Visit the route that renders the EJS template
        await page.goto(`http://localhost:${PORT}/render/${StudentID}`, { waitUntil: "domcontentloaded" });

        // Capture a PDF of the page
        const pdfBuffer = await page.pdf();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=NOC_${StudentID}.pdf`);
        res.send(pdfBuffer);

        await browser.close();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error in /capture-pdf");
    }    
});     



// Confirmation Page
app.get("/confirmation-form", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const data = await Product.findOne().lean().sort({
            StudentID: -1
        });; // Fetch data from the database
        res.render("confirmation-form", {
            data
        }); // Create an EJS file for confirmation
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Approval Form
app.get("/approval-form", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const data = await Product.findOne().lean().sort({
            StudentID: -1
        });; // Fetch data from the database
        res.render("approval-form", {
            data
        }); // Create an EJS file for confirmation
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a route to fetch students
app.get("/get-students", async (req, res) => {
    try {
        const Product = mongoose.model("Product");
        const students = await Product.find().sort({
            StudentID: -1
        });
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});


// Manage Requests Route
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
            .sort({
                StudentID: -1
            }) // Sort by StudentID in descending order
            .lean(); // Fetch students for the current page

        res.render("manage-requests", {
            students,
            currentPage,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// for search bar
app.get("/search-students", async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from the query parameters

        // Check if a search query is provided
        if (query) {
            // Search for students that match the query in the entire database
            const students = await Product.find({
                $or: [
                    { StudentID: { $regex: query, $options: 'i' } }, // Match StudentID (case-insensitive)
                    { StudentName: { $regex: query, $options: 'i' } }, // Match StudentName (case-insensitive)
                    // Add more fields to search if needed
                ]
            });
        const studentsPerPage = 10; // Set the number of students per page
        const currentPage = parseInt(req.query.page) || 1; // Get the current page from the query parameters, default to page 1

        const totalStudents = await Product.countDocuments();
        const totalPages = Math.ceil(totalStudents / studentsPerPage);

            return res.render("manage-requests", {
                students,
                currentPage,
                totalPages
            });
        }
        else{
            const students = await Product.find({
                $or: [
                    { StudentID: { $regex: query, $options: 'i' } }, // Match StudentID (case-insensitive)
                    { StudentName: { $regex: query, $options: 'i' } }, // Match StudentName (case-insensitive)
                    // Add more fields to search if needed
                ]
            });
            const studentsPerPage = 10; // Set the number of students per page
            const currentPage = parseInt(req.query.page) || 1; // Get the current page from the query parameters, default to page 1

            const totalStudents = await Product.countDocuments();
            const totalPages = Math.ceil(totalStudents / studentsPerPage);
            return res.render("manage-requests", {
                students,
                currentPage,
                totalPages
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error at /search-student");
    }
});



// Define the route for the confirmation for
app.get("/form", (req, res) => {
    try{
        res.render("confirmation-form", {
            data: {}
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

app.post("/form", async (req, res) => {
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
        var Status = req.body.Status

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
            "Status": Status,
        };

        const existingStudent = await Product.findOne({ StudentID: data.StudentID });
        if (existingStudent) {
            console.log("A student with the same StudentID already exists.");
            existingStudent.StudentID = req.body.StudentID; // Corrected property name
            existingStudent.StudentName = req.body.StudentName
            existingStudent.FirstName = req.body.FirstName
            existingStudent.MidName = req.body.MidName;
            existingStudent.LastName = req.body.LastName;
            existingStudent.Semester = req.body.semester;
            existingStudent.CompanyName = req.body.CompanyName; // Corrected property name
            existingStudent.CompanyAddress = req.body.CompanyAddress;
            existingStudent.Counsellor_InternalGuide = req.body.Counsellor_InternalGuide;
            existingStudent.HRphonenumber = req.body.HRphonenumber; // Corrected property name
            existingStudent.Duration = req.body.duration;
            existingStudent.StartDate = req.body.startDate;
            existingStudent.EndDate = req.body.endDate;
            existingStudent.TypeofInternship = req.body.TypeofInternship; // Corrected property name
            existingStudent.ProjectTitle = req.body.ProjectTitle;
            existingStudent.ToolsandTechnology = req.body.ToolsandTechnology;
            existingStudent.Status = req.body.Status

            await existingStudent.save();
            console.log("Student information updated successfully.");
        } else {
            // Insert the new data
            await db.collection('products').insertOne(data);
            console.log("Record Inserted Successfully");
        }
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
        const student = await Product.findOne({
            StudentID: studentID
        }).lean();

        if (!student) {
            // Handle the case where the student is not found
            return res.status(404).send("Student not found");
        }
        // Render the "viewdetails.ejs" page with the student's data
        res.render("viewdetails", {
            student
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update the student's status by StudentID
app.post("/update-status", async (req, res) => {
    const {
        studentID,
        newStatus
    } = req.body;

    try {
        const Product = mongoose.model("Product");

        // Update the status in the database
        await Product.updateOne({
            StudentID: studentID
        }, {
            Status: newStatus
        });

        // Respond with a success message (you can customize this)
        res.redirect('/manage-requests');
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a route for rendering the student list
app.get('/analytics', async (req, res) => {
    const students = await Product.find().exec();
    res.render('analytics', {
        students
    });
});

// Custom error handling middleware
app.get('/error',(err, req, res, next) => {
    console.error(err);
    res.status(500).render('error', { message: 'An error occurred' });
  });

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Connected to port :${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();