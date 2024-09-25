const apiUrl = "https://vvri.pythonanywhere.com/api/courses";

        //kurzusoknak a megjelnitese
        function loadCourses() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const list = document.getElementById("courses-list");
                    list.innerHTML = "";
                    data.forEach(course => {
                        const listItem = document.createElement("li");
                        listItem.textContent = course.name;
                        listItem.addEventListener("click", () => showCourseDetails(course));
                        list.appendChild(listItem);
                    });
                })
                .catch(error => console.error("Hiba történt:", error));
        }

        // kurzus reszletek megjelenitese
        function showCourseDetails(course) {
            document.getElementById("course-details").style.display = "block";
            document.getElementById("course-name").textContent = `Kurzus neve: ${course.name}`;
            
            const studentsList = document.getElementById("students-list");
            studentsList.innerHTML = ""; 
            course.students.forEach(student => {
                const studentItem = document.createElement("li");
                studentItem.textContent = student.name;
                
                const editButton = document.createElement("button");
                editButton.textContent = "Szerkesztés";
                editButton.addEventListener("click", () => editStudent(course.id, student));

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Törlés";
                deleteButton.addEventListener("click", () => deleteStudent(course.id, student.id));
                
                studentItem.appendChild(editButton);
                studentItem.appendChild(deleteButton);
                studentsList.appendChild(studentItem);
            });

            // diakok hozzatevese
            const addStudentForm = document.getElementById("add-student-form");
            addStudentForm.onsubmit = function(event) {
                event.preventDefault();
                const studentName = document.getElementById("student-name").value;
                addStudent(course.id, studentName);
            };
        }

        // uj kurzus
        document.getElementById("create-course-form").onsubmit = function(event) {
            event.preventDefault();
            const courseName = document.getElementById("new-course-name").value;

            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: courseName })
            })
            .then(() => loadCourses())
            .catch(error => console.error("Hiba történt:", error));
        };

        // diak hozzarendeles
        function addStudent(courseId, studentName) {
            fetch(`${apiUrl}/${courseId}/students`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: studentName })
            })
            .then(() => loadCourses())
            .catch(error => console.error("Hiba történt:", error));
        }

        // diak szerkesztes
        function editStudent(courseId, student) {
            const newName = prompt("Add meg az új nevet", student.name);
            if (newName) {
                fetch(`${apiUrl}/${courseId}/students/${student.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: newName })
                })
                .then(() => loadCourses())
                .catch(error => console.error("Hiba történt:", error));
            }
        }

        // torles
        function deleteStudent(courseId, studentId) {
            if (confirm("Biztosan törlöd a diákot?")) {
                fetch(`${apiUrl}/${courseId}/students/${studentId}`, {
                    method: "DELETE"
                })
                .then(() => loadCourses())
                .catch(error => console.error("Hiba történt:", error));
            }
        }

    
        window.onload = loadCourses;