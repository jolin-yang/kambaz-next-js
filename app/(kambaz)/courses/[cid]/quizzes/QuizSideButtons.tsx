import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import QuizDeleteDialog from "./QuizDeleteDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function QuizSideButtons(
  { quizId, quizName, deleteQuiz }:
  { quizId: string, quizName: string; deleteQuiz: () => void; }) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
   const isFaculty = currentUser?.role !== "STUDENT";
   const [quizContextMenu, setQuizContextMenu] = useState<string | null>(null);
   const { cid } = useParams();

   const openMenu = (quizId: string) => {
        setQuizContextMenu(quizId);
    };

    const closeMenu = () => {
        setQuizContextMenu(null);
    };

    const toggleMenu = (quizId: string) => {
        if (quizContextMenu === quizId) {
            closeMenu();
        } else {
            openMenu(quizId);
        }
    };
  
  
   return (
    isFaculty && (    
    <div className="float-end">
  
      <span className="me-3">
            <FaCheckCircle className="text-success fs-3" />
          </span>
    
      <IoEllipsisVertical className="fs-3" onClick={() => toggleMenu(quizId)} />
      <QuizDeleteDialog show={show} handleClose={handleClose} 
            quizName={quizName} deleteQuiz={deleteQuiz} />

        {quizContextMenu === quizId && (
        <div className="bg-white border rounded-1 position-absolute ms-4 hover:bg-light z-3">
            <Link href={`/courses/${cid}/quizzes/${quizId}`} className="d-flex justify-content-center text-black">
                {/* <FaPencil/>     */}
                Edit
            </Link>
            <div onClick={handleShow} 
                className="text-blue underline dropdown-item text-center text-black text-decoration-underline"
                style={{ cursor: "pointer" }}>
                {/* <FaTrash /> */}
                Delete
            </div>
            <Link href={`/courses/${cid}/quizzes`}
                className="text-blue underline dropdown-item text-center text-black text-primary text-decoration-underline"
                style={{ cursor: "pointer" }}>
                {/* <FaCheckCircle /> */}
                Publish
            </Link>
        </div>
        )}
  
    </div> 
    )
  );
}