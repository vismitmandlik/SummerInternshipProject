const InternshipType = Object.freeze({
  IN_HOUSE: 'IN_HOUSE',
  IN_COMPANY: 'IN_COMPANY',
  IN_RESEARCH_LAB: 'IN_RESEARCH_LAB',
});

const InternshipStatus = Object.freeze({
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
});

const CompanyGuidePersonType = Object.freeze({
  COUNSELLOR: 'COUNSELLOR',
  INTERNAL: 'INTERNAL',
});

module.exports = {
  InternshipType,
  InternshipStatus,
  CompanyGuidePersonType,
};
