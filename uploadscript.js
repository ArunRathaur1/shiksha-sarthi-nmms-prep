import fetch from "node-fetch"; 

const questions = [
  {
    subject: "गणित",
    class: "NMMS",
    topic: "प्रत्यक्ष और परोक्ष अनुपात",
    question:
      "एक स्कूल में 20 बच्चों को भोजन बनाने में 4 किलोग्राम चावल लगता है। यदि बच्चों की संख्या 50 हो जाए, तो कितना चावल लगेगा?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1751281636/Screenshot_2025-06-30_163708_hebjcd.png",
    options: ["6 किलोग्राम", "8 किलोग्राम", "10 किलोग्राम", "12 किलोग्राम"],
    correctAnswer: "10 किलोग्राम",
    hint: {
      text: "बच्चों की संख्या बढ़ेगी, तो चावल की मात्रा भी बढ़ेगी — प्रत्यक्ष अनुपात।",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "प्रत्यक्ष और परोक्ष अनुपात",
    question:
      "5 बच्चे एक काम को 15 दिनों में पूरा करते हैं। यदि 10 बच्चे वही काम करें, तो कितने दिन लगेंगे?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1751281756/Screenshot_2025-06-30_163903_pqyzql.png",
    options: ["10", "8", "7", "7.5"],
    correctAnswer: "7.5",
    hint: {
      text: "बच्चे ज़्यादा = समय कम — परोक्ष अनुपात।",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "प्रत्यक्ष और परोक्ष अनुपात",
    question:
      "एक दुकानदार 3 घंटे में 90 समोसे बनाता है। उसी दर से 5 घंटे में वह कितने समोसे बनाएगा?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1751281848/Screenshot_2025-06-30_164036_tmu0jb.png",
    options: ["100", "120", "150", "180"],
    correctAnswer: "150",
    hint: {
      text: "समय ज़्यादा = समोसे ज़्यादा — प्रत्यक्ष अनुपात।",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "प्रत्यक्ष और परोक्ष अनुपात",
    question:
      "एक साइकिल 2 घंटे में 30 किमी जाती है। यदि वह 4 घंटे चले, तो कितनी दूरी तय करेगी?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1751281946/Screenshot_2025-06-30_164218_yltio8.png",
    options: ["40 किमी", "45 किमी", "50 किमी", "60 किमी"],
    correctAnswer: "60 किमी",
    hint: {
      text: "समय बढ़ेगा, तो दूरी भी बढ़ेगी — प्रत्यक्ष अनुपात।",
      image: "",
      video: "",
    },
  },
  {
    subject: "गणित",
    class: "NMMS",
    topic: "प्रत्यक्ष और परोक्ष अनुपात",
    question:
      "एक मशीन 10 मिनट में 100 बोतलें बनाती है। यदि वैसी ही 2 मशीनें साथ चलें, तो वही काम कितने मिनट में पूरा होगा?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1751282124/Screenshot_2025-06-30_164515_fkryig.png",
    options: ["20 मिनट", "15 मिनट", "10 मिनट", "5 मिनट"],
    correctAnswer: "5 मिनट",
    hint: {
      text: "मशीनें ज़्यादा = समय कम — परोक्ष अनुपात।",
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
