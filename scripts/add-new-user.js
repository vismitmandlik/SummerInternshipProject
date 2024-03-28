require('dotenv').config();

const { connectDatabase } = require('../src/utils/db/mongoose/connection');
const mongoose = require('mongoose');
const { UserModel, UserRole } = require('../src/modules/users');

async function addNewUser() {
  const userDoc = {
    firstName: 'Vismit',
    middleName: 'Jitendrabhai',
    lastName: 'Mandlik',
    fullName: 'Vismit Jitendrabhai Mandlik',
    username: '21CE068',
    password: '21CE068',
    role: UserRole.STUDENT,
    enrollmentNumber: '21CE068', // Required if role === UserRole.STUDENT
    semester: 4, // Required if role === UserRole.STUDENT
  };

  const user = await UserModel.create(userDoc);
  console.log(
    `User with id ${user._id} created.`,
    JSON.stringify(user, null, 2)
  );
}

async function main() {
  try {
    connectDatabase();
    await addNewUser();
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

main();
