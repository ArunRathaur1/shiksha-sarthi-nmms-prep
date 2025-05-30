import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function QuizAnalyticsPage() {
  const { quizId } = useParams();
  const [studentReports, setStudentReports] = useState([]);
  const [questionStats, setQuestionStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, quizRes] = await Promise.all([
          axios.get(`http://localhost:5000/reports/student-quiz/${quizId}`),
          axios.get(`http://localhost:5000/reports/quiz/${quizId}`)
        ]);

        setStudentReports(studentRes.data);
        setQuestionStats(quizRes.data.questionStats);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, [quizId]);

  const chartData = {
    labels: questionStats.map((q, idx) => `Q${idx + 1}`),
    datasets: [
      {
        label: "Correct",
        data: questionStats.map((q) => q.correctCount),
        backgroundColor: "#4ade80"
      },
      {
        label: "Incorrect",
        data: questionStats.map((q) => q.incorrectCount),
        backgroundColor: "#f87171"
      },
      {
        label: "Unattempted",
        data: questionStats.map((q) => q.unattemptedCount),
        backgroundColor: "#facc15"
      }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quiz Analytics</h1>

      <Card>
        <CardHeader>Student Performance</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Correct</TableCell>
                <TableCell>Incorrect</TableCell>
                <TableCell>Unattempted</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.studentId}</TableCell> {/* Replace with name if populated */}
                  <TableCell>{report.correct}</TableCell>
                  <TableCell>{report.incorrect}</TableCell>
                  <TableCell>{report.unattempted}</TableCell>
                  <TableCell>
                    {report.correct + report.incorrect + report.unattempted}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Question-wise Submission Stats</CardHeader>
        <CardContent>
          <div className="w-full max-w-4xl">
            <Bar data={chartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
