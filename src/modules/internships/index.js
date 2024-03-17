module.exports = {
  ...require('./internship.service'),
  ...require('./internship.schema'),
  ...require('./internships.constant'),
  ...require('./internships.enum'),
  InternshipRoutes: require('./internships.route'),
};
