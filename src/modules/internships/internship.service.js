const { usersService } = require('../users');
const { InternshipModel } = require('./internship.schema');
const { InternshipStatus } = require('./internships.enum');

class InternshipsService {
  async upsertInternship(input) {
    delete input.status;

    const internship = await InternshipModel.findOne(
      { 'student.enrollmentNumber': input.student.enrollmentNumber },
      { _id: 1, status: 1 },
    );

    if (!internship) {
      await InternshipModel.create(input);
      return;
    }

    if (internship.status === InternshipStatus.APPROVED) {
      throw new Error('Cannot update already approved internship');
    }

    await InternshipModel.updateOne({ _id: internship._id }, { $set: input });
  }

  async uploadCertificate(enrollmentNumber, certificate) {
    await usersService.validateStudentByEnrollmentNumber(enrollmentNumber);

    await InternshipModel.updateOne(
      { 'student.enrollmentNumber': enrollmentNumber },
      { $set: { certificate } },
    );
  }
}

const internshipsService = new InternshipsService();

module.exports = {
  internshipsService,
};
