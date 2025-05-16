const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  schoolId: { type: String, ref: "School" },
  password: String,
  quizzesCreated: [{ type: String, ref: "Quiz" }],
});

module.exports = mongoose.model("Teacher", teacherSchema);
