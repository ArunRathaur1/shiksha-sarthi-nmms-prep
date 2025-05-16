const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  schoolId: { type: String, ref: "School" },
  password: String,
  class: String,
  quizAttempted: [{ type: String, ref: "Quiz" }],
});

module.exports = mongoose.model("Student", studentSchema);
