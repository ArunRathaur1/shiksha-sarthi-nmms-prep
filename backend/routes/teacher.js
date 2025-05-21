const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Quiz = require("../models/Quiz");

// Create a new teacher
router.post("/", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get teacher by ID (with quizzesCreated populated)
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ teacherId: req.params.id }).populate("quizzesCreated");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update teacher by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Teacher.findOneAndUpdate({ teacherId: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete teacher by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Teacher.findOneAndDelete({ teacherId: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:teacherId/create-quiz", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ teacherId: req.params.teacherId });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const quizData = {
      ...req.body,
      teacherId: req.params.teacherId,
    };

    const quiz = new Quiz(quizData);
    await quiz.save();

    teacher.quizzesCreated.push(quiz._id);
    await teacher.save();

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
