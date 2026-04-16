"use client"

import { RootState } from "../../../../store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes } from "./../reducer";
import * as client from "./../client";
import Link from "next/link";
import { TiPencil } from "react-icons/ti";
import { Row, Col } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (!qid) return;

    client.findQuizById(qid as string).then((data) => {
      setQuiz(data);
    });
  }, [qid]);

  // useEffect(() => {
  //   client.findQuizzesForCourse(cid as string)
  //     .then((data) => dispatch(setQuizzes(data)));
  // }, [cid]);

  // const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
  //   (q : any) => q._id === qid)) as any;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role !== "STUDENT";
  const isStudent = !isFaculty;


  function convertDueDateToString(date: string) {
    if (!date) {
      return "";
    }
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      }) + " at 11:59pm";
  }

  function convertAvailableDateToString(date: string) {  
    if (!date) {
      return "";
    }
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    }) + " at 12:00am";
  }
    return (
      <div>
        <div id="wd-quiz-details-buttons" className="d-flex justify-content-center mb-3">
          <Link href={`/courses/${cid}/quizzes/${qid}/preview`} id="wd-preview-btn"
          className="me-2 mb-3 btn btn-secondary btn-lg position-relative">
                  Preview
          </Link>
          <Link href={`/courses/${cid}/quizzes/${qid}/editor`} id="wd-edit-btn"
          className="me-2 mb-3 btn btn-secondary btn-lg position-relative">
            <TiPencil size={26}/> Edit
          </Link>
        </div>
        <h2>{quiz?.title}</h2><br />

        <div className="ms-2 mb-4">
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Quiz Type</Col>
            <Col>{quiz?.quiz_type}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Points</Col>
            <Col>{quiz?.points}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Assignment Group</Col>
            <Col>{quiz?.assignment_group}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Shuffle Answers</Col>
            <Col>{quiz?.shuffle_answers? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Time Limit</Col>
            <Col>{quiz?.time_limit} Minutes</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Multiple Attempts</Col>
            <Col>{quiz?.multiple_attempts? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">How Many Attempts</Col>
            <Col>{quiz?.number_attempts}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Show Correct Answers</Col>
            <Col>{quiz?.show_correct_answers}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Access Code</Col>
            <Col>{quiz?.access_code}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">One Question at a Time</Col>
            <Col>{quiz?.one_question_at_a_time? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Webcam Required</Col>
            <Col>{quiz?.webcam_required? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-3 fs-5"> 
            <Col className="col-4 fw-bold text-end">Lock Questions After Answering</Col>
            <Col>{quiz?.lock_questions_after_answering? "Yes" : "No"}</Col>
          </Row>
        </div><br />

        <div>
          <Row>
            <Col>
              <div className="fw-bold fs-5">Due</div><hr />
              <div className="fs-5">{convertDueDateToString(quiz?.due_date)}</div>
            </Col>
            <Col>
            <div className="fw-bold fs-5">Available from</div><hr />
            <div className="fs-5">{convertAvailableDateToString(quiz?.available_date)}</div>
            </Col>
            <Col>
            <div className="fw-bold fs-5">Until</div><hr />
            <div className="fs-5">{convertDueDateToString(quiz?.until_date)}</div>
            </Col>
          </Row>
        </div>
      </div>
  );}
  