const { Schema, model, Types } = require('mongoose');
const { USERS_COLLECTION_NAME } = require('../../users');
const {
  InternshipType,
  InternshipProjectType,
  InternshipStatus,
} = require('../internships.enum');
const { internshipCompanySchema } = require('./internship-company.schema');

const INTERNSHIPS_COLLECTION_NAME = 'internships';

const internshipProjectSchema = new Schema(
  {
    type: { type: String, required: true, minLength: 1 },
    name: { type: String, required: true, minLength: 1 },
    technologies: {
      type: [{ type: String, minLength: 1 }],
      required: true,
      default: [],
    },
  },
  { _id: false }
);

const internshipStudentSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true, ref: USERS_COLLECTION_NAME },
    firstName: { type: String, required: true, minLength: 1 },
    middleName: {
      type: String,
      // required: true, // TODO: Uncomment after running import internship script
      minLength: 1,
    },
    lastName: {
      type: String,
      // required: true, // TODO: Uncomment after running import internship script
      minLength: 1,
    },
    fullName: { type: String, required: true, minLength: 1 },
    enrollmentNumber: {
      type: String,
      required: true,
      minLength: 7,
      maxLength: 10,
    },
    semester: { type: Number, required: true, min: 1, max: 8 },
    counsellorName: { type: String, required: true, minLength: 1 },
  },
  { _id: false }
);

const internshipSchema = new Schema(
  {
    type: { type: String, enum: Object.values(InternshipType) },
    company: { type: internshipCompanySchema, required: true },
    project: { type: internshipProjectSchema, required: true },
    status: {
      type: String,
      enum: InternshipStatus,
      required: true,
      default: InternshipStatus.PENDING,
    },
    student: { type: internshipStudentSchema, required: true },
    certificate: { type: Buffer },
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

const InternshipModel = model(INTERNSHIPS_COLLECTION_NAME, internshipSchema);

module.exports = { InternshipModel };
