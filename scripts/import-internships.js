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
  undefined: undefined,
  23: 4,
  22: 4,
  21: 6,
  20: 6,
  19: 6,
});

function cleanInternshipData(rawInternship) {
  if (!rawInternship.FirstName) {
    const nameParts = rawInternship.StudentName?.split(' ') || [];
    rawInternship.FirstName = nameParts.shift();
    rawInternship.LastName = nameParts.shift();
    rawInternship.MidName = nameParts.shift();
  }
  if (!rawInternship.StudentName) {
    rawInternship.StudentName = [
      rawInternship.FirstName,
      rawInternship.MidName,
      rawInternship.LastName,
    ].join(' ');
  }
  return rawInternship;
}

async function importInternships() {
  for (const [index, rawInternship] of rawInternships.entries()) {
    process.stdout.write(`\r${index}: ${rawInternship.StudentID} | In Process`);
    let internshipDoc;
    try {
      const internship = cleanInternshipData(rawInternship);

      let user = await UserModel.findOne(
        { enrollmentNumber: internship.StudentID },
        { _id: 1 }
      ).lean();

      if (!user) {
        const userDoc = {
          firstName: internship.FirstName,
          middleName: internship.MidName,
          lastName: internship.LastName,
          fullName: internship.StudentName,
          username: internship.StudentID,
          enrollmentNumber: internship.StudentID,
          semester: SEMESTER_MAP[internship.StudentID?.match(/\d+/)[0]],
          role: UserRole.STUDENT,
          password: internship.StudentID,
        };

        try {
          user = await UserModel.create(userDoc);
        } catch (err) {
          process.stdout.write(
            `\r${index}: ${rawInternship.StudentID} | user | Error - ${err.message}\n`
          );
          continue;
        }
      }

      internshipDoc = {
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
            name: internship.Counsellor_InternalGuide || internship.Counsellor,
          },
          humanResource: {
            email: internship.HRemailID,
            phoneNumber: internship.HRphonenumber,
          },
        },
        project: {
          type: internship.TypeofProject || 'Technology Training',
          name: internship.ProjectTitle,
          technologies: internship.ToolsandTechnology?.split(',')
            .map((technology) => technology.trim())
            .filter((technology) => technology.length),
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
    } catch (err) {
      console.log({ rawInternship });
      console.error(err);
      break;
    }

    try {
      const result = await InternshipModel.updateOne(
        { 'student.enrollmentNumber': internshipDoc.student.enrollmentNumber },
        { $setOnInsert: internshipDoc },
        { upsert: true }
      );
      if (result.matchedCount) {
        process.stdout.write(
          `\r${index}: ${rawInternship.StudentID} | Already Processed\n`
        );
      } else {
        process.stdout.write(
          `\r${index}: ${rawInternship.StudentID} | Complete     \n`
        );
      }
    } catch (err) {
      process.stdout.write(
        `\r${index}: ${rawInternship.StudentID} | internship | Error - ${err.message}\n`
      );
    }
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
