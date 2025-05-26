// File: StudentPractice.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectIcon from '@/components/SubjectIcon';

const subjectData = [
  { id: 'गणित', name: 'गणित', description: 'गणना, बीजगणित, ज्यामिति आदि' },
  { id: 'विज्ञान', name: 'विज्ञान', description: 'भौतिकी, रसायन, जीव विज्ञान' },
  { id: 'सामाजिक%20विज्ञान', name: 'सामाजिक विज्ञान', description: 'इतिहास, भूगोल, नागरिकशास्त्र' },
  { id: 'मानसिक%20क्षमता%20परीक्षण', name: 'मानसिक क्षमता परीक्षण', description: 'तर्क, विश्लेषण, गणितीय क्षमता' },
];

const StudentPractice: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="edu-container">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">प्रश्न अभ्यास</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjectData.map((subject) => (
              <Card key={subject.id}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <SubjectIcon subject={subject.id} size={30} />
                    <CardTitle>{subject.name}</CardTitle>
                  </div>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  <Link to={`/student/practice/${subject.id}`} className="w-full">
                    <Button className="w-full">Start Practice</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentPractice;
