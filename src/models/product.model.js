const { Schema, model } = require('mongoose');
const { USERS_COLLECTION_NAME } = require('./user.model');

const PRODUCTS_COLLECTION_NAME = 'products';

const productSchema = new Schema({
  StudentID: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness of StudentID
    index: true, // Create an index on StudentID
    // TODO: Remove default
    default: 'Not Provided'
  },
  StudentName: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  TypeofInternship: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  Counsellor_InternalGuide: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  CompanyName: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  CompanyAddress: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  CompanyCity: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  CompanyState: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  HRemailID: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  HRphonenumber: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  TypeofProject: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  ProjectTitle: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  ToolsandTechnology: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  Status: {
    type: String,
    default: 'Pending' // Default value of "Not Provided"
  },
  Semester: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  Duration: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  StartDate: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  EndDate: {
    type: String,
    default: 'Not Provided' // Default value of "Not Provided"
  },
  // Link the product schema with the user schema
  user: {
    type: Schema.Types.ObjectId,
    ref: USERS_COLLECTION_NAME
  },

  // field for the certificate file
  certificate: {
    type: Buffer
  }
});

const ProductModel = model(PRODUCTS_COLLECTION_NAME, productSchema);

module.exports = {
  PRODUCTS_COLLECTION_NAME,
  ProductModel
};
