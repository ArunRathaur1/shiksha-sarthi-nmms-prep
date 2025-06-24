import fetch from "node-fetch"; // Required if you're using Node <18

const questions = [
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि गणितीय चिन्ह ‘+’ का अर्थ ‘÷’, ‘−’ का अर्थ ‘×’, ‘×’ का अर्थ ‘−’ तथा ‘÷’ का अर्थ ‘+’ है, तब\n11 × 7 + 21 × 2 − 2 ÷ 3 − 4\nका मान है",
    questionImage: "",
    options: ["68/3", "4/3", "-4/3", "-8/3"],
    correctAnswer: "68/3",
    hint: {
      text: "चिन्हों को बदलो! '+' को '÷', '−' को '×', '×' को '−' और '÷' को '+' से बदलें। फिर BODMAS नियम का पालन करें।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि + का अर्थ ‘×’, − का अर्थ ‘÷’, × का अर्थ ‘−’ तथा ÷ का अर्थ ‘+’ है, तो निम्न समीकरण का मान होगा\n6 + 64 − 8 + 45 × 8",
    questionImage: "",
    options: ["85", "76", "87", "75"],
    correctAnswer: "85",
    hint: {
      text: "सबसे पहले चिह्नों को बदलिए (+ को ×, - को ÷, × को - और ÷ को +). फिर BODMAS नियम का पालन करें (कोष्ठक, भाग, गुणा, जोड़, घटाना) और सावधानी से हल करें!",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि F का अर्थ ‘+’, P का अर्थ ‘×’, T का अर्थ ‘÷’ और K का अर्थ ‘–’ है, तो\n40 T 8 F 16 P 4 K 13 = ?",
    questionImage: "",
    options: ["75", "56", "69", "78"],
    correctAnswer: "56",
    hint: {
      text: "संकेतों को बदलकर BODMAS नियम का पालन करें! सबसे पहले भाग (T) और गुणा (P) करें, फिर जोड़ (F) और घटाव (K)।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि A का अर्थ +, D का अर्थ ÷, P का अर्थ × और S का अर्थ – हो, तो\n68 A 48 D 2 S 8 P 10 = ?",
    questionImage: "",
    options: ["46", "64", "12", "500"],
    correctAnswer: "12",
    hint: {
      text: "चिह्नों को बदलकर BODMAS नियम का पालन करें। पहले भाग, फिर गुणा, फिर जोड़, और अंत में घटाव करें।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि P, ‘+’ का सूचक है, Q, ‘×’ का सूचक है, R, ‘+’ का सूचक है और S, ‘–’ का सूचक है, तो\n16 Q 12 P 6 R 5 S 4 = ?",
    questionImage: "",
    options: ["31", "32", "33", "30"],
    correctAnswer: "33",
    hint: {
      text: "संकेतों को बदलो और BODMAS नियम का ध्यान रखो! सबसे पहले गुना (Q) और भाग (R) करो, फिर जोड़ (P) और घटाव (S).",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि M का अर्थ +, N का अर्थ – और P का अर्थ × हो, तो\n15 N 10 P 3 M 5 P 4 = ?",
    questionImage: "",
    options: ["15", "5", "10", "60"],
    correctAnswer: "5",
    hint: {
      text: "संकेत: BODMAS नियम का पालन करें! सबसे पहले P (×) को हल करें, फिर N (-) और अंत में M (+). ध्यान से गणना करें!",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि a, ‘÷’ को दर्शाता है, b, ‘+’ को दर्शाता है, c, ‘–’ को दर्शाता है और d, ‘×’ को दर्शाता है, तो\n24 a 6 d 4 b 9 c 8 = ?",
    questionImage: "",
    options: ["20", "19", "6", "17"],
    correctAnswer: "17",
    hint: {
      text: "दिए गए प्रतीकों को बदलें और फिर BODMAS नियम का पालन करें। विभाजन (Division) पहले करें!",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "यदि O का अर्थ ‘Add to’, J का अर्थ ‘multiply by’, T का अर्थ ‘subtract from’ तथा K का अर्थ ‘divided by’ है, तो\n30 K 2 Q 3 J 6 T 5 = ?",
    questionImage: "",
    options: ["31", "15", "14", "28"],
    correctAnswer: "28",
    hint: {
      text: "चिह्नों को बदलें (K को ÷, Q को +, J को ×, T को - से) और BODMAS नियम का प्रयोग करें! सबसे पहले भाग, फिर गुणा, फिर जोड़, और अंत में घटाव करें।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      " नीचे दिए गए समीकरण को सही करने के लिए किन दो चिन्हों को आपस में बदला जाना चाहिए?\n\n18 + 6 − 6 ÷ 3 × 3 = 6",
    questionImage: "",
    options: ["+ और ÷", " + और ×", "− और +", "+ और −"],
    correctAnswer: "+ और ÷",
    hint: {
      text: "समीकरण को ध्यान से देखें। भाग और गुणा की क्रिया को पहले करके देखें। फिर सोचें कि कौन से दो चिन्ह बदलने से उत्तर 6 के करीब आ सकता है। '+' और '÷' बदलने से समीकरण सरल हो सकता है।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए समीकरण को सही करने के लिए कौन‑से दो संकेत बदलने चाहिए?\n\n15 ÷ 3 + 2 × 10 − 6 = 14",
    questionImage: "",
    options: ["+ और ×", "+ और −", "÷ और −", "÷ और +"],
    correctAnswer: "+ और ×",
    hint: {
      text: "ध्यान से देखिए कि भाग (÷) और घटाव (−) के स्थान बदलने से समीकरण का मान बदल कर सही उत्तर के करीब आ सकता है। गणितीय क्रियाओं के क्रम (BODMAS) को याद रखें!",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "निम्न संकेत परिवर्तनों में से कौन‑सा दी गई समीकरण को सही बनाएगा?\n\n5 + 3 × 8 − 12 ÷ 4 = 3",
    questionImage: "",
    options: ["+ तथा −", "− तथा ÷", "+ तथा ×", "+ तथा ÷"],
    correctAnswer: "− तथा ÷",
    hint: {
      text: "क्रम संचालन (BODMAS/PEMDAS) का ध्यान रखें। गुणा और भाग, जोड़ और घटाव से पहले हल होते हैं। समीकरण को 3 बनाने के लिए किन संकेतों को बदलने से गणितीय क्रियाओं का क्रम बदलेगा, यह सोचो।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      " यदि 8 # 2 @ 5 = 21 और 4 # 6 @ 2 = 26 है, तो 3 # 7 @ 9 क्या होगा?",
    questionImage: "",
    options: ["40", "30", "47", "52"],
    correctAnswer: "30",
    hint: {
      text: "ध्यान से देखें कि # और @ क्या कर रहे हैं! शायद गुणा और जोड़ शामिल हैं? संख्याओं के बीच संबंध ढूंढें जो आपको परिणाम तक ले जाए।\n(Think about what # and @ might be doing! Perhaps multiplication and addition are involved? Find the relationship between the numbers that gets you to the results.)",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "कुछ समीकरण किसी विशिष्ट प्रणाली के आधार पर हल किए गए हैं। उसी आधार पर हल न किए गए समीकरण का सही उत्तर ज्ञात कीजिए।\n\nयदि 29 × 13 = 14, 76 × 26 = 34, तो 64 × 14 = ?",
    questionImage: "",
    options: ["39", "32", "26", "54"],
    correctAnswer: "26",
    hint: {
      text: "दी गई संख्याओं को ध्यान से देखें। उत्तर प्राप्त करने के लिए संख्याओं के अंकों को जोड़ कर देखें! क्या कोई pattern दिखता है?",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "किसी कोड में, यदि\n\n41 − 32 = 55, 42 − 34 = 76, 53 − 13 = 48,\n\nतो 33 − 22 = ?",
    questionImage: "",
    options: ["11", "44", "46", "64"],
    correctAnswer: "46",
    hint: {
      text: "ध्यान से देखो, संख्याओं को घटाने के बजाय, जोड़ा जा रहा है! पहले अंक को पहले अंक से और दूसरे अंक को दूसरे अंक से जोड़ो।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "निर्देश (प्र. सं. 24–30):\nदिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\nयदि 6 × 7 = 2, 3 × 5 = 5 और 5 × 8 = 0, तो 6 × 8 = ?\n",
    questionImage: "",
    options: ["8", "6", "68", "0"],
    correctAnswer: "8",
    hint: {
      text: "ध्यान से देखो कि उत्तर कैसे आ रहा है। क्या संख्याओं को घटाने या भाग करने से कुछ मिल रहा है? सोचो, छोटी संख्या कैसे बन सकती है।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\nयदि 3 × 9 × 7 = 379, 5 × 4 × 8 = 584 हो, तो 1 × 2 × 3 = ?",
    questionImage: "",
    options: ["123", "231", "213", "132"],
    correctAnswer: "132",
    hint: {
      text: "संकेत: संख्याओं को ध्यान से देखें। क्या पहली संख्या हमेशा पहले, दूसरी संख्या हमेशा आखिर में और तीसरी संख्या हमेशा बीच में आती है? इसे 1 x 2 x 3 पर लागू करें।",
      image: "",
      video: "https://youtu.be/hsATJtN2ypE?si=GdTKc8YHMu6BZ_f1",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\n यदि 678 = 366, 567 = 255 हो, तो 946 = ?",
    questionImage: "",
    options: ["334", "499", "699", "634"],
    correctAnswer: "634",
    hint: {
      text: "Hint: पहले दो अंकों का वर्ग निकालें, और अंतिम अंक वही रहेगा। (पहले दो अंकों के वर्ग पर ध्यान दीजिये, अंतिम अंक में कोई बदलाव नहीं है)",
      image: "",
      video: "",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\n यदि\n\n7 − 4 − 1 = 714,   9 − 2 − 3 = 932 हो,\n\nतो 8 − 0 − 4 = ?",
    questionImage: "",
    options: ["804", "840", "408", "480"],
    correctAnswer: "840",
    hint: {
      text: "पहले अंक को पहले रखें, फिर अंतिम अंक को बीच में, और बीच वाले अंक को आखिर में। क्या अब उत्तर स्पष्ट है? (पहले अंक को शुरू में रखें, बाकी क्रम बदलिए!)",
      image: "",
      video: "",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\nयदि 526 = 9 और 834 = 9 हो, तो 716 = ?",
    questionImage: "",
    options: ["20", "15", "9", "12"],
    correctAnswer: "12",
    hint: {
      text: "हर समीकरण में, संख्याओं को जोड़ें और फिर उसे घटाएं। उदाहरण के लिए, पहले समीकरण में, 5 + 6 - 2 का प्रयास करें।",
      image: "",
      video: "",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\nयदि 85 + 25 = 50, 97 + 65 = 93 हो, तो 72 + 94 = ?",
    questionImage: "",
    options: ["92", "50", "67", "60"],
    correctAnswer: "50",
    hint: {
      text: "ध्यान से देखिए कि अंकों को जोड़ने के बजाय, शायद घटाया जा रहा है या किसी और तरह से व्यवस्थित किया जा रहा है। परिणामों और समीकरणों के अंकों के बीच संबंध खोजने का प्रयास करें।",
      image: "",
      video: "",
    },
  },
  {
    subject: "मानसिक क्षमता परीक्षण",
    class: "NMMS",
    topic: "गणितीय संक्रियाएँ",
    question:
      "दिए गए प्रश्नों में कुछ समीकरण एक विशेष प्रणाली के आधार पर हल किए गए हैं। इसी आधार पर हल न किए गए समीकरण का उत्तर ज्ञात कीजिए।\n\n 5 + 7 + 2 = 725, 6 + 9 + 0 = 906, 8 + 4 + 3 = ?",
    questionImage: "",
    options: ["818", "384", "438", "834"],
    correctAnswer: "438",
    hint: {
      text: "ध्यान से देखो कि संख्याओं को कैसे rearranged किया गया है। अंतिम अंक को पहले, फिर अंतिम दो अंकों को क्रम में लिखो।",
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
