
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { QuizProvider } from "@/contexts/QuizContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentPractice from "./pages/student/Practice";
import PracticeQuiz from "./pages/student/PracticeQuiz";
import QuizById from "./pages/student/QuizById";
import GroupQuiz from "./pages/student/GroupQuiz";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import CreateQuiz from "./pages/teacher/CreateQuiz";
import Analytics from "./pages/teacher/Analytics";

const queryClient = new QueryClient();

// Route guard for protected routes
const ProtectedRoute = ({ 
  element, 
  requiredRole, 
}: { 
  element: React.ReactNode, 
  requiredRole: 'student' | 'teacher' | null
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }
  
  return element;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      
      {/* Student Routes */}
      <Route 
        path="/student" 
        element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />} 
      />
      <Route 
        path="/student/practice" 
        element={<ProtectedRoute element={<StudentPractice />} requiredRole="student" />} 
      />
      <Route 
        path="/student/practice/:subject" 
        element={<ProtectedRoute element={<PracticeQuiz />} requiredRole="student" />} 
      />
      <Route 
        path="/student/quiz" 
        element={<ProtectedRoute element={<QuizById />} requiredRole="student" />} 
      />
      <Route 
        path="/student/group-quiz" 
        element={<ProtectedRoute element={<GroupQuiz />} requiredRole="student" />} 
      />
      
      {/* Teacher Routes */}
      <Route 
        path="/teacher" 
        element={<ProtectedRoute element={<TeacherDashboard />} requiredRole="teacher" />} 
      />
      <Route 
        path="/teacher/create-quiz" 
        element={<ProtectedRoute element={<CreateQuiz />} requiredRole="teacher" />} 
      />
      <Route 
        path="/teacher/analytics" 
        element={<ProtectedRoute element={<Analytics />} requiredRole="teacher" />} 
      />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <QuizProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QuizProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
