document.addEventListener("DOMContentLoaded", loadStudents);

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem("students")) || [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const age = document.getElementById("age").value;

    if (id) {
        students = students.map(student =>
            student.id == id ? { id, name, email, course, age } : student
        );
    } else {
        students.push({
            id: Date.now(),
            name,
            email,
            course,
            age
        });
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    loadStudents();
});

function loadStudents() {
    table.innerHTML = "";
    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.age}</td>
                <td>
                    <button class="edit" onclick="editStudent(${student.id})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function editStudent(id) {
    const student = students.find(s => s.id == id);
    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("age").value = student.age;
}

function deleteStudent(id) {
    students = students.filter(student => student.id != id);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

searchInput.addEventListener("keyup", function() {
    const value = searchInput.value.toLowerCase();
    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(value)
    );
    table.innerHTML = "";
    filtered.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.age}</td>
                <td>
                    <button class="edit" onclick="editStudent(${student.id})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
    });
});