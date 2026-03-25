import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function AssignmentSideButtons(
  { assignmentName, deleteAssignment }:
  { assignmentName: string; deleteAssignment: () => void; }) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { currentUser } = useSelector((state: RootState) => state.accountReducer);
   const isFaculty = currentUser?.role !== "STUDENT";
  
  return (
    <div className="float-end">
      <span className="me-3">
            <FaCheckCircle className="text-success fs-3" />
          </span>

      {isFaculty && (    
      <FaTrash className="text-danger ms-1 me-3 fs-3" onClick={handleShow}/>
      )}

      <IoEllipsisVertical className="fs-3" />
      <AssignmentDeleteDialog show={show} handleClose={handleClose} 
      assignmentName={assignmentName} deleteAssignment={deleteAssignment} />
    </div> );}