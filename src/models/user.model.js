const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const USERS_COLLECTION_NAME = 'users';

const UserRole = Object.freeze({
  ADMIN: 'ADMIN',
  FACULTY: 'FACULTY',
  STUDENT: 'STUDENT'
});

const userSchema = new Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      required: true,
      default: UserRole.STUDENT,
      enum: Object.values(UserRole)
    }
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const UserModel = model(USERS_COLLECTION_NAME, userSchema);

module.exports = {
  USERS_COLLECTION_NAME,
  UserRole,
  UserModel
};
