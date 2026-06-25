const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require("./models/Student");
const Attendance = require("./models/Attendance");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Attendance Management API Running");
});

// Add Student
app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

// Get Students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Mark Attendance
app.post("/attendance", async (req, res) => {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.json(attendance);
});
