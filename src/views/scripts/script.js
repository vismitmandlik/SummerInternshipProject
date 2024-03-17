function Location() {
  window.location.href = '/auth/admin-dashboard';
}

function Confirmation() {
  window.location.href = '/confirmation-form';
}

function handleRequests() {
  window.location.href = '/internships';
}

function approval_form() {
  window.location.href = '/approval-form';
}
function RegisterFaculty() {
  window.location.href = '/auth/register-faculty';
}

function certification(studentId) {
  window.location.href = '/certification/completion-certificate/';
}

function analytics() {
  window.location.href = '/analytics';
}

// Define the function to fetch student data
function fetchStudentData(callback) {
  // Make an AJAX request to fetch student data
  $.ajax({
    type: 'GET',
    url: '/get-students', // Replace with your server route for fetching students
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.error('Error fetching student data:', error);
    },
  });
}

function alertMessage() {
  window.alert('Are you sure you want to log out?');
}
