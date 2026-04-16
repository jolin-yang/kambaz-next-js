import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import AssignmentDeleteDialog from "../assignments/AssignmentDeleteDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function QuizSideButtons(
  { quizId, quizName, deleteQuiz }:
  { quizId: string, quizName: string; deleteQuiz: () => void; }) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
   const isFaculty = currentUser?.role !== "STUDENT";
   const [quizContextMenu, setQuizContextMenu] = useState<string | null>(null);

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
      {/* <AssignmentDeleteDialog show={show} handleClose={handleClose} 
            quizName={quizName} deleteQuiz={deleteQuiz} /> */}

        {quizContextMenu === quizId && (
        <div className="bg-white border rounded-1 position-absolute ms-4">
            <div>Edit</div>
            <div>Delete</div>
            <div>Publish</div>
        </div>
        )}
  
    </div> 
    )
  );
}