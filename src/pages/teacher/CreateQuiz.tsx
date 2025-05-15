
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQuiz, Question } from '@/contexts/QuizContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, PlusCircle, Trash2, CheckCircle2, Save } from 'lucide-react';
import SubjectIcon from '@/components/SubjectIcon';

interface QuestionForm {
  text: string;
  options: string[];
  correctAnswer: number;
}

const CreateQuiz: React.FC = () => {
  const { createQuiz } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState<QuestionForm[]>([
    {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    },
  ]);
  
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };
  
  const handleRemoveQuestion = (index: number) => {
    if (questions.length === 1) {
      toast({
        title: "Error",
        description: "Quiz must have at least one question",
        variant: "destructive",
      });
      return;
    }
    
    setQuestions(questions.filter((_, i) => i !== index));
  };
  
  const handleQuestionChange = (index: number, field: keyof QuestionForm, value: string | number) => {
    const newQuestions = [...questions];
    
    if (field === 'options') {
      // Handle options separately as we need to access a specific option
      return;
    }
    
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    
    setQuestions(newQuestions);
  };
  
  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };
  
  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = parseInt(value);
    setQuestions(newQuestions);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a quiz title",
        variant: "destructive",
      });
      return;
    }
    
    if (!subject) {
      toast({
        title: "Error",
        description: "Please select a subject",
        variant: "destructive",
      });
      return;
    }
    
    // Validate each question
    const invalidQuestions = questions.filter(
      (q) => !q.text || q.options.some(option => !option)
    );
    
    if (invalidQuestions.length > 0) {
      toast({
        title: "Error",
        description: `Please fill in all fields for question ${
          questions.indexOf(invalidQuestions[0]) + 1
        }`,
        variant: "destructive",
      });
      return;
    }
    
    // Only proceed if we have a user and instituteId
    if (!user || !user.instituteId) {
      toast({
        title: "Error",
        description: "User information is missing",
        variant: "destructive",
      });
      return;
    }
    
    // Create questions with subject information
    const formattedQuestions: Question[] = questions.map((q) => ({
      id: Math.random().toString(36).substr(2, 9),
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
      subject,
    }));
    
    // Create quiz
    const quizId = createQuiz({
      title,
      subject,
      questions: formattedQuestions,
      createdBy: user.id,
      instituteId: user.instituteId,
    });
    
    toast({
      title: "Success",
      description: `Quiz "${title}" created with ID: ${quizId}`,
    });
    
    navigate('/teacher/view-quiz/' + quizId);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container max-w-4xl">
          <div className="flex items-center mb-8">
            <Link to="/teacher" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create Quiz</h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>
                  Enter the basic information about this quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter a title for this quiz" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject} required>
                    <SelectTrigger id="subject" className="w-full">
                      <div className="flex items-center">
                        {subject && <SubjectIcon subject={subject} size={16} className="mr-2" />}
                        <SelectValue placeholder="Select a subject" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">
                        <div className="flex items-center">
                          <SubjectIcon subject="mathematics" size={16} className="mr-2" />
                          Mathematics
                        </div>
                      </SelectItem>
                      <SelectItem value="science">
                        <div className="flex items-center">
                          <SubjectIcon subject="science" size={16} className="mr-2" />
                          Science
                        </div>
                      </SelectItem>
                      <SelectItem value="social">
                        <div className="flex items-center">
                          <SubjectIcon subject="social" size={16} className="mr-2" />
                          Social Science
                        </div>
                      </SelectItem>
                      <SelectItem value="mat">
                        <div className="flex items-center">
                          <SubjectIcon subject="mat" size={16} className="mr-2" />
                          Mental Ability Test
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Question {questionIndex + 1}</CardTitle>
                    <CardDescription>
                      Enter the question and options
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveQuestion(questionIndex)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                    <Textarea
                      id={`question-${questionIndex}`}
                      placeholder="Enter the question"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                            required
                          />
                        </div>
                        <RadioGroup
                          value={question.correctAnswer.toString()}
                          onValueChange={(value) => handleCorrectAnswerChange(questionIndex, value)}
                          className="flex items-center"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={optionIndex.toString()} id={`option-${questionIndex}-${optionIndex}`} />
                            <Label htmlFor={`option-${questionIndex}-${optionIndex}`} className="text-sm cursor-pointer">
                              Correct
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-between mb-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddQuestion}
                className="border-dashed"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another Question
              </Button>
              
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateQuiz;
