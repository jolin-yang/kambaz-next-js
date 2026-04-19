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


export default function QuizPreview() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
    (q : any) => q._id === qid)) as any;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetchQuizzes = async () => {
          const quizzes = await client.findQuizzesForCourse(cid as string);
          dispatch(setQuizzes(quizzes));
    };
  
  useEffect(() => {
          fetchQuizzes();
    }, []);

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
                                quiz?.questions[currentQuestion].multiple_choice?.map((choice: any) => (
                                        <FormCheck
                                            className="mb-2 fs-5"
                                            type="radio"
                                            label={choice.text}
                                            name={`choice-${currentQuestion}`}>
                                        </FormCheck>                                
                                ))
                            }

                            {quiz?.questions[currentQuestion].question_type === "True/False" && (
                                <div>
                                    <FormCheck
                                        className="mb-2 fs-5"
                                        type="radio"
                                        label="True"
                                        name={`choice-${currentQuestion}`}>
                                    </FormCheck>   
                                    <FormCheck
                                        className="mb-2 fs-5"
                                        type="radio"
                                        label="False"
                                        name={`choice-${currentQuestion}`}>
                                    </FormCheck>  
                                </div>                              
                                )
                            }

                            {quiz?.questions[currentQuestion].question_type === "Fill in the Blank" &&
                                <FormControl
                                    className="mt-4 mb-2 w-50 fs-5">
                                </FormControl>
                            }
                        </CardBody>
                    </Card>
                </div><br /><br />
                </Col>
            </Row>

            <div className="position-fixed bottom-0 end-0 p-4 me-5">
                <div className="d-flex align-items-center me-5 justify-content-end gap-3">
                    {currentQuestion >= 1 && 
                        <Button className="btn btn-lg btn-secondary"
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                            Previous
                            <RxTriangleLeft size={24} />
                        </Button>
                    }
                    {currentQuestion < quiz?.questions.length - 1 && 
                        <Button className="btn btn-lg btn-secondary"
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                            Next
                            <RxTriangleRight size={24} />
                        </Button>
                    }
                </div><br />

                <div className="me-5 float-end">
                    <Button className="btn btn-lg btn-danger">
                        Submit Quiz
                    </Button>
                </div>
            </div> 
        </div>
    );}
