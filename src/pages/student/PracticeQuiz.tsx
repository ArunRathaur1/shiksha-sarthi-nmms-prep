
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { useQuiz, Question } from '@/contexts/QuizContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const PracticeQuiz: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const { practiceQuestions } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    if (subject && practiceQuestions[subject]) {
      setQuestions(practiceQuestions[subject]);
      setSelectedAnswers(new Array(practiceQuestions[subject].length).fill(-1));
    } else {
      navigate('/student/practice');
    }
  }, [subject, practiceQuestions, navigate]);
  
  const handleAnswerSelect = (value: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = parseInt(value);
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredQuestions = selectedAnswers.filter(answer => answer === -1).length;
    
    if (unansweredQuestions > 0) {
      toast({
        title: "Warning",
        description: `You have ${unansweredQuestions} unanswered questions. Are you sure you want to submit?`,
        variant: "destructive",
      });
      return;
    }
    
    // Calculate score
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        newScore++;
      }
    }
    
    setScore(newScore);
    setIsSubmitted(true);
    
    toast({
      title: "Quiz Submitted",
      description: `You scored ${newScore} out of ${questions.length} questions!`,
    });
  };
  
  const subjectDisplayNames: Record<string, string> = {
    'mathematics': 'Mathematics',
    'science': 'Science',
    'social': 'Social Science',
    'mat': 'Mental Ability Test',
  };
  
  if (questions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8 bg-gray-50">
          <div className="edu-container">
            <Card>
              <CardContent className="py-12 text-center">
                <p>Loading questions...</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/student/practice">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Subjects
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold">
                  {subjectDisplayNames[subject || ''] || 'Practice'} Quiz
                </h1>
              </div>
              
              {!isSubmitted && (
                <Button onClick={handleSubmit}>Submit Quiz</Button>
              )}
            </div>
          </div>
          
          {!isSubmitted ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="text-sm font-normal text-gray-500">
                    {selectedAnswers[currentQuestionIndex] >= 0 ? "Answered" : "Unanswered"}
                  </span>
                </CardTitle>
                <Progress value={(currentQuestionIndex + 1) / questions.length * 100} className="mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      {questions[currentQuestionIndex].text}
                    </h3>
                    
                    <RadioGroup 
                      value={selectedAnswers[currentQuestionIndex].toString()} 
                      onValueChange={handleAnswerSelect}
                      className="space-y-3"
                    >
                      {questions[currentQuestionIndex].options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50">
                          <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                          <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={handlePrevious} 
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button 
                    onClick={handleNext} 
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Finish Quiz
                  </Button>
                )}
              </CardFooter>
            </Card>
            ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
                    <span className="text-3xl font-bold">
                      {score}/{questions.length}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    {score === questions.length 
                      ? "Perfect Score!" 
                      : score >= questions.length / 2 
                        ? "Good job!" 
                        : "Keep practicing!"}
                  </h3>
                  <p className="text-gray-600">
                    You answered {score} out of {questions.length} questions correctly.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-medium text-lg border-b pb-2">Question Review:</h3>
                  
                  {questions.map((question, idx) => (
                    <div key={idx} className="border rounded-md p-4">
                      <div className="flex items-center mb-2">
                        <span className="font-medium mr-2">Question {idx + 1}:</span>
                        {selectedAnswers[idx] === question.correctAnswer ? (
                          <span className="inline-flex items-center text-green-600">
                            <Check className="h-4 w-4 mr-1" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-1" /> Incorrect
                          </span>
                        )}
                      </div>
                      <p className="mb-4">{question.text}</p>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optIdx) => (
                          <div 
                            key={optIdx}
                            className={`p-2 rounded-md ${
                              question.correctAnswer === optIdx
                                ? 'bg-green-100 border border-green-300'
                                : selectedAnswers[idx] === optIdx
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            {option}
                            {question.correctAnswer === optIdx && (
                              <span className="ml-2 text-sm text-green-600">
                                (Correct answer)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/student/practice">
                  <Button>
                    Try Another Subject
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PracticeQuiz;
