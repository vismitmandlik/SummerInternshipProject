const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    StudentID:{
        type: String,
        //required:true,
    },
    StudentName:{
        type: String,
        //required:true,
    },
    TypeofInternship:{
        type: String,
        // enum: { 
        //     values: ["In company", "In house"],
        //     message: `{VALUE} is SrNot supported`,
        // },
    },
    Counsellor_InternalGuide:{
        type: String,
        //required:true,
    },
    CompanyName: {
        type: String,
        //required:true,
    },
    CompanyAddress: { 
        type: String,
        //required:true,
    },
    CompanyCity: { 
        type: String,
        //required:true,
    },
    CompanyState: { 
        type: String,
        //required:true,
    },
    HRemailID: { 
        type: String,
        //required:true,
    },
    HRphonenumber: { 
        type: String,
        //required:true,
    },
    TypeofProject: { 
        type: String,
       // required:true,
    },
    ProjectTitle: { 
        type: String,
        //required:true,
    },
    ToolsandTechnology: { 
        type: String,
        //required:false,
    },

});

module.exports = mongoose.model('Product', productSchema);