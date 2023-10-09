// const Product = require("../models/product")

// const getAllProducts = async(req, res) => {

//     const myData = await Product.find(req.query).sort({ StudentID: 1 });
//     res.status(200).json({ myData });
    
// };

// const getAllProductsTesting = async (req, res) => {

//     const { StudentID, StudentName, TypeofInternship, Counsellor_InternalGuide, CompanyName, CompanyAddress,CompanyCity, CompanyState, HRemailID, HRphonenumber, TypeofProject, ProjectTitle, ToolsandTechnology} = req.query;
//     const queryObject = {};

//     if(StudentID) { 
//         const filterQuery = {
//             StudentID: { $regex: `^${StudentID}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(StudentName) { 
//         const filterQuery = {
//             StudentName: { $regex: `^${StudentName}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }
    

//     if(TypeofInternship) { 
//         const filterQuery = {
//             TypeofInternship: { $regex: `^${TypeofInternship}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(Counsellor_InternalGuide) { 
//         const filterQuery = {
//             Counsellor_InternalGuide: { $regex: `^${Counsellor_InternalGuide}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(CompanyName) { 
//         const filterQuery = {
//             CompanyName: { $regex: `^${CompanyName}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(CompanyAddress) { 
//         const filterQuery = {
//             CompanyAddress: { $regex: `^${CompanyAddress}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(CompanyCity) { 
//         const filterQuery = {
//             CompanyCity: { $regex: `^${CompanyCity}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(CompanyState) { 
//         const filterQuery = {
//             CompanyState: { $regex: `^${CompanyState}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(HRemailID) { 
//         const filterQuery = {
//             HRemailID: { $regex: `^${HRemailID}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

    
//     if(HRphonenumber) { 
//         const filterQuery = {
//             HRphonenumber: { $regex: `^${HRphonenumber}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(TypeofProject) { 
//         const filterQuery = {
//             TypeofProject: { $regex: `^${TypeofProject}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(ProjectTitle) { 
//         const filterQuery = {
//             ProjectTitle: { $regex: `^${ProjectTitle}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     if(ToolsandTechnology) { 
//         const filterQuery = {
//             ToolsandTechnology: { $regex: `^${ToolsandTechnology}`, $options: "i" }, // Case-insensitive
//           };
        
//           const filteredData = await Product.find(filterQuery);
//           res.send({status:200,Data:filteredData});
//     }

//     console.log(queryObject);


//     const myData = await Product.find(queryObject).sort({ StudentID: 1 });;
//     res.status(200).json({ myData });
    
// };


// module.exports = {
//     getAllProducts,
//     getAllProductsTesting
// }


const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const myData = await Product.find(req.query).sort({ StudentID: 1 });
  res.status(200).json({ myData }); 
};

const getAllProductsTesting = async (req, res) => {
  const queryParams = req.query;
  const filterOptions = {};

  // Define the properties you want to filter and their corresponding database field names
  const filterFields = {
    StudentID: "StudentID",
    StudentName: "StudentName",
    TypeofInternship: "TypeofInternship",
    Counsellor_InternalGuide: "Counsellor_InternalGuide",
    CompanyName: "CompanyName",
    CompanyAddress: "CompanyAddress",
    CompanyCity: "CompanyCity",
    CompanyState: "CompanyState",
    HRemailID: "HRemailID",
    HRphonenumber: "HRphonenumber",
    TypeofProject: "TypeofProject",
    ProjectTitle: "ProjectTitle",
    ToolsandTechnology: "ToolsandTechnology",
  };

  // Loop through the query parameters and build the filter options
  for (const key in queryParams) {
    if (filterFields[key]) {
      const regexQuery = new RegExp(`^${queryParams[key]}`, "i");
      filterOptions[filterFields[key]] = { $regex: regexQuery };
    }
  }

  const filteredData = await Product.find(filterOptions);
  res.status(200).json({ Data: filteredData });
};

const createResponse = (res, status, message, data) => {
  return res.status(status).json({ message, data });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
  createResponse,
};
