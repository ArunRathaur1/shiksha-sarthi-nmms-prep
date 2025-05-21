const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    studentId: { type: String, ref: "Student",   index: true },
    quizId: { type: String, ref: "Quiz",  index: true },
    teacherId: { type: String, ref: "Teacher",  index: true },
    schoolId: { type: String, ref: "School",  index: true },

    class: { type: String,  index: true },
    submittedAt: { type: Date, default: Date.now },
    timeTakenInSeconds: { type: Number }, 

    totalQuestions: { type: Number },
    correct: { type: Number },
    incorrect: { type: Number },
    unattempted: { type: Number },
    scorePercentage: { type: Number },

    questionsSolved: [{ type: String, ref: "Question" }],

    answers: [
      {
        questionId: { type: String, ref: "Question",   },
        selectedOption: { type: String },
        isCorrect: { type: Boolean },
        answeredAt: { type: Date }, 
      },
    ],

    remarks: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
