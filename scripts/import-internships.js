require('dotenv').config();
const rawInternships = require('./student-updated.json');

const {
  InternshipModel,
  CompanyGuidePersonType,
} = require('../src/modules/internships');
const { connectDatabase } = require('../src/utils/db/mongoose/connection');
const { default: mongoose } = require('mongoose');
const { UserModel } = require('../src/modules/users');
const internships = require('../src/modules/internships');

const SEMESTER_MAP = Object.freeze({
  23: 4,
  22: 4,
  21: 6,
  20: 6,
  19: 6,
});

async function importInternships() {
  for (const rawInternship in rawInternships) {
    // const userDoc = {};

    // const user = await UserModel.create(userDoc);

    const internshipDoc = {
      type: rawInternship.TypeofInternship,
      company: {
        name: rawInternship.CompanyName,
        address: {
          street1: rawInternship.CompanyAddress,
          city: rawInternship.CompanyCity,
          state: rawInternship.CompanyState,
          country: 'India',
        },
        guidePerson: {
          type: CompanyGuidePersonType.COUNSELLOR,
          name: rawInternship.Counsellor_InternalGuide,
        },
        humanResource: {
          name: '',
          email: '',
          phoneNumber: '',
        },
      },
      project: {
        type: rawInternship.TypeofProject || 'Technology Training',
        name: rawInternship.ProjectTitle,
        technologies: rawInternship.ToolsandTechnology.split(',').map(
          (technology) => technology.trim()
        ),
      },

      // TODO: Add this object conditionaly
      student: {
        _id: '',
        firstName: '',
        lastName: '',
        fullName: '',
        enrollmentNumber: '',
        semester: 1,
      },
      startedAt: rawInternship.StartDate || undefined,
      endedAt: rawInternship.EndDate || undefined,
    };

    await InternshipModel.create(internshipDoc);
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
