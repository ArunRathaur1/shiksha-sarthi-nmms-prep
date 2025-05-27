import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "@/components/Header";

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
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const studentData = Cookies.get("student");
    if (studentData) {
      try {
        const parsedStudent = JSON.parse(studentData);
        setStudent(parsedStudent.student);
      } catch (error) {
        console.error("Invalid student cookie data");
      }
    }
  }, []);

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
    if (!student || !quiz) {
      alert("Student or quiz data not loaded.");
      return;
    }

    const payload = {
      quizId: quiz.quizId,
      answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })),
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/students/${student.studentId}/attempt-quiz`,
        payload
      );
      Cookies.set("quizResult", JSON.stringify(response.data), { expires: 7 });
      alert("Quiz submitted successfully!");
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      alert("Error submitting quiz. Please try again.");
    }
  };

  if (!quiz)
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading quiz...
      </div>
    );

  return (
    <>
      <Header></Header>
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700">
            Quiz Attempt
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Quiz ID: {quiz.quizId}</p>
        </div>

        {student && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow text-gray-700">
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
          className="space-y-8"
        >
          {quiz.questions.map((question, index) => (
            <div
              key={question._id}
              className="p-6 border border-gray-200 rounded-xl bg-white shadow hover:shadow-md transition duration-200"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                Q{index + 1}. {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleOptionChange(question._id, option)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link to='/student'>
              <button
                type="submit"
                className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-transform transform hover:scale-105"
              >
                Submit Quiz
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AttemptQuiz;
