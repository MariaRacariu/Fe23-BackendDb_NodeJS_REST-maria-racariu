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
    console.log(`Server running on port, ${port}`);
})

// Get all
app.get('/', async (req, res) => {
    const students = await query("SELECT * FROM students");
    console.log(students);
    res.render('index', { students });
});