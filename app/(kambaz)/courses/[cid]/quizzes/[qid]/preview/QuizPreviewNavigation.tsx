"use client"

import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function QuizTOC({ questions, currentQuestion, setCurrentQuestion }: {
    questions: any[];
    currentQuestion: number;
    setCurrentQuestion: (index: number) => void;
}) 
{
  
    if (!questions) {
      return null;
    }

    return (
        <ListGroup className="rounded-0">
            {questions.map((_: any, index: number) => (
                <ListGroupItem key={index}
                    className={`border-0 fs-6 ${currentQuestion === index ? "text-danger" : "text-black"}`}
                    onClick={() => setCurrentQuestion(index)}
                    style={{cursor: 'pointer'}}>
                    Question {index + 1}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}
