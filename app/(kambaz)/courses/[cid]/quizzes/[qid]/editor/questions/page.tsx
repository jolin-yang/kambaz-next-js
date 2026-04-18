"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { updateQuiz } from "../../../reducer";
import { FormLabel, Col, FormControl, Row, FormSelect, FormCheck, Button } from "react-bootstrap";


export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();
    // const { title, setTitle } = useState(question?.title "");
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [answerChoices, setAnswerChoices] = useState([
        { text: "", isCorrect: true},
        { text: "", isCorrect: false},
    ])
    const [trueFalseAnswer, setTrueFalseAnswer] = useState(true);
    const [addNewQuestion, setAddNewQuestion] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // const onSave = async () => {
    //     const updatedQuiz = { 
    //         _id: qid, 
    //         title, 
    //         course: cid, 
    //         description, 
    //         quiz_type: quizType, 
    //         points, 
    //         assignment_group: assignmentGroup,
    //         shuffle_answers: shuffleAnswers,
    //         time_limit: timeLimit,
    //         multiple_attempts: multipleAttempts, 
    //         show_correct_answers: showCorrectAnswers,
    //         access_code: accessCode, 
    //         one_question_at_a_time: oneQuestionAtATime, 
    //         webcam_required: webcamRequired, 
    //         lock_questions_after_answering: lockQuestionsAfterAnswering,
    //         due_date: dueDate, 
    //         available_date: availableFromDate, 
    //         until_date: availableUntilDate
    //     };
    //     await client.updateQuiz(updatedQuiz);
    //     dispatch(updateQuiz(updatedQuiz));
    //   }

    const addAnswerChoice = () => {
        setAnswerChoices([
          ...answerChoices,
          { text: "", isCorrect: false }
        ]);
      };

    const deleteAnswerChoice = (index: number) => {
        const updatedAnswerChoices = answerChoices.filter((_, i) => i !== index);
        setAnswerChoices(updatedAnswerChoices);
     };

    const updateAnswerChoice = (index: number, updatedAnswerChoice: string ) => {
        const updatedAnswerChoices = answerChoices.map((choice, i) =>
            i == index ? {...choice, text: updatedAnswerChoice} : choice
        );
        setAnswerChoices(updatedAnswerChoices);
     };
    
    const setCorrectAnswer = (index: number) => {
        const answerAccuracy = answerChoices.map((c, i) => ({
            ...c,
            isCorrect: i == index
        }));
        setAnswerChoices(answerAccuracy);
     };


  
    return (
      <div className="px-5 pt-3">
        <div className="d-flex justify-content-center mb-4">
            <Button className="me-3 mb-3 btn btn-lg btn-secondary position-relative"
                onClick={() => setAddNewQuestion(true)}>
                <span className="me-1"><FaPlus size={15}/></span>
                New Question
            </Button><br />
        </div>

        {addNewQuestion && (
            <div id="addNewQuestion">
            <Row>
                <Col className="col-4 gap-1">
                    <FormControl type="text" value="hello" />
                </Col>
                <Col className="col-4 me-5">
                    <FormSelect value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in the Blank">Fill in the Blank</option>
                    </FormSelect>
                </Col>

                <Col className="text-end">
                    <FormLabel column sm={3} className="fw-bold fs-5"> pts: </FormLabel>
                </Col>
                <Col className="col-1">
                    <FormControl type="number" value={0}
                    // onChange={(e) => setPoints(Number(e.target.value))}
                    />
                </Col>
            </Row><hr />


            {questionType === "Multiple Choice" && (
                <div id="multiple-choice">
                    <div>Enter your question and multiple answers, then select one correct answer.</div><br />
                    <h5 className="fw-bold">Question:</h5>

                    <FormControl as="textarea" rows={5} value="hello" 
                    // onChange={(e) => setDescription(e.target.value)}
                    /><br />

                    <h5 className="fw-bold">Answers:</h5><br />

                    {answerChoices.map((answerChoice, index) => (
                        <Row key={index}>
                            <Col className="fs-5 col-1">
                                <FormCheck type="radio" name="Correct Answer" 
                                checked={answerChoice.isCorrect}
                                onChange={() => setCorrectAnswer(index)}>
                                </FormCheck>
                            </Col>
                            <Col className="text-end col-3 fs-5">Possible Answer</Col>
                            <Col className="col-4 fs-5 mb-3">
                                <FormControl
                                    value={answerChoice.text}
                                    onChange={(e) => updateAnswerChoice(index, e.target.value)}>
                                </FormControl>
                            </Col>
                            <Col className="ms-5">
                                <FaTrash size={23}
                                onClick={() => deleteAnswerChoice(index)}/>
                            </Col>
                        </Row>
                    ))}

                    <div className="d-flex justify-content-end mb-4">
                        <Button className="me-3 mb-3 btn btn-secondary position-relative"
                            onClick={() => addAnswerChoice()}>
                            <span className="me-1 text-red"><FaPlus size={15}/></span>
                            Add Another Answer
                        </Button><br />
                    </div>
                </div>
            )}


            {questionType === "True/False" && (
                <div id="true-false">
                    <div>Enter your question text, then select if True or False is the correct answer.</div><br />
                    <h5 className="fw-bold">Question:</h5>

                    <FormControl as="textarea" rows={5} value="hello" 
                    // onChange={(e) => setDescription(e.target.value)}
                    /><br />

                    <h5 className="fw-bold">Answers:</h5>
                    <FormCheck
                        type="radio"
                        label="True"
                        name="trueFalse"
                        checked={trueFalseAnswer === true}
                        onChange={() => setTrueFalseAnswer(true)}
                    />

                    <FormCheck
                        type="radio"
                        label="False"
                        name="trueFalse"
                        checked={trueFalseAnswer === false}
                        onChange={() => setTrueFalseAnswer(false)}
                    />
                </div>
            )}

            {questionType === "Fill in the Blank" && (
                <div id="fill-in-the-blank">
                    <span>Enter your question text, then define all correct answers for the blank.
                    </span><br />
                    <span>Students will see the question followed by a small text box to type their answer.</span>
                    <br /><br />
                    <h5 className="fw-bold">Question:</h5>

                    <FormControl as="textarea" rows={5} value="hello" 
                    // onChange={(e) => setDescription(e.target.value)}
                    /><br />


                    <h5 className="fw-bold">Answers:</h5><br />
                    <div>
                        <Row>
                            <Col className="text-end col-3 fs-5">Possible Answer</Col>
                            <Col className="col-4 fs-5">
                                <FormControl>
                                    
                                </FormControl>
                            </Col>
                            <Col className="ms-5">
                                <FaTrash size={23}/>
                            </Col>
                        </Row>
                    </div><br />
                    

                    <div className="d-flex justify-content-end mb-4">
                        <Button className="me-3 mb-3 btn btn-secondary position-relative"
                            onClick={() => addAnswerChoice()}>
                            <span className="me-1 text-red"><FaPlus size={15}/></span>
                            Add Another Answer
                        </Button><br />
                    </div>
                </div>
            )}

            <div className="mt-4">
                <Link href={`/courses/${cid}/quizzes`} id="wd-group-btn"
                    className="me-2 btn btn-secondary position-relative">
                        Cancel
                </Link>
                <Link href={`/courses/${cid}/quizzes/${qid}/editor`} 
                // onClick={onSave} 
                    className="me-2 btn btn-danger position-relative">
                        Save Question
                </Link>
            </div>
        </div>
        )}


        <div className="mt-2">
            <Link href={`/courses/${cid}/quizzes`} id="wd-group-btn"
                className="me-3 btn btn-lg btn-secondary position-relative">
                    Cancel
            </Link>
            <Link href={`/courses/${cid}/quizzes/${qid}/editor`} 
            // onClick={onSave} 
                className="me-2 btn btn-lg btn-danger position-relative">
                    Save
            </Link>
        </div>
      </div>
  );}
  