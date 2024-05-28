const express = require("express");
const mysql = require("mysql2");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('public'));
const port = process.env.PORT || 9000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'GritAcademy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

function query(sql, values) {
    return new Promise((resolve, reject) => {
        database.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

app.listen(port, () => {
    console.log(`Server running on port, http://localhost:${port}`);
})

//
app.get('/', async (req, res) => {
    const title = "Homepage";
    const studentInfo = undefined;
    const courseInfo = undefined;
    res.render('index', { studentInfo, title, courseInfo });
});

//Button
app.post('/', async (req, res) => {
    const title = "Homepage";

    const studentInput = req.body.studentSearch;
    const courseInput = req.body.courseSearch;

    const courseInputSpecial = `%${courseInput}%`;
    const replaceInput = courseInputSpecial.replace(/,/g, '');
    // console.log(replaceInput);

    if (studentInput) {
        const studentInfo = await query('SELECT students.id, students.fName, students.lName, courses.name FROM students_courses INNER JOIN courses ON students_courses.courses_id = courses.id INNER JOIN students ON students_courses.students_id = students.id WHERE students.id = ? OR students.fName = ? OR students.lName = ? OR students.town = ?;', [studentInput, studentInput, studentInput, studentInput]);
        console.log(studentInfo);
        const courseInfo = undefined;
        if (studentInfo == "") {
            res.render('index', { studentInfo, title, courseInfo });
        }
        res.render('index', { studentInfo, title, courseInfo });
    } if (courseInput) {
        console.log(courseInput);
        // const courseInfo = await query('SELECT courses.id, courses.name, courses.description, students.fName, students.lName FROM students_courses INNER JOIN courses ON students_courses.courses_id = courses.id INNER JOIN students ON students_courses.students_id = students.id WHERE courses.id = ? OR courses.name = ? OR courses.description LIKE ?;', [courseInput, courseInput, replaceInput]);
        const courseInfo = await query('SELECT courses.id, courses.name, courses.description, students.fName, students.lName FROM students_courses INNER JOIN courses ON students_courses.courses_id = courses.id INNER JOIN students ON students_courses.students_id = students.id WHERE courses.id = ? OR courses.name = ? OR courses.description LIKE ?;', [courseInput, courseInput, replaceInput]);
        console.log(courseInfo);
        const studentInfo = undefined;
        if (studentInfo == "") {
            res.render('index', { courseInfo, title, studentInfo });
        }
        res.render('index', { courseInfo, title, studentInfo });
    } else {
        const studentInfo = undefined;
        const courseInfo = undefined;
        res.render('index', { studentInfo, title, courseInfo });
    }
});

// Get students
app.get('/students', async (req, res) => {
    const title = "Students";
    const students = await query("SELECT * FROM students;");
    // console.log(students);
    res.render('partials/showStudents', { title, students });
});

// Get courses
app.get('/courses', async (req, res) => {
    const title = "Courses";
    const courses = await query("SELECT courses.id, courses.name FROM courses;");
    // console.log(courses);
    res.render('partials/showCourses', { title, courses });
});

// Get what classes students attend
app.get('/studentsCourses', async (req, res) => {
    const title = "What classes students take:";
    const relationships = await query("SELECT students.id, courses.name, students.fName, students.lName  FROM students_courses INNER JOIN courses ON students_courses.courses_id = courses.id INNER JOIN students ON students_courses.students_id = students.id;");
    // console.log(relationships);
    res.render('partials/showRelationship', { relationships, title });
});

// Show student name with all the courses they take
app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const studentInfo = await query('SELECT students.id, students.fName, students.lName, courses.name  FROM students_courses INNER JOIN courses ON students_courses.courses_id = courses.id INNER JOIN students ON students_courses.students_id = students.id WHERE students_id = ?;', [id]);
    console.log(studentInfo);
    if (studentInfo == "") {
        const studentInfo = await query('SELECT * FROM students WHERE id = ?', [id]);
        console.log(studentInfo);
        res.render('partials/showStudent', { studentInfo });
    }
    res.render('partials/showStudent', { studentInfo });
});

// Show course info
app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const courseInfo = await query('SELECT courses.id, courses.name, courses.description FROM courses WHERE id = ?;', [id]);
    // console.log(courseInfo);
    res.render('partials/showCourse', { courseInfo });
});