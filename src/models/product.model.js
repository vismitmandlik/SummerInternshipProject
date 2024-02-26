const { Schema, model } = require('mongoose');
const { USERS_COLLECTION_NAME } = require('./user.model');

const PRODUCTS_COLLECTION_NAME = 'products';

const productSchema = new Schema({
  StudentID: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  StudentName: {
    type: String
  },
  TypeofInternship: {
    type: String
  },
  Counsellor_InternalGuide: {
    type: String
  },
  CompanyName: {
    type: String
  },
  CompanyAddress: {
    type: String
  },
  CompanyCity: {
    type: String
  },
  CompanyState: {
    type: String
  },
  HRemailID: {
    type: String
  },
  HRphonenumber: {
    type: String
  },
  TypeofProject: {
    type: String
  },
  ProjectTitle: {
    type: String
  },
  ToolsandTechnology: {
    type: String
  },
  Status: {
    type: String,
    default: 'Pending'
  },
  Semester: {
    type: String,
    default: 'Not Provided'
  },
  Duration: {
    type: Number,
    default: 'Not Provided'
  },
  StartDate: {
    type: Date,
    default: 'Not Provided'
  },
  EndDate: {
    type: Date,
    default: 'Not Provided'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USERS_COLLECTION_NAME
  },
  certificate: {
    type: Buffer
  }
});

const ProductModel = model(PRODUCTS_COLLECTION_NAME, productSchema);

module.exports = {
  PRODUCTS_COLLECTION_NAME,
  ProductModel
};
