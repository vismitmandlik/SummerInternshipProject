const { Schema, model } = require('mongoose');
const { USERS_COLLECTION_NAME } = require('./user.model');

const PRODUCTS_COLLECTION_NAME = 'products';

const InternshipType = Object.freeze({
  IN_HOUSE: 'In House',
  IN_COMPANY: 'In Company'
});

const InternshipStatus = Object.freeze({
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
});

const productSchema = new Schema(
  {
    StudentID: { type: String, required: true, index: true },
    StudentName: { type: String, required: true },
    TypeofInternship: { type: String, enum: Object.values(InternshipType) },
    Counsellor_InternalGuide: { type: String },
    CompanyName: { type: String },
    CompanyAddress: { type: String },
    CompanyCity: { type: String },
    CompanyState: { type: String },
    HRemailID: { type: String },
    HRphonenumber: { type: String },
    TypeofProject: { type: String },
    ProjectTitle: { type: String },
    ToolsandTechnology: { type: String },
    Status: {
      type: String,
      enum: Object.values(InternshipStatus),
      default: InternshipStatus.PENDING
    },
    Semester: { type: String },
    Duration: { type: Number },
    StartDate: { type: Date },
    EndDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: USERS_COLLECTION_NAME },
    certificate: { type: Buffer }
  },
  { timestamps: true }
);

const ProductModel = model(PRODUCTS_COLLECTION_NAME, productSchema);

module.exports = {
  PRODUCTS_COLLECTION_NAME,
  ProductModel,
  InternshipType,
  InternshipStatus
};
