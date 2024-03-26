const { Schema, model } = require('mongoose');
const { UserRole } = require('./users.enum');

const USERS_COLLECTION_NAME = 'users';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 1 },
    middleName: {
      type: String,
      required: true, // TODO: Uncomment after running import internship script
      minLength: 1,
    },
    lastName: {
      type: String,
      required: true, // TODO: Uncomment after running import internship script
      minLength: 1,
    },
    fullName: { type: String, required: true, minLength: 1 },
    username: { type: String, required: true, unique: true, minLength: 1 },
    enrollmentNumber: {
      type: String,
      required: [
        function () {
          this.role === UserRole.STUDENT;
        },
        `{PATH} is required when role is ${UserRole.STUDENT}`,
      ],
      minLength: 7,
      maxLength: 10,
    },
    semester: {
      type: Number,
      required: [
        function () {
          this.role === UserRole.STUDENT;
        },
        `{PATH} is required when role is ${UserRole.STUDENT}`,
      ],
      min: 1,
      max: 8,
    },
    role: {
      type: String,
      required: true,
      default: UserRole.STUDENT,
      enum: Object.values(UserRole),
    },
    password: { type: String, required: true, minLength: 4 },
  },
  { timestamps: true }
);

const UserModel = model(USERS_COLLECTION_NAME, userSchema);

module.exports = { USERS_COLLECTION_NAME, UserModel };
