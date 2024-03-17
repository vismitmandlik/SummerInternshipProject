module.exports = {
  ...require('./internship.service'),
  ...require('./schemas'),
  ...require('./internships.constant'),
  ...require('./internships.enum'),
  InternshipRoutes: require('./internships.route'),
};
