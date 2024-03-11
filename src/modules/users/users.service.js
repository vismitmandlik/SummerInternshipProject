const { UserModel } = require('./user.schema');
const { UserRole } = require('./users.enum');

class UsersService {
  async findStudentByEnrollmentNumber(
    enrollmentNumber,
    projection = undefined,
  ) {
    if (!projection || !Object.keys(projection)) {
      projection = { _id: 1 };
    }

    return await UserModel.findOne(
      { enrollmentNumber, role: UserRole.STUDENT },
      projection,
    );
  }

  async validateStudentByEnrollmentNumber(enrollmentNumber) {
    const studentDoc =
      await this.findStudentByEnrollmentNumber(enrollmentNumber);

    if (!studentDoc) throw new Error('Student not found');
  }
}

const usersService = new UsersService();

module.exports = { usersService };
