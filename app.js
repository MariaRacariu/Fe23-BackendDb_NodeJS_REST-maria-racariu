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

// Get 
app.get('/', async (req, res) => {
    const title = "Homepage";
    res.render('index', { title });
});


// Get students
app.get('/students', async (req, res) => {
    const title = "Students";
    const students = await query("SELECT * FROM students;");
    console.log(students);
    res.render('partials/showStudents', { title, students });
});



// Get courses
app.get('/courses', async (req, res) => {
    const title = "Courses";
    const courses = await query("SELECT * FROM courses;");
    console.log(courses);
    res.render('partials/showCourses', { title, courses });
});

// A function that generates a table for the data
// function buildTable(columns) {
//     // Create all columns
//     let columnSize = "";
//     // Create column for every column
//     for (let i = 0; i < columns.length; i++) {
//         // If columns length is bigger then i take away 1
//         if (i < columns.length - 1) {
//             columnSize += columns[i] + ",";
//         } else {
//             columnSize += columns[i];
//         }
//     }
//     return columnSize;
// }
