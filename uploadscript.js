// const fetch = require("node-fetch");
const questions = [
  {
    class: "NMMS",
    subject: "विज्ञान",
    topic: "कोशिका",
    question: "हमारे शरीर की संरचनात्मक और कार्यात्मक इकाई क्या कहलाती है?",
    options: ["ऊतक", "अंग", "कोशिका", "परमाणु"],
    correctAnswer: "कोशिका",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1749200239/OIP_n9pq2n.webp",
  }
];
async function uploadQuestion(question) {
  try {
    const response = await fetch("http://localhost:5000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    console.log(`✅ Uploaded: "${question.question}"`);
  } catch (error) {
    console.error(`❌ Error: "${question.question}"`, error);
  }
}

async function uploadAllQuestions() {
  for (const question of questions) {
    await uploadQuestion(question);
  }
  console.log("✅ All questions uploaded!");
}

uploadAllQuestions();
