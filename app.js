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
    // res.render('index', { title });
    // const { id } = req.params;
    // console.log(studentInfo);
    // const studentInfo = await query('SELECT courses.name, students.firstName, students.lastName, students.id FROM students_courses INNER JOIN courses ON students_courses.courseID = courses.id INNER JOIN students ON students_courses.studentID = students.id;');
    const studentInfo = undefined;
    res.render('index', { studentInfo, title });
});

//Button
app.post('/', async (req, res) => {
    const title = "Homepage";
    // const studentInfo = await query('SELECT courses.name, students.firstName, students.lastName, students.id FROM students_courses INNER JOIN courses ON students_courses.courseID = courses.id INNER JOIN students ON students_courses.studentID = students.id;');

    const id = req.body.studentSearch;

    if (id) {
        const studentInfo = await query('SELECT courses.name, students.firstName, students.lastName, students.id FROM students_courses INNER JOIN courses ON students_courses.courseID = courses.id INNER JOIN students ON students_courses.studentID = students.id WHERE students.id = ?;', [id]);
        console.log(studentInfo);
        res.render('index', { studentInfo, title });
    } else {
        const studentInfo = undefined;
        res.render('index', { studentInfo, title });
    }


});

// Get students
app.get('/students', async (req, res) => {
    // const query = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'students' AND TABLE_SCHEMA = 'GritAcademy';`;

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
    const relationships = await query("SELECT courses.name, students.firstName, students.lastName, students.id FROM students_courses INNER JOIN courses ON students_courses.courseID = courses.id INNER JOIN students ON students_courses.studentID = students.id;");
    // console.log(relationships);
    res.render('partials/showRelationship', { relationships, title });
});

// Show student name with all the courses they take
app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    const studentInfo = await query('SELECT courses.name, students.firstName, students.lastName, students.id FROM students_courses INNER JOIN courses ON students_courses.courseID = courses.id INNER JOIN students ON students_courses.studentID = students.id WHERE studentID = ?;', [id]);
    // console.log(studentInfo);
    res.render('partials/showStudentInfo', { studentInfo });
});



// Show course info
app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const courseInfo = await query('SELECT courses.name, courses.description FROM courses WHERE id = ?;', [id]);
    console.log(courseInfo);
    res.render('partials/showCourse', { courseInfo });
})