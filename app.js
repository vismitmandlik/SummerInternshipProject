require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const mongoose = require("mongoose")
const ejs = require("ejs")
const path = require('path');
const Product = require('./models/product'); 


// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.use('/public/img', express.static(__dirname + '/public/img'));
app.set('views', path.join(__dirname, 'views'));


var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


//PORT
const PORT = process.env.PORT || 5000;
const products_routes = require("./routes/products");

// Routes

// Home
app.get("/", async (req, res) => {
    try {
      const Product = mongoose.model("Product");
      const data = await Product.find();
  
      // Render the EJS template with the data
      res.render("index", { data });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
    });

// Dashboard
    app.get("/dashboard",async (req, res) => {
        try{

            const Product = mongoose.model("Product");
            const data = await Product.find();
            res.render('dashboard', { data });
        }catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
      });

    //   app.get("/",async (req, res) => {
    //     try{

    //         const Product = mongoose.model("Product");
    //         const data = await Product.find();
    //         res.render('dashboard', { data });
    //     }catch (error) {
    //         console.error(error);
    //         res.status(500).send("Internal Server Error");
    //     }
    // });

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

// Define the route for the confirmation form
app.get("/form", (req, res) => {
    res.render("confirmationform", { data: {} });
});

// Handle the form submission
app.post("/form", async (req, res) => {
    try {
        // Create a new product instance with the submitted data
        const newProduct = new Product({
            StudentID: req.body.StudentID,
            StudentName: req.body.StudentName,
            TypeofInternship: req.body.TypeofInternship,
            Counsellor_InternalGuide: req.body.Counsellor_InternalGuide,
            CompanyName: req.body.CompanyName,
            CompanyAddress: req.body.CompanyAddress,
            CompanyCity: req.body.CompanyCity,
            CompanyState: req.body.CompanyState,
            HRemailID: req.body.HRemailID,
            HRphonenumber: req.body.HRphonenumber,
            TypeofProject: req.body.TypeofProject,
            ProjectTitle: req.body.ProjectTitle,
            ToolsandTechnology: req.body.ToolsandTechnology,
        });

        // Save the new product to the database
        await newProduct.save();

        // Render the confirmation page with the submitted data
        res.render("confirmationform", { data: req.body });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
  



//Middlewares---------------------------------------- 
// Serve static files from the 'public' directory
app.use(express.static('public'));


// Middleware for handling API routes
app.use("/api/products", products_routes);

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));



const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Connected to port :${PORT}`);
        });
    }
    catch(error){
        console.log(error);
    }
}

start();