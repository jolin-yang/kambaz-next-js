"use client"

import * as client from "../../../client";
import { setQuizzes, updateQuiz } from "../../../reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../store";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { FormLabel, FormControl, Form, Col, Row, FormSelect, FormCheck } from "react-bootstrap";
import Link from "next/link";

export default function QuizDetailsEditor() {
  const { cid, qid } = useParams();
  const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
    (q : any) => q._id === qid)) as any;

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role !== "STUDENT";
  const isStudent = !isFaculty;

  const properAvailableDateFormat = quiz?.available_date ? 
    quiz.available_date.includes("at") ?
      new Date(quiz.available_date.split(" at")[0] + " 2026").toISOString().slice(0, 10) 
      : quiz.available_date
    : "";
  const properDueDateFormat = quiz?.due_date ?
    quiz.due_date.includes("at") ?
      new Date(quiz.due_date.split(" at")[0] + " 2026").toISOString().slice(0, 10) 
      : quiz.due_date
    : "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [quizType, setQuizType] = useState("");
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState(0);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
  const [availableFromDate, setAvailableFromDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");

  useEffect(() => {
    if (!quiz) {
        return;
    }
    
    setTitle(quiz.title);
    setDescription(quiz.description);
    setPoints(quiz.points);
    setQuizType(quiz.quiz_type);
    setAssignmentGroup(quiz.assignment_group);
    setShuffleAnswers(quiz.shuffle_answers);
    setTimeLimit(quiz.time_limit);
    setMultipleAttempts(quiz.multiple_attempts);
    setShowCorrectAnswers(quiz.show_correct_answers);
    setAccessCode(quiz.access_code);
    setOneQuestionAtATime(quiz.one_question_at_a_time);
    setWebcamRequired(quiz.webcam_required);
    setLockQuestionsAfterAnswering(quiz.lock_questions_after_answering);
    setAvailableFromDate(properAvailableDateFormat);
    setDueDate(properDueDateFormat);
    setAvailableUntilDate(properDueDateFormat);
  }, [quiz]);
  

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const onSave = async () => {
    const updatedQuiz = { 
        _id: qid, 
        title, 
        course: cid, 
        description, 
        quiz_type: quizType, 
        points, 
        assignment_group: assignmentGroup,
        shuffle_answers: shuffleAnswers,
        time_limit: timeLimit,
        multiple_attempts: multipleAttempts, 
        show_correct_answers: showCorrectAnswers,
        access_code: accessCode, 
        one_question_at_a_time: oneQuestionAtATime, 
        webcam_required: webcamRequired, 
        lock_questions_after_answering: lockQuestionsAfterAnswering,
        due_date: dueDate, 
        available_date: availableFromDate, 
        until_date: availableUntilDate
    };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  }

    return (
      <div className="px-5 pt-3">
        <div className="px-5 ms-1 mt-4">
            <Form>
                <FormControl value={title} onChange={(e) => setTitle(e.target.value)}/><br />
                <FormControl as="textarea" rows={8} value={description} onChange={(e) => setDescription(e.target.value)}/><br />
            </Form>
            <Row className="mb-4">
                <FormLabel column sm={3} className="text-end"> Quiz Type </FormLabel>
                <Col className="col-4">
                    <FormSelect value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                    </FormSelect>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3} className="text-end"> Assignment Group </FormLabel>
                <Col className="col-4">
                    <FormSelect value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                    </FormSelect>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3} className="text-end"> Points </FormLabel>
                <Col className="col-4">
                    <FormControl value={points} onChange={(e) => setPoints(Number(e.target.value))}/>
                </Col>
          </Row>
          <Row className="mb-3">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                    <span className="fw-bold"> Options </span>
                </Col>
          </Row>
          <Row className="mb-2">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                    <FormCheck
                        label="Shuffle Answers"
                        type="checkbox"
                        checked={shuffleAnswers}
                        onChange={(e) => setShuffleAnswers(e.target.checked)}>
                    </FormCheck>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                <div className="d-flex align-items-center gap-4">
                <FormCheck
                    label="Time Limit"
                    type="checkbox"
                    checked={timeLimit > 0}
                    onChange={(e) => {
                    if (e.target.checked) {
                        setTimeLimit(20);
                    } else {
                        setTimeLimit(0);
                    }
                    }}/>

                    {timeLimit > 0 && (
                    <div className="d-flex align-items-center gap-1">
                        <FormControl
                            type="number"
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(Number(e.target.value))}
                            style={{ width: "75px" }}>
                        </FormControl>
                        <span>Minutes</span>
                    </div>
                    )}
                </div>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                    <FormCheck
                        label="Allow Multiple Attempts"
                        type="checkbox"
                        checked={multipleAttempts}
                        onChange={(e) => setMultipleAttempts(e.target.checked)}>
                    </FormCheck>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3} className="text-end"> Show Correct Answers </FormLabel>
                <Col className="col-4">
                    <FormSelect value={showCorrectAnswers} onChange={(e) => setShowCorrectAnswers(e.target.value)}>
                    <option value="Never">Never</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Later">Later</option>
                    </FormSelect>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3} className="text-end">Access Code</FormLabel>
                <Col className="col-4">
                    <FormControl
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}>
                    </FormControl>
                </Col>
          </Row>
          <Row className="mb-3">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                    <FormCheck
                        label="One Question at a Time"
                        type="checkbox"
                        checked={oneQuestionAtATime}
                        onChange={(e) => setOneQuestionAtATime(e.target.checked)}>
                    </FormCheck>
                </Col>
          </Row>
          <Row className="mb-3">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                    <FormCheck
                        label="Webcam Required"
                        type="checkbox"
                        checked={webcamRequired}
                        onChange={(e) => setWebcamRequired(e.target.checked)}>
                    </FormCheck>
                </Col>
          </Row>
          <Row className="mb-4">
                <FormLabel column sm={3}> </FormLabel>
                <Col className="col-4">
                    <FormCheck
                        label="Lock Questions After Answering"
                        type="checkbox"
                        checked={lockQuestionsAfterAnswering}
                        onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}>
                    </FormCheck>
                </Col>
          </Row>
          <Row className="mb-5 ms-5">
            <FormLabel column sm={2} className="text-end"> Assign </FormLabel>
            <Col sm={10}>
              <div className="border rounded p-3 w-100">
                <FormLabel className="fw-bold">Assign to</FormLabel>
                <FormSelect className="mb-3">
                  <option value="Everyone">Everyone</option>
                </FormSelect>
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl type="date"
                  defaultValue={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mb-3">
                </FormControl>
                <Row className="mb-3">
                  <Col>
                    <FormLabel className="fw-bold">Available from</FormLabel>
                    <FormControl type="date"
                      defaultValue={availableFromDate}
                      onChange={(e) => setAvailableFromDate(e.target.value)}>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <FormControl type="date"
                      defaultValue={availableUntilDate}
                      onChange={(e) => setAvailableUntilDate(e.target.value)}>
                    </FormControl>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div>
            <Link href={`/courses/${cid}/quizzes/`} onClick={onSave} className="float-end me-3 mb-3 btn btn-success position-relative">
                Save and Publish
            </Link>
            <Link href={`/courses/${cid}/quizzes/${qid}`} onClick={onSave} className="float-end me-3 mb-5 btn btn-danger position-relative">
                Save
            </Link>
            <Link href={`/courses/${cid}/quizzes`} id="wd-group-btn"
            className="float-end me-3 mb-3 btn btn-secondary position-relative">
                Cancel
            </Link>
        </div>
      </div>
  );}
