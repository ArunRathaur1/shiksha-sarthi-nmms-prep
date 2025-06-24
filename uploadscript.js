import fetch from "node-fetch"; 

const questions = [
  {
    subject: "सामाजिक विज्ञान",
    class: "NMMS",
    topic: "देश पर शासन करना (Ruling the Countryside)",
    question: "ज़मींदारी प्रणाली का मुख्य उद्देश्य क्या था?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1750418808/Screenshot_2025-06-20_165623_zshx97.png",
    options: [
      "किसानों को अधिकार देना",
      "भूमि का सर्वेक्षण करना",
      "राजस्व संग्रह में स्थिरता लाना",
      "कारखानों की स्थापना करना",
    ],
    correctAnswer: "राजस्व संग्रह में स्थिरता लाना",
    hint: {
      text: "यह प्रणाली राजस्व निश्चित करने के लिए बनाई गई थी।",
      image: "",
      video: "",
    },
  },
  {
    subject: "सामाजिक विज्ञान",
    class: "NMMS",
    topic: "देश पर शासन करना (Ruling the Countryside)",
    question:
      "किस कृषि प्रणाली में गाँव के कुल राजस्व का निर्धारण किया जाता था?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1750418828/Screenshot_2025-06-20_165635_nx601a.png",
    options: [
      "रैयतवारी प्रणाली",
      "महलवारी प्रणाली",
      "स्थायी बंदोबस्त",
      "संस्थान व्यवस्था",
    ],
    correctAnswer: "महलवारी प्रणाली",
    hint: {
      text: "इसमें गाँव को एक इकाई मानकर कर निर्धारित किया जाता था।",
      image: "",
      video: "",
    },
  },
  {
    subject: "सामाजिक विज्ञान",
    class: "NMMS",
    topic: "देश पर शासन करना (Ruling the Countryside)",
    question: "नील आयोग की स्थापना क्यों की गई थी?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1750418887/Screenshot_2025-06-20_165757_rglu2c.png",
    options: [
      "नए कर लागू करने के लिए",
      "किसानों की शिकायतों की जांच करने के लिए",
      "जमींदारों की सहायता करने के लिए",
      "ब्रिटिश अफसरों को पुरस्कृत करने के लिए",
    ],
    correctAnswer: "किसानों की शिकायतों की जांच करने के लिए",
    hint: {
      text: "यह आयोग किसानों द्वारा नील की जबरन खेती के विरोध के बाद बना था।",
      image: "",
      video: "",
    },
  },
  {
    subject: "सामाजिक विज्ञान",
    class: "NMMS",
    topic: "देश पर शासन करना (Ruling the Countryside)",
    question: "स्थायी बंदोबस्त किस क्षेत्र में लागू किया गया था?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1750418938/Screenshot_2025-06-20_165824_tddwed.png",
    options: [
      "बंगाल, बिहार, उड़ीसा",
      "पंजाब, हरियाणा",
      "महाराष्ट्र, गुजरात",
      "तमिलनाडु, आंध्र प्रदेश",
    ],
    correctAnswer: "बंगाल, बिहार, उड़ीसा",
    hint: {
      text: "यह प्रणाली पूर्वी भारत के क्षेत्रों में आरंभ की गई थी।",
      image: "",
      video: "",
    },
  },
  {
    subject: "सामाजिक विज्ञान",
    class: "NMMS",
    topic: "देश पर शासन करना (Ruling the Countryside)",
    question:
      "ब्रिटिश सरकार द्वारा की गई नील की खेती ने किसे सबसे अधिक प्रभावित किया?",
    questionImage:
      "https://res.cloudinary.com/dmebh0vcd/image/upload/v1750418964/Screenshot_2025-06-20_165903_lsjjjj.png",
    options: [
      "जमींदारों को",
      "ब्रिटिश व्यापारियों को",
      "भारतीय किसानों को",
      "नगरपालिका को",
    ],
    correctAnswer: "भारतीय किसानों को",
    hint: {
      text: "किसानों को जबरन नील उगाने पर मजबूर किया गया जिससे उनकी स्थिति खराब हो गई।",
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
