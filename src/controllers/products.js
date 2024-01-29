// const getAllProducts = async (req, res) => {
//   const myData = await ProductModel.find(req.query).sort({ StudentID: 1 });
//   res.status(200).json({ myData });
// };

// const getAllProductsTesting = async (req, res) => {
//   const queryParams = req.query;
//   const filterOptions = {};

//   // Define the properties you want to filter and their corresponding database field names
//   const filterFields = {
//     StudentID: "StudentID",
//     StudentName: "StudentName",
//     TypeofInternship: "TypeofInternship",
//     Counsellor_InternalGuide: "Counsellor_InternalGuide",
//     CompanyName: "CompanyName",
//     CompanyAddress: "CompanyAddress",
//     CompanyCity: "CompanyCity",
//     CompanyState: "CompanyState",
//     HRemailID: "HRemailID",
//     HRphonenumber: "HRphonenumber",
//     TypeofProject: "TypeofProject",
//     ProjectTitle: "ProjectTitle",
//     ToolsandTechnology: "ToolsandTechnology",
//   };

//   // Loop through the query parameters and build the filter options
//   for (const key in queryParams) {
//     if (filterFields[key]) {
//       const regexQuery = new RegExp(`^${queryParams[key]}`, "i");
//       filterOptions[filterFields[key]] = { $regex: regexQuery };
//     }
//   }

//   const filteredData = await ProductModel.find(filterOptions);
//   res.status(200).json({ Data: filteredData });
// };

// const createResponse = (res, status, message, data) => {
//   return res.status(status).json({ message, data });
// };

// module.exports = {
//   getAllProducts,
//   getAllProductsTesting,
//   createResponse,
// };
