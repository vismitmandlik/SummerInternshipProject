const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { UserRole } = require('./users.enum');

const USERS_COLLECTION_NAME = 'users';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    fullName: { type: String, required: true },
    enrollmentNumber: {
      type: String,
      required: [
        function () {
          this.role === UserRole.STUDENT;
        },
        `enrollmentNumber is required when roll is ${UserRole.STUDENT}`,
      ],
    },
    role: {
      type: String,
      required: true,
      default: UserRole.STUDENT,
      enum: Object.values(UserRole),
    },
    password: { type: String },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const UserModel = model(USERS_COLLECTION_NAME, userSchema);

module.exports = { USERS_COLLECTION_NAME, UserModel };
