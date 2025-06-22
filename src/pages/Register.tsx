import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { BookOpen } from 'lucide-react';
import axios from 'axios';

const Register: React.FC = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [instituteId, setInstituteId] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !name || !phone || !password || !instituteId || (role === 'student' && !classLevel)) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    const payload = role === 'student'
      ? {
          studentId: id,
          name,
          phone,
          password,
          schoolId: instituteId,
          class: classLevel,
        }
      : {
          teacherId: id,
          name,
          phone,
          password,
          schoolId: instituteId,
        };

    const url = role === 'student'
      ? 'http://localhost:5000/students'
      : 'http://localhost:5000/teachers';

    try {
      setIsLoading(true);
      await axios.post(url, payload);

      toast({
        title: 'Registration Successful',
        description: `${role === 'student' ? 'Student' : 'Teacher'} ${id} created successfully.`,
      });

      // Clear form
      setName('');
      setId('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setInstituteId('');
      setClassLevel('');
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error?.response?.data?.error || 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
            <BookOpen className="h-10 w-10 text-edu-blue" />
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Register to start preparing for NMMS exam
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
                  <Label>Student ID</Label>
                  <Input
                    placeholder="e.g., STD1001"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institute ID</Label>
                  <Input
                    placeholder="e.g., INST001"
                    value={instituteId}
                    onChange={(e) => setInstituteId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={classLevel} onValueChange={setClassLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Class 6</SelectItem>
                      <SelectItem value="7">Class 7</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="NMMS">NMMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="teacher">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Teacher ID</Label>
                  <Input
                    placeholder="e.g., TCH1001"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institute ID</Label>
                  <Input
                    placeholder="e.g., INST001"
                    value={instituteId}
                    onChange={(e) => setInstituteId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-edu-blue hover:underline">
                Login here
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
