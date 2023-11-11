const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String, // This will be used for storing passwords
    role: {
        type: String,
        required: true,
        default: "student", // Default role is "student"
        enum: ["admin", "faculty", "student"], // Specify the allowed roles
    },
});

userSchema.plugin(passportLocalMongoose);


// const User = mongoose.model('User', userSchema);


const productSchema = new mongoose.Schema({
    StudentID: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness of StudentID
        index: true, // Create an index on StudentID
        default: "Not Provided",
      },
    StudentName:{
        type: String,
        //required:true,
        default: "Not Provided", // Default value of "Not Provided"
    },
    TypeofInternship:{
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    Counsellor_InternalGuide:{
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    CompanyName: {
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    CompanyAddress: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    CompanyCity: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    CompanyState: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    HRemailID: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    HRphonenumber: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    TypeofProject: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    ProjectTitle: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    ToolsandTechnology: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    Status: { 
        type: String,
        default: "Pending", // Default value of "Not Provided"
    },
    Semester: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    Duration: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    StartDate: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    EndDate: { 
        type: String,
        default: "Not Provided", // Default value of "Not Provided"
    },
    // Link the product schema with the user schema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    // field for the certificate file
    certificate: {
        type: Buffer,
    },

});
// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = {
    Product,
    User,
};
// module.exports = mongoose.model('Product', productSchema);
 
