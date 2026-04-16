"use client"

import * as client from "./client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import AddQuizButton from "./AddQuizButton";
import QuizSideIcon from "./QuizSideIcon";
import QuizSideButtons from "./QuizSideButtons";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes } from "./reducer";
import { useEffect } from "react";

export default function Quizzes() {
  const { cid } = useParams();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();

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

  function getAvailability(quiz: any) {
    const currentDate = new Date();
    const untilDate = new Date(quiz.until_date);
    const availableDate = new Date(quiz.available_date);
    if (currentDate > untilDate) {
        return { text: "Closed " };
    }
    if (currentDate >= availableDate && currentDate <= untilDate) {
        return  { text: "Available " };
    }
    if (currentDate < availableDate) {
        return {
            text: "Not available until",
            date: quiz.available_date
        };
    }
    return { text: "" };
  }

  const fetchQuizzes = async () => {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    };
  
    const onRemoveQuiz = async (quizId: string) => {
      await client.deleteQuiz(quizId);
      dispatch(setQuizzes(quizzes.filter((a: any) => a._id !== quizId)));
    };
  
    useEffect(() => {
        fetchQuizzes();
    }, []);
    

    return (
      <div className="pt-3">
        
        {quizzes.length === 0 && (
            <div className="text-end fs-4 mb-3">
                There are no quizzes yet. Click the <b>+ Quiz</b> button to add a quiz.
            </div>
        )}
        
        <AddQuizButton /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-quizzes">
        <div className="wd-title fs-5 p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-1 fs-3" /> 
              <MdOutlineArrowDropDown className="me-0.5 fs-3" />
                <span className="fw-bold">Assignment Quizzes</span> 
        </div>
        {quizzes
          .map((quiz: any) => (
            <ListGroupItem className="wd-module p-0 fs-5 border-0">
              <ListGroup className="wd-quiz rounded-0">
                <ListGroupItem className="wd-quiz p-3 ps-1">
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <BsGripVertical className="me-2 fs-3" /> 
                      <QuizSideIcon/> 
                    </div>
                    <div className="me-5">
                      <div className="fw-bold">
                        <Link href={`/courses/${cid}/quizzes/${quiz._id}`}
                        className="text-dark text-decoration-none">
                        {quiz.title}
                        </Link>
                      </div>
                        <div className="fs-6">
                            <span className="fw-bold"> 
                                {getAvailability(quiz).text} 
                            </span>
                            {getAvailability(quiz).date && (
                                <span>
                                    {" "} {convertAvailableDateToString(getAvailability(quiz).date) } {" "}
                                </span>
                            )}
                               | 
                            <span className="fw-bold"> Due </span>
                            {convertDueDateToString(quiz.due_date)}     |     {quiz.points} pts   |     {quiz.questions.length} Questions
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                      <QuizSideButtons
                      quizId={quiz._id}
                      quizName={quiz.title}
                      deleteQuiz={() => onRemoveQuiz(quiz._id)}/>
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          ))}
          </ListGroup>
      </div>
  );}
  