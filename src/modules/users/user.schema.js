const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { UserRole } = require('./users.enum');

const USERS_COLLECTION_NAME = 'users';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 1 },
    middleName: {
      type: String,
      // required: true, // Uncomment after running import internship script
      minLength: 1,
    },
    lastName: {
      type: String,
      // required: true, // Uncomment after running import internship script
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
        `{PATH} is required when roll is ${UserRole.STUDENT}`,
      ],
      minLength: 7,
      maxLength: 10,
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

userSchema.plugin(passportLocalMongoose);

const UserModel = model(USERS_COLLECTION_NAME, userSchema);

module.exports = { USERS_COLLECTION_NAME, UserModel };
