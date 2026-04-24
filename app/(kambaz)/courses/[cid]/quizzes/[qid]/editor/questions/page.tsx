"use client"

import * as client from "../../../client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { updateQuiz } from "../../../reducer";
import { FormLabel, Col, FormControl, Row, FormSelect, FormCheck, Button, CardBody, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";


export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();

    const [questions, setQuestions] = useState<any[]>([]);
    const [editMode, setEditMode] = useState<boolean[]>([]);
    const [questionsPrevState, setQuestionsPrevState] = useState<any[]>([]);

    const dispatch = useDispatch();
    const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
        (q : any) => q._id === qid)) as any;    

    const totalPoints = questions.reduce((currentTotalPoints, q) => currentTotalPoints + (q.points), 0);

    const onSave = async () => {
        const updatedQuiz = {
          ...quiz, questions, points: totalPoints
        };

        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));  
    };

    const addNewQuestion = () => {
        const newQuestion = {
            title: "",
            question: "",
            points: 0,
            question_type: "Multiple Choice",
            multiple_choice: [{ text: "", isCorrect: true}, { text: "", isCorrect: false}],
            trueFalseAnswer: null,
            blanks: [""],
        };

        setQuestions([...questions, newQuestion]);
        setEditMode([...editMode, true]);
    }

    const updateQuestionType = (questionType: string, questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], question_type: questionType };

        setQuestions(updatedQuestions);
      };

    const updateQuestionField = (questionIndex: number, field: string, newValue: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], [field]: newValue };

        setQuestions(updatedQuestions);
    }


    const addMCQChoice = (questionIndex: number) => {
        const updatedQuestions = [...questions];

        updatedQuestions[questionIndex] = { 
            ...updatedQuestions[questionIndex], 
            multiple_choice: [...updatedQuestions[questionIndex].multiple_choice, { text: "", isCorrect: false }]};

        setQuestions(updatedQuestions);
    };

    const addFillInBlankChoice = (questionIndex: number) => {
        const updatedQuestions = [...questions];

        updatedQuestions[questionIndex] = { 
            ...updatedQuestions[questionIndex], 
            blanks: [...updatedQuestions[questionIndex].blanks, ""]};

        setQuestions(updatedQuestions);
    };

    const updateMCQChoice = (questionIndex: number, choiceIndex: number, newValue: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            multiple_choice: updatedQuestions[questionIndex].multiple_choice.map((choice: any, index: number) => (
                (index === choiceIndex) ? {...choice, text: newValue} : choice 
            ))
        }

        setQuestions(updatedQuestions);
    };

    const updateFillInBlankChoice = (questionIndex: number, choiceIndex: number, newValue: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            blanks: updatedQuestions[questionIndex].blanks.map((blank: string, index: number) => (
                (index === choiceIndex) ? newValue : blank 
            ))
        }
        setQuestions(updatedQuestions);
    };

    const deleteMCQChoice = (questionIndex: number, choiceIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = { 
            ...updatedQuestions[questionIndex], 
            multiple_choice: updatedQuestions[questionIndex].multiple_choice.filter((_: any, index: number) => index !== choiceIndex)};

        setQuestions(updatedQuestions);
    };

    const deleteFillInBlankChoice = (questionIndex: number, choiceIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = { 
            ...updatedQuestions[questionIndex], 
            blanks: updatedQuestions[questionIndex].blanks.filter((_: any, index: number) => index !== choiceIndex)};

        setQuestions(updatedQuestions);
    };

    const setMCQCorrectAnswer = (questionIndex: number, choiceIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            multiple_choice: updatedQuestions[questionIndex].multiple_choice.map((choice: any, index: number) => (
                {...choice, isCorrect: index === choiceIndex}
            )) 
        }

        setQuestions(updatedQuestions);
    };

    const setTrueFalseAnswer = (questionIndex: number, value: boolean) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            trueFalseAnswer: value
        }

        setQuestions(updatedQuestions);
    };

    const switchEditMode = (questionIndex: number) => {
        const updatedEditMode = [...editMode];

        if (!updatedEditMode[questionIndex]) {
            const q = questions[questionIndex];
    
            const snapshot = {
                ...q,
                multiple_choice: q.multiple_choice?.map((c: any) => ({ ...c })),
                blanks: q.blanks ? [...q.blanks] : [],
            };
    
            const updatedPrev = [...questionsPrevState];
            updatedPrev[questionIndex] = snapshot;
    
            setQuestionsPrevState(updatedPrev);
        }

        updatedEditMode[questionIndex] = !updatedEditMode[questionIndex];

        setEditMode(updatedEditMode);
    }

    const onCancelQuestion = (questionIndex: number) => {
        if (!questionsPrevState[questionIndex]) {
            setQuestions(questions.filter((_, index) => index !== questionIndex));
            setEditMode(editMode.filter((_, index) => index !== questionIndex));
        }
        else {
            const restoredQuestions = [...questions];
            restoredQuestions[questionIndex] = {...questionsPrevState[questionIndex]};   // restore question back to original state before edits
            setQuestions(restoredQuestions);
            switchEditMode(questionIndex);
        }
    }
     
    useEffect(() => {
        setQuestions(quiz.questions);
        setEditMode(quiz.questions.map(() => false));
        setQuestionsPrevState(quiz.questions);
    }, []);

  
    return (
      <div className="px-5 pt-3">
        <div className="d-flex justify-content-center mb-4">
            <Button className="mt-4 me-3 mb-4 btn btn-lg btn-secondary position-relative"
                onClick={() => addNewQuestion()}>
                <span className="me-1"><FaPlus size={15}/></span>
                New Question
            </Button><br />
        </div>

        {questions.map((question: any, questionIndex: number) => 
            editMode[questionIndex] ? 
                <div id="addNewQuestion">
                    <Row>
                        <Col className="col-4 gap-1">
                            <FormControl type="text" value={question.title}
                            onChange={(e) => updateQuestionField(questionIndex, "title", e.target.value)}/>
                        </Col>
                        <Col className="col-4 me-5">
                            <FormSelect value={question.question_type} onChange={(e) => updateQuestionType(e.target.value, questionIndex)}>
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True/False">True/False</option>
                                <option value="Fill in the Blank">Fill in the Blank</option>
                            </FormSelect>
                        </Col>

                        <Col className="text-end">
                            <FormLabel column sm={3} className="fw-bold fs-5"> pts: </FormLabel>
                        </Col>
                        <Col className="col-2">
                            <FormControl type="number" value={question.points}
                            onChange={(e) => updateQuestionField(questionIndex, "points", Number(e.target.value))}
                            />
                        </Col>
                    </Row><hr />


                    {question.question_type === "Multiple Choice" && (
                        <div id="multiple-choice">
                            <div>Enter your question and multiple answers, then select one correct answer.</div><br />
                            <h5 className="fw-bold">Question:</h5>

                            <FormControl as="textarea" rows={5} value={question.question}
                                onChange={(e) => updateQuestionField(questionIndex, "question", e.target.value)}/>
                            <br />

                            <h5 className="fw-bold">Answers:</h5><br />

                            {question.multiple_choice.map((mcqChoice: any, choiceIndex: number) => (
                                <Row>
                                    <Col className="fs-5 col-1">
                                        <FormCheck type="radio" name={`correctAnswer-${questionIndex}`} 
                                        checked={mcqChoice.isCorrect}
                                        onChange={() => setMCQCorrectAnswer(questionIndex, choiceIndex)}>
                                        </FormCheck>
                                    </Col>
                                    <Col className="text-end col-3 fs-5">Possible Answer</Col>
                                    <Col className="col-4 fs-5 mb-3">
                                        <FormControl
                                            value={mcqChoice.text}
                                            onChange={(e) => updateMCQChoice(questionIndex, choiceIndex, e.target.value)}>
                                        </FormControl>
                                    </Col>
                                    <Col className="ms-5">
                                        <FaTrash size={23}
                                        onClick={() => deleteMCQChoice(questionIndex, choiceIndex)}/>
                                    </Col>
                                </Row>
                            ))}

                            <div className="d-flex justify-content-end mb-4">
                                <Button className="me-3 mb-3 btn btn-secondary position-relative"
                                    onClick={() => addMCQChoice(questionIndex)}>
                                    <span className="me-1 text-red"><FaPlus size={15}/></span>
                                    Add Another Answer
                                </Button><br />
                            </div>
                        </div>
                    )}


                    {question.question_type === "True/False" && (
                        <div id="true-false">
                            <div>Enter your question text, then select if True or False is the correct answer.</div><br />
                            <h5 className="fw-bold">Question:</h5>

                            <FormControl as="textarea" rows={5} value={question.question}
                                onChange={(e) => updateQuestionField(questionIndex, "question", e.target.value)}/><br />

                            <h5 className="fw-bold">Answers:</h5>
                            <FormCheck
                                type="radio"
                                label="True"
                                name={`trueFalse-${questionIndex}`}
                                checked={question.trueFalseAnswer === true}
                                onChange={() => setTrueFalseAnswer(questionIndex, true)}
                            />

                            <FormCheck
                                type="radio"
                                label="False"
                                name={`trueFalse-${questionIndex}`}
                                checked={question.trueFalseAnswer === false}
                                onChange={() => setTrueFalseAnswer(questionIndex, false)}
                            />
                        </div>
                    )}

                    {question.question_type === "Fill in the Blank" && (
                        <div id="fill-in-the-blank">
                            <span>Enter your question text, then define all correct answers for the blank.
                            </span><br />
                            <span>Students will see the question followed by a small text box to type their answer.</span>
                            <br /><br />
                            <h5 className="fw-bold">Question:</h5>

                            <FormControl as="textarea" rows={5} value={question.question}
                                onChange={(e) => updateQuestionField(questionIndex, "question", e.target.value)}/><br />


                            <h5 className="fw-bold">Answers:</h5><br />
                            {question.blanks.map((blank: any, blankIndex: number) => (
                                <Row>
                                    <Col className="text-end col-3 fs-5">Possible Answer</Col>
                                    <Col className="col-4 fs-5 mb-3">
                                        <FormControl
                                            value={blank}
                                            onChange={(e) => updateFillInBlankChoice(questionIndex, blankIndex, e.target.value)}>
                                        </FormControl>
                                    </Col>
                                    <Col className="ms-5">
                                        <FaTrash size={23}
                                        onClick={() => deleteFillInBlankChoice(questionIndex, blankIndex)}/>
                                    </Col>
                                </Row>
                            ))}

                            <div className="d-flex justify-content-end mb-4">
                                <Button className="me-3 mb-3 btn btn-secondary position-relative"
                                    onClick={() => addFillInBlankChoice(questionIndex)}>
                                    <span className="me-1 text-red"><FaPlus size={15}/></span>
                                    Add Another Answer
                                </Button><br />
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        <Button 
                            className="me-2 btn btn-secondary position-relative"
                                onClick={() => onCancelQuestion(questionIndex)}>
                                Cancel
                        </Button>
                        <Button
                            className="me-2 btn btn-danger position-relative"
                                onClick={() => switchEditMode(questionIndex)}>
                                Save Question
                        </Button>
                    </div><hr /><br /><br />
                </div>
                :
                <div className="ms-5">
                    <Card className="ms-5 mb-5 w-75">
                        <CardBody className="ms-2 me-2">
                            <span className="fs-5">Question {questionIndex + 1}</span>
                            <span>
                            <Button className="float-end btn-danger btn-sm ms-3"
                            onClick={() => switchEditMode(questionIndex)}>
                                Edit
                            </Button>
                            </span>
                            <span className="float-end fs-5">{question?.points} pts</span><hr />
                            <h6 className="mt-4 mb-4">{question?.question}</h6><hr />

                            {question?.question_type === "Multiple Choice" &&
                                question?.multiple_choice?.map((choice: any) => (
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
            )
        }

        <div className="mt-4">
            <Link href={`/courses/${cid}/quizzes`} id="wd-group-btn"
                className="me-3 btn btn-lg btn-secondary position-relative">
                    Cancel
            </Link>
            <Link href={`/courses/${cid}/quizzes/${qid}`} 
                onClick={onSave} 
                className="me-2 btn btn-lg btn-danger position-relative">
                    Save
            </Link>
        </div>
      </div>
  );}
  