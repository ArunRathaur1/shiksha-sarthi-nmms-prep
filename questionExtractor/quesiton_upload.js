const questions = [
  {
    subject: "विज्ञान",
    class: "7",
    topic: "प्रकाश संश्लेषण",
    question: "प्रकाश संश्लेषण की प्रक्रिया में कौन-सा गैस अवशोषित होती है?",
    questionImage: "",
    options: ["ऑक्सीजन", "हाइड्रोजन", "कार्बन डाइऑक्साइड", "नाइट्रोजन"],
    correctAnswer: "कार्बन डाइऑक्साइड",
    hint: {
      text: "Photosynthesis requires sunlight, water, and a gas taken from the air.",
      image: "imagelink6",
      video: "videolink6",
    },
  },
  {
    subject: "विज्ञान",
    class: "7",
    topic: "प्रकाश संश्लेषण",
    question: "प्रकाश संश्लेषण के दौरान पौधे किसे छोड़ते हैं?",
    questionImage: "",
    options: ["कार्बन डाइऑक्साइड", "नाइट्रोजन", "ऑक्सीजन", "हाइड्रोजन"],
    correctAnswer: "ऑक्सीजन",
    hint: {
      text: "Plants release this gas during the day while making food.",
      image: "imagelink7",
      video: "videolink7",
    },
  },
  {
    subject: "विज्ञान",
    class: "7",
    topic: "प्रकाश संश्लेषण",
    question: "प्रकाश संश्लेषण के लिए सबसे आवश्यक तत्व कौन-सा है?",
    questionImage: "",
    options: ["सूर्य का प्रकाश", "मिट्टी", "कीटनाशक", "उर्वरक"],
    correctAnswer: "सूर्य का प्रकाश",
    hint: {
      text: "This natural source provides energy for making food.",
      image: "imagelink8",
      video: "videolink8",
    },
  },
  {
    subject: "विज्ञान",
    class: "7",
    topic: "प्रकाश संश्लेषण",
    question: "पत्तियों में कौन-सा पदार्थ प्रकाश संश्लेषण में मदद करता है?",
    questionImage: "",
    options: ["क्लोरोफिल", "लाल वर्णक", "कार्बन", "प्रोटीन"],
    correctAnswer: "क्लोरोफिल",
    hint: {
      text: "This green pigment helps absorb sunlight.",
      image: "imagelink9",
      video: "videolink9",
    },
  },
  {
    subject: "विज्ञान",
    class: "7",
    topic: "प्रकाश संश्लेषण",
    question: "प्रकाश संश्लेषण के दौरान क्या बनता है?",
    questionImage: "",
    options: ["शर्करा", "खनिज", "वसा", "प्रोटीन"],
    correctAnswer: "शर्करा",
    hint: {
      text: "Plants prepare their food in the form of this substance.",
      image: "imagelink10",
      video: "videolink10",
    },
  },
];

// POST करने वाला फ़ंक्शन
const postQuestions = async () => {
  for (const question of questions) {
    try {
      const response = await fetch("http://localhost:5000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        console.log("प्रश्न सफलतापूर्वक भेजा गया:", question.question);
      } else {
        console.error("भेजने में त्रुटि:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch त्रुटि:", error.message);
    }
  }
};

// फ़ंक्शन कॉल करें
postQuestions();
