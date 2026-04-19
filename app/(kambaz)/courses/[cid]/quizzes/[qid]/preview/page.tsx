"use client";

import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";

export default function QuizPreview() {

    const { cid, qid } = useParams();

    return (
        <div id="quiz-preview">
            <Button href={`/courses/${cid}/quizzes/${qid}`}>

            </Button>
        </div>
    );}
