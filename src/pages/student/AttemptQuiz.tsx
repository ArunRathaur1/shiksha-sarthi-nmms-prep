import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  quizId: string;
  questions: Question[];
}

interface Student {
  _id: string;
  studentId: string;
  name: string;
  quizAttempted: string[];
}

const AttemptQuiz: React.FC = () => {
  const { id } = useParams(); // quizId from URL
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [student, setStudent] = useState<Student | null>(null);

  // Fetch student info from cookie
  useEffect(() => {
    console.log("hello world");
    const studentData = Cookies.get("student");
    if (studentData) {
      try {
        const parsedStudent = JSON.parse(studentData);
        setStudent(parsedStudent.student); // student object inside response
        console.log("Student Data:", parsedStudent.student);
        console.log(student.studentId);
      } catch (error) {
        console.error("Invalid student cookie data");
      }
    }
  }, []);

  // Fetch quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/quizzes/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async () => {
    console.log("Selected Answers:", answers);

    const correctAnswers: { [key: string]: string } = {};
    quiz?.questions.forEach((q) => {
      correctAnswers[q._id] = q.correctAnswer;
    });

    console.log("Correct Answers:", correctAnswers);
    console.log("Student ID:", student?.studentId);
    console.log("Student Name:", student?.name);

    if (!student) {
      alert("Student data not loaded.");
      return;
    }
    if (!quiz) {
      alert("Quiz data not loaded.");
      return;
    }

    try {
      // Prepare payload in correct format
      const payload = {
        quizId: quiz.quizId,
        answers: Object.entries(answers).map(
          ([questionId, selectedAnswer]) => ({
            questionId,
            selectedAnswer,
          })
        ),
      };
      console.log(student.studentId);
      // Send PATCH request to backend
      const response = await axios.patch(
        `http://localhost:5000/students/${student.studentId}/attempt-quiz`,
        payload
      );
      Cookies.set("quizResult", JSON.stringify(response.data), { expires: 7 });
      console.log("Response from server:", response.data);
      alert("Quiz submitted successfully!");
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      alert("Error submitting quiz. Please try again.");
    }
  };
  

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Attempting Quiz: {quiz.quizId}
      </h2>
      {student && (
        <div className="mb-6 text-gray-700">
          <p>
            <strong>Student ID:</strong> {student.studentId}
          </p>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {quiz.questions.map((question, index) => (
          <div
            key={question._id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="font-semibold mb-2">
              Q{index + 1}. {question.question}
            </h3>
            <div className="space-y-2">
              {question.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleOptionChange(question._id, option)}
                    className="mr-2"
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Quiz
          </button>
      </form>
    </div>
  );
};

export default AttemptQuiz;
