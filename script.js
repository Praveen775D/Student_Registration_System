// Fetch stored students from localStorage or initialize empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// DOM elements
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const tableContainer = document.querySelector(".table-container");

/**
 * Renders student data into the table
 * Also updates localStorage and scrollbar dynamically
 */
function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <span class="action-btn" onclick="editStudent(${index})">Edit</span>
                    <span class="action-btn" onclick="deleteStudent(${index})">Delete</span>
                </td>
            </tr>
        `;
    });

    // Save data persistently
    localStorage.setItem("students", JSON.stringify(students));

    // Enable vertical scrollbar dynamically
    tableContainer.style.overflowY = students.length > 5 ? "auto" : "visible";
}

/**
 * Handles form submission for add/update
 */
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const editIndex = document.getElementById("editIndex").value;

    // Empty field validation
    if (!name || !studentId || !email || !contact) {
        alert("All fields are required");
        return;
    }

    // Name validation (letters only)
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Student name must contain only alphabets");
        return;
    }

    // Student ID validation (numbers only)
    if (!/^\d+$/.test(studentId)) {
        alert("Student ID must contain only numbers");
        return;
    }

    // Contact number validation (exactly 10 digits)
    if (!/^\d{10}$/.test(contact)) {
        alert("Contact number must be exactly 10 digits");
        return;
    }

    const studentData = { name, studentId, email, contact };

    // Add or update student
    if (editIndex === "") {
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        document.getElementById("editIndex").value = "";
    }

    form.reset();
    renderTable();
});

/**
 * Loads student data into form for editing
 */
function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    document.getElementById("editIndex").value = index;
}

/**
 * Deletes a student record
 */
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        renderTable();
    }
}

// Initial table load
renderTable();
