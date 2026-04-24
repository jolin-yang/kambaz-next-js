"use client";

import * as client from "./client";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import QuizDeleteDialog from "./QuizDeleteDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaBan, FaCheck, FaPencil, FaTrash } from "react-icons/fa6";
import { updateQuiz } from "./reducer";

export default function QuizSideButtons(
  { quizId, quizName, deleteQuiz }:
  { quizId: string, quizName: string; deleteQuiz: () => void; }) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
   const isFaculty = currentUser?.role !== "STUDENT";
   const [showMenu, setShowMenu] = useState(false);
   const { cid } = useParams();

   const quiz = useSelector((state: RootState) => state.quizzesReducer.quizzes.find(
    (q : any) => q._id === quizId)) as any;    
   const [isPublished, setIsPublished] = useState(quiz?.published);

   const dispatch = useDispatch();

   
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const togglePublishState = async () => {
        const updatedQuiz = {
          ...quiz, published: !isPublished
        };
        
        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));  
        setIsPublished(!isPublished);
        setShowMenu(false);
    };

    const handleDelete = () => {
        setShowMenu(false);
        deleteQuiz();
    };
  
  
   return (
    isFaculty && (    
    <div className="float-end">
  
      <span className="me-3">
        {isPublished ?
            <FaCheckCircle className="text-success fs-3" 
                onClick={() => togglePublishState()}/>
            :
            <FaBan className="text-danger fs-3"
                onClick={() => togglePublishState()}/>
        }
        </span>
    
      <IoEllipsisVertical className="fs-3" onClick={() => toggleMenu()} />
      <QuizDeleteDialog show={show} handleClose={handleClose} 
            quizName={quizName} deleteQuiz={handleDelete} />

        {showMenu && (
        <div className="bg-white border rounded-1 position-absolute ms-2 hover:bg-light z-3">
            <Link href={`/courses/${cid}/quizzes/${quizId}`} className="d-flex justify-content-center text-black fs-6">
                <FaPencil size={15} className="me-1  mt-1"/>
                Edit
            </Link>
            <div onClick={handleShow} 
                className="text-blue underline dropdown-item text-center text-black text-decoration-underline fs-6"
                style={{ cursor: "pointer" }}>
                <FaTrash size={15} className="me-1"/>
                Delete
            </div>
            <div onClick={() => togglePublishState()}
                className="text-blue underline dropdown-item text-center text-black text-primary text-decoration-underline fs-6"
                style={{ cursor: "pointer" }}>
                {isPublished ? 
                    <span>
                        <FaBan size={15} className="me-1"/> 
                        Unpublish
                    </span>
                : 
                    <span>
                        <FaCheck size={15} className="me-1"/> 
                        Publish
                    </span> 
                }
            </div>
        </div>
        )}
  
    </div> 
    )
  );
}