const { Schema, model, Types } = require('mongoose');
const { USERS_COLLECTION_NAME } = require('../users');
const {
  InternshipType,
  InternshipProjectType,
  InternshipStatus,
} = require('./internships.enum');

const INTERNSHIPS_COLLECTION_NAME = 'internships';

const internshipProjectSchema = new Schema(
  {
    type: { type: String, required: true, enum: InternshipProjectType },
    name: { type: String, required: true },
    technologies: { type: [String], required: true, default: [] },
  },
  { _id: false }
);

const internshipStudentSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true, ref: USERS_COLLECTION_NAME },
    firstName: { type: String, required: true },
    lastName: { type: String },
    fullName: { type: String, required: true },
    enrollmentNumber: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
  },
  { _id: false }
);

const internshipSchema = new Schema(
  {
    type: { type: String, enum: Object.values(InternshipType) },
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
