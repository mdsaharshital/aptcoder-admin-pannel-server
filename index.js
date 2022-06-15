const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myemployee",
});
// =====================
// =====================
//Todo Create
app.post("/create", (req, res) => {
  const name = req.body.name;
  const salary = req.body.salary;
  const gender = req.body.gender;
  const department = req.body.department;

  db.query(
    "INSERT INTO employee (name, salary, gender, department) VALUES (?,?,?,?)",
    [name, salary, gender, department],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Emplyee Added");
      }
    }
  );
});
// ===============
//All Todo List fecth
app.get("/all", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// ================
// ================
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(port, () => {
  console.log("listening from port", port);
});
