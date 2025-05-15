
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectIcon from '@/components/SubjectIcon';
import { ArrowLeft } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';

const StudentPractice: React.FC = () => {
  const { practiceQuestions } = useQuiz();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  const subjectData = [
    { id: 'mathematics', name: 'Mathematics', description: 'Practice mathematics questions covering arithmetic, algebra, geometry, and more.' },
    { id: 'science', name: 'Science', description: 'Practice science questions covering physics, chemistry, biology and more.' },
    { id: 'social', name: 'Social Science', description: 'Practice social science questions covering history, geography, civics and more.' },
    { id: 'mat', name: 'Mental Ability Test', description: 'Practice MAT questions to improve your analytical and logical reasoning skills.' },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container">
          <div className="flex items-center mb-8">
            <Link to="/student" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Practice Questions</h1>
          </div>
          
          <Tabs defaultValue="subjects" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="history">Practice History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjectData.map((subject) => (
                  <Card key={subject.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <SubjectIcon subject={subject.id} size={30} />
                        <CardTitle>{subject.name}</CardTitle>
                      </div>
                      <CardDescription>{subject.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        <span className="font-medium">
                          {practiceQuestions[subject.id]?.length || 0} questions available
                        </span>
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/student/practice/${subject.id}`} className="w-full">
                        <Button className="w-full">Start Practice</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Practice History</CardTitle>
                  <CardDescription>
                    View your previous practice sessions and performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No practice history available yet.</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start practicing to build your history!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentPractice;
