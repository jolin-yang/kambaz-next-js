import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule }: { 
    moduleId: string; 
    deleteModule: (moduleId: string) => void; 
    editModule: (moduleId: string) => void }) {

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role !== "STUDENT";
  
  return (
    <div className="float-end">
      
      {isFaculty && (
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      )} 
      {isFaculty && (
      <FaTrash className="text-danger me-3 mb-1" onClick={() => deleteModule(moduleId)}/>
      )} 
      
      <GreenCheckmark />
      <BsPlus className="fs-2"/>
      <IoEllipsisVertical className="fs-4" />
    </div> );}

