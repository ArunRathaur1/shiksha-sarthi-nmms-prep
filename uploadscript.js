import fetch from "node-fetch"; 

const questions = [
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question:
      "यदि α और β, बहुपद x² - 5x + 6 के मूल (zeros) हैं, तो α + β का मान क्या होगा?",
    questionImage: "",
    options: ["5", "-5", "6", "-6"],
    correctAnswer: "5",
    hint: {
      text: "α + β = - (b/a)",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question:
      "यदि बहुपद x² + 7x + 10 के मूल 𝛼 और β हैं, तो 𝛼β का मान क्या होगा?",
    questionImage: "",
    options: ["10", "7", "-10", "-7"],
    correctAnswer: "10",
    hint: {
      text: "𝛼β = c/a",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question: "x² - 3x + 2 को गुणनखंड रूप में व्यक्त करें।",
    questionImage: "",
    options: [
      "(x - 1)(x - 2)",
      "(x + 1)(x + 2)",
      "(x - 2)(x + 1)",
      "(x + 2)(x - 3)",
    ],
    correctAnswer: "(x - 1)(x - 2)",
    hint: {
      text: "दो संख्याएँ खोजें जिनका गुणनफल 2 और योग 3 हो",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question:
      "यदि (x - 2) बहुपद p(x) का गुणनखंड है, और p(x) = x³ - 3x² - 4x + 12 है, तो अन्य दो गुणनखंड क्या होंगे?",
    questionImage: "",
    options: [
      "(x - 2)(x - 3)(x + 2)",
      "(x - 2)(x + 2)(x + 3)",
      "(x - 2)(x - 1)(x + 6)",
      "(x - 2)(x + 1)(x - 6)",
    ],
    correctAnswer: "(x - 2)(x - 3)(x + 2)",
    hint: {
      text: "p(x) को (x - 2) से विभाजित करें",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question: "x⁴ - 1 को सरल गुणनखंड रूप में विभाजित करें।",
    questionImage: "",
    options: [
      "(x² - 1)(x² + 1)",
      "(x - 1)(x + 1)(x² + 1)",
      "(x² + 1)²",
      "(x² - 1)²",
    ],
    correctAnswer: "(x - 1)(x + 1)(x² + 1)",
    hint: {
      text: "a⁴ - b⁴ = (a² - b²)(a² + b²)",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question: "यदि p(x) = x² + 2x + 1 और q(x) = x + 1, तो p(x) ÷ q(x) = ?",
    questionImage: "",
    options: ["x + 1", "x - 1", "x² - 1", "x + 2"],
    correctAnswer: "x + 1",
    hint: {
      text: "p(x) = (x + 1)² ⇒ एक x + 1 हटेगा",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question:
      "यदि p(x) = ax² + bx + c है, और उसके मूल बराबर हैं, तो b² - 4ac का मान क्या होगा?",
    questionImage: "",
    options: ["0", "> 0", "< 0", "1"],
    correctAnswer: "0",
    hint: {
      text: "मूल बराबर होने पर विवर्तक (discriminant) शून्य होता है",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question:
      "यदि बहुपद p(x) = x³ + x² - x - 1 है, तो x + 1 से भाग देने पर शेषफल क्या होगा?",
    questionImage: "",
    options: ["0", "2", "-2", "1"],
    correctAnswer: "0",
    hint: {
      text: "x = -1 रखें, p(-1) = ?",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question: "किस बहुपद के शून्य 3 और -4 हैं?",
    questionImage: "",
    options: ["x² + x - 12", "x² - x - 12", "x² + x + 12", "x² - x + 12"],
    correctAnswer: "x² + x - 12",
    hint: {
      text: "x = 3 और x = -4 ⇒ (x - 3)(x + 4) = x² + x - 12",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "बहुपद (एक चर वाले)",
    question: "x⁴ - 16 का सही गुणनखंड क्या होगा?",
    questionImage: "",
    options: [
      "(x² - 4)(x² + 4)",
      "(x - 2)(x + 2)(x² + 4)",
      "(x² - 2)(x² + 2)",
      "(x - 4)(x + 4)",
    ],
    correctAnswer: "(x - 2)(x + 2)(x² + 4)",
    hint: {
      text: "x⁴ - 16 = (x² - 4)(x² + 4) = (x - 2)(x + 2)(x² + 4)",
      image: "",
      video: "",
    },
  },
];


async function uploadQuestion(question) {
  try {
    const response = await fetch("http://localhost:5000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question), // ✅ Fix: convert object to JSON string
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed with status ${response.status}: ${errorText}`);
    }

    console.log(`✅ Uploaded: "${question.question}"`);
  } catch (error) {
    console.error(
      `❌ Error: "${question?.question || "undefined"}"`,
      error.message
    );
  }
}

async function uploadAllQuestions() {
  for (const question of questions) {
    await uploadQuestion(question);
  }
  console.log("✅ All questions uploaded!");
}

uploadAllQuestions();
