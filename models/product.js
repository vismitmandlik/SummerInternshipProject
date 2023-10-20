const mongoose = require("mongoose");

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
        type: Date,
        default: "Not Provided", // Default value of "Not Provided"
    },
    EndDate: { 
        type: Date,
        default: "Not Provided", // Default value of "Not Provided"
    },

});


module.exports = mongoose.model('Product', productSchema);