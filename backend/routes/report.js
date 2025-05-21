const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("studentId")
      .populate("quizId")
      .populate("teacherId")
      .populate("schoolId")
      .populate("answers.questionId");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reports by studentId
router.get("/student/:studentId", async (req, res) => {
  try {
    const reports = await Report.find({ studentId: req.params.studentId })
      .populate("quizId")
      .populate("answers.questionId");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reports by quizId
router.get("/quiz/:quizId", async (req, res) => {
  try {
    const reports = await Report.find({ quizId: req.params.quizId })
      .populate("studentId")
      .populate("answers.questionId");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reports by teacherId
router.get("/teacher/:teacherId", async (req, res) => {
  try {
    const reports = await Report.find({ teacherId: req.params.teacherId })
      .populate("quizId")
      .populate("studentId");
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reports by schoolId
router.get("/school/:schoolId", async (req, res) => {
  try {
    const reports = await Report.find({ schoolId: req.params.schoolId });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("studentId")
      .populate("quizId")
      .populate("teacherId")
      .populate("answers.questionId");
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Question-wise analysis for a quiz: How many got each question right/wrong
router.get("/quiz/:quizId/question-analysis", async (req, res) => {
  try {
    const reports = await Report.find({ quizId: req.params.quizId });

    const questionStats = {};

    reports.forEach((report) => {
      report.answers.forEach(({ questionId, isCorrect }) => {
        if (!questionStats[questionId]) {
          questionStats[questionId] = { correct: 0, incorrect: 0, total: 0 };
        }
        if (isCorrect) {
          questionStats[questionId].correct++;
        } else {
          questionStats[questionId].incorrect++;
        }
        questionStats[questionId].total++;
      });
    });

    res.status(200).json(questionStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
