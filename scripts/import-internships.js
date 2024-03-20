require('dotenv').config();
const rawInternships = require('../dump/internship-details.json');

const {
  InternshipModel,
  CompanyGuidePersonType,
} = require('../src/modules/internships');
const { connectDatabase } = require('../src/utils/db/mongoose/connection');
const { default: mongoose } = require('mongoose');
const { UserModel, UserRole } = require('../src/modules/users');

const SEMESTER_MAP = Object.freeze({
  23: 4,
  22: 4,
  21: 6,
  20: 6,
  19: 6,
});

function cleanInternshipData(rawInternship) {
  if (!rawInternship.FirstName) {
    const nameParts = rawInternship.StudentName.split(' ');
    rawInternship.FirstName = nameParts.shift();
    rawInternship.LastName = nameParts.shift();
    rawInternship.MidName = nameParts.shift();
  }
  if (!rawInternship.StudentName) {
    rawInternship.StudentName =
      rawInternship.FirstName + rawInternship.MidName + rawInternship.LastName;
  }
  return rawInternship;
}

async function importInternships() {
  for (const [index, rawInternship] of rawInternships.entries()) {
    const internship = cleanInternshipData(rawInternship);

    let user = await UserModel.findOne(
      { enrollmentNumber: internship.StudentID },
      { _id: 1 }
    ).lean();

    if (!user) {
      user = await UserModel.create({
        firstName: internship.FirstName,
        middleName: internship.MidName,
        lastName: internship.LastName,
        fullName: internship.StudentName,
        username: internship.StudentID,
        enrollmentNumber: internship.StudentID,
        semester: SEMESTER_MAP[internship.StudentID.match(/\d+/)[0]],
        role: UserRole.STUDENT,
        password: internship.StudentID,
      });
    }

    const internshipDoc = {
      type: internship.TypeofInternship,
      company: {
        name: internship.CompanyName,
        address: {
          street1: internship.CompanyAddress,
          city: internship.CompanyCity,
          state: internship.CompanyState,
          country: 'India',
        },
        guidePerson: {
          type: CompanyGuidePersonType.COUNSELLOR,
          name: internship.Counsellor_InternalGuide,
        },
        humanResource: {
          email: internship.HRemailID,
          phoneNumber: internship.HRphonenumber,
        },
      },
      project: {
        type: internship.TypeofProject || 'Technology Training',
        name: internship.ProjectTitle,
        technologies: internship.ToolsandTechnology.split(',').map(
          (technology) => technology.trim()
        ),
      },
      student: {
        _id: user._id,
        firstName: internship.FirstName,
        middleName: internship.MidName,
        lastName: internship.LastName,
        fullName: internship.StudentName,
        enrollmentNumber: internship.StudentID,
        semester: SEMESTER_MAP[internship.StudentID.match(/\d+/)[0]],
        counsellorName:
          internship.Counsellor || internship.Counsellor_InternalGuide,
      },
      startedAt: internship.StartDate || undefined,
      endedAt: internship.EndDate || undefined,
    };

    try {
      await InternshipModel.updateOne(
        { 'student.enrollmentNumber': internship.StudentID },
        { $setOnInsert: internshipDoc },
        { upsert: true }
      );
    } catch (err) {
      console.error(err);
    }

    // break;
  }
}

async function main() {
  try {
    connectDatabase();
    await importInternships();
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

main();
