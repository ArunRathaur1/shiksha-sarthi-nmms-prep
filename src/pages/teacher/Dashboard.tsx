
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useQuiz } from '@/contexts/QuizContext';
import { 
  BookOpen, 
  ListChecks, 
  BarChart, 
  PlusCircle,
  Users,
  Layers
} from 'lucide-react';
import SubjectIcon from '@/components/SubjectIcon';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getTeacherQuizzes, quizAttempts } = useQuiz();
  
  // Get quizzes created by the current teacher
  const teacherQuizzes = user ? getTeacherQuizzes(user.id) : [];
  
  // Mock data for the dashboard
  const statsData = [
    { 
      title: "Total Students",
      value: "42",
      icon: <Users className="h-8 w-8 text-edu-blue" />,
      description: "From your institute",
    },
    { 
      title: "Total Quizzes", 
      value: teacherQuizzes.length.toString(),
      icon: <ListChecks className="h-8 w-8 text-edu-green" />,
      description: "Created by you",
    },
    { 
      title: "Quiz Attempts", 
      value: "15",
      icon: <BookOpen className="h-8 w-8 text-edu-yellow" />,
      description: "By your students",
    },
    { 
      title: "Avg. Score", 
      value: "76%",
      icon: <BarChart className="h-8 w-8 text-edu-purple" />,
      description: "Overall performance",
    },
  ];
  
  // Mock data for subject stats
  const subjectStats = [
    { subject: 'mathematics', name: 'Mathematics', attempted: 25, avgScore: 72 },
    { subject: 'science', name: 'Science', attempted: 18, avgScore: 65 },
    { subject: 'social', name: 'Social Science', attempted: 12, avgScore: 80 },
    { subject: 'mat', name: 'Mental Ability', attempted: 8, avgScore: 60 },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Teacher Dashboard | Institute ID: {user?.instituteId}
            </p>
          </div>
          
          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsData.map((stat, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{stat.title}</CardTitle>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-edu-blue/20 hover:border-edu-blue/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">Create New Quiz</CardTitle>
                    <CardDescription>Design a custom quiz for your students</CardDescription>
                  </div>
                  <PlusCircle className="h-8 w-8 text-edu-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Create a subject-specific quiz with custom questions. After creating, share the quiz ID with your students.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/teacher/create-quiz" className="w-full">
                  <Button className="w-full">Create Quiz</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-edu-purple/20 hover:border-edu-purple/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">Quiz Analytics</CardTitle>
                    <CardDescription>View performance reports and statistics</CardDescription>
                  </div>
                  <BarChart className="h-8 w-8 text-edu-purple" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  See detailed analytics on student performance, question difficulty, and more for each quiz you've created.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/teacher/analytics" className="w-full">
                  <Button variant="outline" className="w-full border-edu-purple text-edu-purple hover:bg-edu-purple/10">
                    View Analytics
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          {/* Subject Stats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Subject Performance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjectStats.map((subject, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <SubjectIcon subject={subject.subject} />
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quiz Attempts:</span>
                      <span className="font-medium">{subject.attempted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Score:</span>
                      <span className="font-medium">{subject.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="h-2.5 rounded-full bg-edu-blue"
                        style={{ width: `${subject.avgScore}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recent Quizzes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Quizzes</h2>
              <Link to="/teacher/create-quiz">
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Quiz
                </Button>
              </Link>
            </div>
            
            {teacherQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teacherQuizzes.map((quiz, idx) => (
                  <Card key={idx}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SubjectIcon subject={quiz.subject} size={20} />
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded">
                          ID: {quiz.id}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Layers className="h-4 w-4 text-muted-foreground" />
                          <span>{quiz.questions.length} questions</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">0 attempts</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="w-full flex justify-between">
                        <Button variant="outline" size="sm">
                          <BarChart className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                        <Button size="sm">
                          <Link to={`/teacher/view-quiz/${quiz.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No quizzes yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Create your first quiz to get started
                    </p>
                    <Link to="/teacher/create-quiz">
                      <Button>Create Your First Quiz</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
