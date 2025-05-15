
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login(email, password, role);
      
      // Redirect based on role
      if (role === 'student') {
        navigate('/student');
      } else {
        navigate('/teacher');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
            <BookOpen className="h-10 w-10 text-edu-blue" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Login to your account to access NMMS preparation resources
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setRole(value as 'student' | 'teacher')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input 
                    id="student-email" 
                    type="email"
                    placeholder="your.email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <a href="#" className="text-xs text-edu-blue hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="student-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Demo account:</p>
                  <p className="text-xs text-gray-500">Email: student1@example.com</p>
                  <p className="text-xs text-gray-500">Password: password</p>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="teacher">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input 
                    id="teacher-email" 
                    type="email" 
                    placeholder="teacher.email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="teacher-password">Password</Label>
                    <a href="#" className="text-xs text-edu-blue hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="teacher-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Demo account:</p>
                  <p className="text-xs text-gray-500">Email: teacher1@example.com</p>
                  <p className="text-xs text-gray-500">Password: password</p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex flex-col">
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            <p className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?{' '}
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
