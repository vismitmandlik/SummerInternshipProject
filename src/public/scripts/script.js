function Location() {
  window.location.href = '/admin-dashboard'; // Change the URL to the route that renders dashboard.ejs
}

function Confirmation() {
  window.location.href = '/confirmation-form'; // Change the URL to the route for conformation_page.ejs
}

function Approval() {
  window.location.href = '/analytics'; // Change the URL to the route for approved.ejs
}

function approval_form() {
  window.location.href = '/approval-form'; // Change the URL to the route for approved.ejs
}
function RegisterFaculty() {
  window.location.href = '/register-faculty'; // Change the URL to the route for approved.ejs
}

function certification(studentId) {
  window.location.href = '/certification/completion-certificate/'; // Change the URL to the route for approved.ejs
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
    }
  });
}

function alertMessage() {
  window.alert('Are you sure you want to log out?');
}
