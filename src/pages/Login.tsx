import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !password) {
      toast({
        title: "Error",
        description: "Please enter ID and password",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const url =
        role === "student"
          ? "http://localhost:5000/students/login"
          : "http://localhost:5000/teachers/login";

      const payload =
        role === "student"
          ? { studentId: id, password }
          : { teacherId: id, password };

      const response = await axios.post(url, payload);

      if (role === "teacher") {
        Cookies.set("teacher", JSON.stringify(response.data), {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      } else {
        localStorage.setItem("student", JSON.stringify(response.data));
      }

      toast({
        title: "Success",
        description: `${role === "student" ? "Student" : "Teacher"} login successful`,
      });

      navigate(role === "student" ? "/student" : "/teacher");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.error || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8 py-10">
      <Card className="w-full max-w-md sm:max-w-sm md:max-w-md mx-auto shadow-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
            <BookOpen className="h-8 w-8 text-edu-blue sm:h-10 sm:w-10" />
          </div>
          <CardTitle className="text-xl sm:text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-sm sm:text-base text-center">
            Login to access NMMS preparation resources
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "student" | "teacher")}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-edu-blue"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="id">{role === "student" ? "Student ID" : "Teacher ID"}</Label>
              <Input
                id="id"
                type="text"
                placeholder={`Enter your ${role === "student" ? "Student" : "Teacher"} ID`}
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-xs text-gray-500 space-y-0.5">
              <p>Demo credentials:</p>
              <p>ID: 1001</p>
              <p>Password: 1234</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full text-sm sm:text-base" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="mt-2 text-center text-xs sm:text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-edu-blue hover:underline">
                Register here
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
