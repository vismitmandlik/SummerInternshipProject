function Location() {
    window.location.href = "/admin-dashboard"; // Change the URL to the route that renders dashboard.ejs
}

function Confirmation() {
    window.location.href = "/confirmation-form"; // Change the URL to the route for conformation_page.ejs
}

function Approval() {
    window.location.href = "/manage-requests"; // Change the URL to the route for approved.ejs
}

function approval_form() {
    window.location.href = "/approval-form"; // Change the URL to the route for approved.ejs
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

// Define the function to search for students
function searchStudent() {
    // Get the search query from the input field
    const searchQuery = document.getElementById("searchStudent").value;

    // Fetch student data and then filter it based on the search query
    fetchStudentData(function (students) {
        const filteredStudents = students.filter(student => {
            return student.StudentID.includes(searchQuery);
        });

        // Update the table with the filtered data
        currentPage = 1; // Reset to the first page
        totalPages = Math.ceil(filteredStudents.length / entriesPerPage);

        // Update the table with the filtered data
        updateTable(filteredStudents);
    });
}
