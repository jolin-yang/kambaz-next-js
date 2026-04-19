"use client";

import * as client from "../../client";
import { RootState } from "../../../../../store";
import { useParams } from "next/navigation";
import { Button, Card, CardBody, Col, FormCheck, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQuizzes } from "../../reducer";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
    (q : any) => q._id === qid)) as any;

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
                    <Button href={`/courses/${cid}/quizzes/${qid}/editor?tab=questions`} className="btn-lg btn-secondary float-end">
                        Edit Quiz
                    </Button>
                </Col>
            </Row>
        
            <h2>Quiz Instructions</h2><hr /><br />


            {quiz?.questions.map((question, questionIndex) => 
              <div className="ms-5">
                <Card className="ms-5 mb-5 w-75">
                    <CardBody className="ms-2 me-2">
                        <span className="fs-5">Question {questionIndex + 1}</span>
                        <span className="float-end fs-5">{question?.points} pts</span><hr />
                        <h6 className="mt-4 mb-4">{question?.question}</h6><hr />

                        {question?.question_type === "Multiple Choice" &&
                            question?.multiple_choice?.map((choice) => (
                                    <FormCheck
                                    className="mb-2"
                                    type="radio"
                                    label={choice.text}
                                    name={`choice-${questionIndex}`}>
                                </FormCheck>                                
                            ))
                        }

                        {question?.question_type === "True/False" && (
                            <div>
                                <FormCheck
                                    className="mb-2"
                                    type="radio"
                                    label="True"
                                    name={`choice-${questionIndex}`}>
                                </FormCheck>   
                                <FormCheck
                                    className="mb-2"
                                    type="radio"
                                    label="False"
                                    name={`choice-${questionIndex}`}>
                                </FormCheck>  
                            </div>                              
                            )
                        }

                        {question?.question_type === "Fill in the Blank" &&
                            <FormControl
                                className="mt-4 mb-2 w-50">
                            </FormControl>
                        }
                     </CardBody>
                </Card>

                
              </div>
            )}
        </div>
    );}
