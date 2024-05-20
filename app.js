const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

const database = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'GritAcademy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

database.exports = {
    query: (sql, values) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
}

app.listen(port, () => {
    console.log(`Server running on port, ${port}`);
})

// app.all('/', (res, req) => {
//     console.log("Hello World");
// })

// Get all students
app.get('/students', (req, res) => {
    database.query('SELECT * FROM students', (error, results) => {
        if (error) throw error;
        res.json(results);
    })
});