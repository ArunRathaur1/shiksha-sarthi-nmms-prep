const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
require("dotenv").config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

router.post("/", async (req, res) => {
  try {
    let { subject, class: className, question, options, hint } = req.body;

    // If hint text is empty, call Gemini API to generate it
    if (!hint?.text || hint.text.trim() === "") {
      // Construct prompt for hint generation
      const prompt = `Provide a helpful hint (max 50 words) for this multiple-choice question:\nQuestion: ${question}\nOptions: ${options.join(
        ", "
      )}\nHint:`;

      const requestBody = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      const geminiResponse = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const geminiData = await geminiResponse.json();

      // Extract generated hint text
      const generatedHint =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

      // Update hint.text with generated hint
      hint = { ...hint, text: generatedHint };
    }

    // Now save question with (possibly updated) hint
    const questionToSave = new Question({ ...req.body, hint });
    await questionToSave.save();

    res.status(201).json(questionToSave);
  } catch (err) {
    console.error("Error saving question:", err);
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
