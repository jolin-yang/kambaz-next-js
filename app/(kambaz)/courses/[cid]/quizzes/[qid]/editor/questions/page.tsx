"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";


export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();

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
      <div>
        <Link href={`/courses/${cid}/quizzes/`} className="float-end me-3 mb-3 btn btn-secondary position-relative">
            <span className="me-1"><FaPlus size={15}/></span>
             New Question
        </Link><br />

        <div className="mt-5">
            <Link href={`/courses/${cid}/quizzes/${qid}/editor`} onClick={onSave} className="float-end me-3 mb-5 btn btn-danger position-relative">
                Save
            </Link>
            <Link href={`/courses/${cid}/quizzes`} id="wd-group-btn"
            className="float-end me-3 mb-3 btn btn-secondary position-relative">
                Cancel
            </Link>
        </div>
      </div>
  );}
  