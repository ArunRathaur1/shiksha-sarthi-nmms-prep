// File: PracticeQuiz.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PracticeQuiz: React.FC = () => {
  const { subject, topic } = useParams<{ subject: string; topic: string }>();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const studentCookie = Cookies.get("student");
              console.log("Raw student cookie:", studentCookie);  // <-- Debug raw cookie string
        
              let className: string | null = null;
        
              if (studentCookie) {
                const parsed = JSON.parse(studentCookie);
                console.log("Parsed student cookie object:", parsed);  // <-- Debug parsed object
        
                // Try these paths in order:
                className = parsed?.student?.class || parsed?.class || null;
                console.log("Extracted className:", className);  // <-- Debug extracted class
              } else {
                console.log("No student cookie found.");
              }
        console.log("Finding questions for:", className, subject, topic);

        const res = await axios.get(`http://localhost:5000/questions/${className}/${subject}/${topic}`);
        setQuestions(res.data);
        console.log("API response data:", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subject, topic]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container">
          <h1 className="text-xl font-bold mb-4">Quiz: {subject} - {topic}</h1>
          {loading ? (
            <p>Loading questions...</p>
          ) : questions.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            <div className="space-y-6">
              {questions.map((q: any, index: number) => (
                <div key={q._id} className="bg-white p-4 rounded shadow">
                  <p className="font-medium">
                    {index + 1}. {q.question}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {q.options.map((option: string, i: number) => (
                      <li key={i} className="ml-4 list-disc">{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticeQuiz;
