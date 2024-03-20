const { Schema } = require('mongoose');
const { CompanyGuidePersonType } = require('../internships.enum');

const addressSchema = new Schema(
  {
    street1: { type: String, required: true, minLength: 1 },
    street2: { type: String, minLength: 1 },
    city: { type: String, required: true, minLength: 1 },
    state: { type: String, required: true, minLength: 1 },
    country: { type: String, required: true, minLength: 1 },
    zipcode: { type: String, minLength: 5 },
  },
  { _id: false }
);

const companyGuidePersonSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(CompanyGuidePersonType),
    },
    name: { type: String, required: true, minLength: 1 },
  },
  { _id: false }
);

const companyHumanResourceSchema = new Schema(
  {
    name: {
      type: String,
      // required: true, // Uncomment after running import internship script
      minLength: 1,
    },
    email: { type: String, required: true, minLength: 3, maxLength: 320 },
    phoneNumber: { type: String, required: true, minLength: 5, maxLength: 20 },
  },
  { _id: false }
);

const internshipCompanySchema = new Schema(
  {
    name: { type: String, required: true, minLength: 1 },
    address: { type: addressSchema, required: true },
    guidePerson: { type: companyGuidePersonSchema, required: true },
    humanResource: { type: companyHumanResourceSchema, required: true },
  },
  { _id: false }
);

module.exports = {
  internshipCompanySchema,
};
