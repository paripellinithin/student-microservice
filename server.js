const express = require("express");
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: "Arjun", age: 20 },
  { id: 2, name: "Leo", age: 21 }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET by ID
app.get("/students/:id", (req, res) => {
  const st = students.find(s => s.id == req.params.id);
  if (!st) return res.status(404).json({ message: "Student not found" });
  res.json(st);
});

// POST create
app.post("/students", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age)
    return res.status(400).json({ message: "Invalid data" });

  const newStudent = {
    id: Math.floor(Math.random() * 9999),
    name,
    age
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT update
app.put("/students/:id", (req, res) => {
  let updated = false;

  students = students.map(s => {
    if (s.id == req.params.id) {
      updated = true;
      return { ...s, ...req.body };
    }
    return s;
  });

  if (!updated)
    return res.status(404).json({ message: "Student not found" });

  res.json({ message: "Updated successfully" });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const prev = students.length;
  students = students.filter(s => s.id != req.params.id);

  if (students.length == prev)
    return res.status(404).json({ message: "Student not found" });

  res.json({ message: "Deleted" });
});

// Run server
app.listen(3000, () => console.log("Student Microservice Running"));
