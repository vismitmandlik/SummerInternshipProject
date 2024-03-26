require('dotenv').config();

const { connectDatabase } = require('../src/utils/db/mongoose/connection');
const mongoose = require('mongoose');
const { UserModel, UserRole } = require('../src/modules/users');

async function addNewUser() {
  const userDoc = {
    firstName: 'Sneha',
    middleName: 'Ashwinbhai',
    lastName: 'Padhiar',
    fullName: 'Sneha Ashwinbhai Padhiar',
    username: 'snehapadhiar',
    password: 'admin',
    role: UserRole.FACULTY,
    // enrollmentNumber: '', // Required if role === UserRole.STUDENT
    // semester: '', // Required if role === UserRole.STUDENT
  };

  await UserModel.create(userDoc);
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
