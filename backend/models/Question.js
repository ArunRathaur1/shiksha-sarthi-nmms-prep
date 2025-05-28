const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  subject: { type: String  },
  class: { type: String },
  topic: { type: String },
  question: { type: String },
  questionImage: {
    type: String,
    required: false,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  hint: {
    text: { type: String, required: false },
    image: { type: String },
    video: { type: String },
  },
  teacherId: {
    type: String,
    ref: "Teacher", 
  },
});

module.exports = mongoose.model("Question", questionSchema);
