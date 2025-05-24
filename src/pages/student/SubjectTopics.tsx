import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SubjectTopics: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchTopics = async () => {
    setLoading(true);
    setError(null);

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

      if (!className) {
        setError("Class information not found in cookie.");
        setTopics([]);
        return;
      }

      if (!subject) {
        setError("Subject is not specified.");
        setTopics([]);
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/questions/topics/${className}/${subject}`
        
      );
      

      if (res.data && Array.isArray(res.data.topics)) {
  setTopics(res.data.topics);
} else {
  setError("Invalid topics data received from server.");
  setTopics([]);
}

    } catch (err) {
      console.error(err);
      setError("Failed to load topics. Please try again later.");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTopics();
}, [subject]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container">
          <h1 className="text-2xl font-bold mb-6">{subject} के टॉपिक</h1>

          {loading && <p>Loading...</p>}

          {error && (
            <p className="text-red-600 font-medium mb-4">{error}</p>
          )}

          {!loading && !error && topics.length === 0 && (
            <p>कोई टॉपिक नहीं मिला।</p>
          )}

          {!loading && !error && topics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <Card key={topic}>
                  <CardHeader>
                    <CardTitle>{topic}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Link to={`/student/practice/${subject}/${topic}`}>
                      <Button>Start Quiz</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectTopics;
