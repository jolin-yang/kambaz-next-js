"use client";

import * as client from "../../client";
import { RootState } from "../../../../../store";
import { useParams } from "next/navigation";
import { Button, Card, CardBody, Col, FormCheck, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setQuizzes } from "../../reducer";
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx";
import Link from "next/link";
import QuizPreviewNavigation from "./QuizPreviewNavigation";
import { FaCheck, FaXing, FaXmark } from "react-icons/fa6";


export default function QuizPreview() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const [submittedAnswers, setSubmittedAnswers] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
    (q : any) => q._id === qid)) as any;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetchQuizzes = async () => {
          const quizzes = await client.findQuizzesForCourse(cid as string);
          dispatch(setQuizzes(quizzes));
    };

    const onSubmit = () => {
        let curr_points = 0;
        for (let i = 0; i < quiz.questions.length; i++) {
            const question = quiz?.questions[i];

            if (question.question_type == "True/False") {
                const correctAnswer = question.trueFalseAnswer ? "True" : "False";
                if (submittedAnswers[question._id] === correctAnswer) {
                    curr_points += question.points;
                }
            }
            else if (question.question_type == "Multiple Choice") {
                const correctOption = question.multiple_choice.find((c: any) => c.isCorrect);
                if (submittedAnswers[question._id] === correctOption.text) {
                    curr_points += question.points;
                }
            }
            else {
                if (question.blanks.includes(submittedAnswers[question._id])) {
                    curr_points += question.points;
                }
            }
        }

        setTotalScore(curr_points);
        setIsSubmitted(true);
        };
  
        
  useEffect(() => {
          fetchQuizzes();
    }, []);

    const currentQ = quiz?.questions[currentQuestion];

    return (
        <div id="quiz-preview">
            <Row>
                <Col>
                    <h2 className="mt-2">{quiz?.title}</h2><br />
                </Col>
                <Col>
                    <Link href={`/courses/${cid}/quizzes/${qid}/editor?tab=questions`} className="btn btn-lg btn-primary float-end">
                        Edit Quiz
                    </Link>
                </Col>
            </Row>
        
            {!isSubmitted ? 
            <>
            <h2>Quiz Instructions</h2><hr /><br />
            <Row>
                <Col className="col-2">
                    <QuizPreviewNavigation questions={quiz?.questions} 
                        currentQuestion={currentQuestion} 
                        setCurrentQuestion={setCurrentQuestion}/>
                </Col>

                <Col>
                    <div className="ms-5">
                    <Card className="ms-5 mb-5 w-75">
                        <CardBody className="ms-2 me-2">
                            <span className="fs-5">Question {currentQuestion + 1}</span>
                            <span className="float-end fs-5">{quiz?.questions[currentQuestion].points} pts</span><hr />
                            <h5 className="mt-4 mb-4">{quiz?.questions[currentQuestion].question}</h5><hr />

                            {quiz?.questions[currentQuestion].question_type === "Multiple Choice" &&
                                quiz?.questions[currentQuestion]?.multiple_choice?.map((choice: any) => (
                                        <FormCheck onChange={() => setSubmittedAnswers({...submittedAnswers, [currentQ._id]: choice.text})}
                                            checked = {submittedAnswers[currentQ._id] === choice.text}
                                            className="mb-2 fs-5"
                                            type="radio"
                                            label={choice.text}
                                            name={`choice-${currentQuestion}`}>
                                        </FormCheck>                                
                                ))
                            }

                            {quiz?.questions[currentQuestion].question_type === "True/False" && (
                                <div>
                                    <FormCheck onChange={() => setSubmittedAnswers({...submittedAnswers, [currentQ._id]: "True"})}
                                        checked = {submittedAnswers[currentQ._id] === "True"}
                                        className="mb-2 fs-5"
                                        type="radio"
                                        label="True"
                                        name={`choice-${currentQuestion}`}>
                                    </FormCheck>   
                                    <FormCheck onChange={() => setSubmittedAnswers({...submittedAnswers, [currentQ._id]: "False"})}
                                        checked = {submittedAnswers[currentQ._id] === "False"}
                                        className="mb-2 fs-5"
                                        type="radio"
                                        label="False"
                                        name={`choice-${currentQuestion}`}>
                                    </FormCheck>  
                                </div>                              
                                )
                            }

                            {quiz?.questions[currentQuestion].question_type === "Fill in the Blank" &&
                                <FormControl onChange={(e) => setSubmittedAnswers({...submittedAnswers, [currentQ._id]: e.target.value})}
                                    value={submittedAnswers[currentQ._id] ?? ""}
                                    className="mt-4 mb-2 w-50 fs-5">
                                </FormControl>
                            }
                        </CardBody>
                    </Card>
                </div><br /><br />
                </Col>
            </Row>

            <div className="position-fixed bottom-0 start-0 end-0 me-5" style={{paddingLeft: '630px', paddingRight: '100px'}}>
                <div className="d-flex justify-content-between">

                    <div>
                        {currentQuestion >= 1 && 
                            <Button className="btn btn-lg btn-secondary"
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                                Previous
                                <RxTriangleLeft size={24} />
                            </Button>
                        }
                    </div>
                    
                    <div>
                        {currentQuestion < quiz?.questions.length - 1 && 
                            <Button className="me-5 float-end btn btn-lg btn-secondary"
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                                Next
                                <RxTriangleRight size={24} />
                            </Button>
                        }
                    </div>
                
                </div><br />

                <div className="me-5 float-end pb-4">
                    <Button className="d-flex align-items-center btn btn-lg btn-danger" onClick={onSubmit}>
                        Submit Quiz
                    </Button>
                </div>
            </div> 
            </>
            :
            <Col>
            <h3 className="d-flex justify-content-center mb-5">Score: {totalScore}/{quiz?.points}</h3>
            {quiz?.questions.map((question: any, index: number) => {
                let isCorrect = false;
                if (question.question_type == "True/False") {
                    const correctAnswer = question.trueFalseAnswer ? "True" : "False";
                    if (submittedAnswers[question._id] === correctAnswer) {
                        isCorrect = true;
                    }
                }
                else if (question.question_type == "Multiple Choice") {
                    const correctOption = question.multiple_choice.find((c: any) => c.isCorrect);
                    if (submittedAnswers[question._id] === correctOption.text) {
                        isCorrect = true;
                    }
                }
                else {
                    if (question.blanks.includes(submittedAnswers[question._id])) {
                        isCorrect = true;
                    }
                }

                return (

                <div className="d-flex justify-content-center ms-5">
                
                <Card className="mb-5 me-5" style={{width: '60%', border: `2px solid ${isCorrect ? 'green' : 'red'}`}}>
                    <CardBody className="ms-2 me-2">
                        <span className="fs-5">Question {index + 1}</span>
                        <span className="float-end fs-5">{question.points} pts</span>
                        <span  className="float-end me-2">
                            {isCorrect ? <FaCheck color="green" size={27}/> : <FaXmark color="red" size={27}/>}
                        </span><hr />
                        <h5 className="mt-4 mb-4">{question.question}</h5><hr />

                        {question.question_type === "Multiple Choice" &&
                            question.multiple_choice?.map((choice: any) => (
                                    <FormCheck 
                                        checked = {submittedAnswers[question._id] === choice.text}
                                        className="mb-2 fs-5"
                                        type="radio"
                                        label={choice.text}
                                        name={`choice-${index}`}
                                        readOnly>
                                    </FormCheck>                                
                            ))
                        }

                        {question.question_type === "True/False" && (
                            <div>
                                <FormCheck 
                                    checked = {submittedAnswers[question._id] === "True"}
                                    className="mb-2 fs-5"
                                    type="radio"
                                    label="True"
                                    name={`choice-${index}`}
                                    readOnly>
                                </FormCheck>   
                                <FormCheck 
                                    checked = {submittedAnswers[question._id] === "False"}
                                    className="mb-2 fs-5"
                                    type="radio"
                                    label="False"
                                    name={`choice-${index}`}
                                    readOnly>
                                </FormCheck>  
                            </div>                              
                            )
                        }

                        {question.question_type === "Fill in the Blank" &&
                            <FormControl 
                                value={submittedAnswers[question._id]}
                                className="mt-4 mb-2 w-50 fs-5"
                                readOnly>
                            </FormControl>
                        }
                    </CardBody>
                </Card>
            </div>
            )})}
            </Col>
            }
        </div>
    );}
