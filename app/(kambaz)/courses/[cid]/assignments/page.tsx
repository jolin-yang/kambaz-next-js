"use client"

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentSideButtons from "./AssignmentSideButtons";
import GreenAssignmentIcon from "./GreenAssignmentIcon";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();

  function convertAvailableFromDateToString(date: string) {
    if (!date) {
      return "";
    }
    if (date.includes("at")) {
      return date;
    }

    const d = new Date(date + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric" }) + " at 12:00am";
  }

  function convertDueDateToString(date: string) {
    if (!date) {
      return "";
    }
    if (date.includes("at")) {
      return date;
    }

    const d = new Date(date + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric" }) + " at 11:59pm";
  }

    return (
      <div className="pt-3">
        <AssignmentControls /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-assignments">
        <div className="wd-title fs-5 p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-1 fs-3" /> 
              <MdOutlineArrowDropDown className="me-0.5 fs-3" />
                <span className="fw-bold">ASSIGNMENTS</span> 
                <AssignmentControlButtons />
                <span className="rounded-5 border border-dark fs-6 float-end px-2 py-1"> 40% of Total </span>
        </div>
        {assignments
          .filter((assignment: any) => assignment.course == cid)
          .map((assignment: any) => (
            <ListGroupItem className="wd-module p-0 fs-5 border-0">
              <ListGroup className="wd-assignment rounded-0">
                <ListGroupItem className="wd-assignment p-3 ps-1">
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <BsGripVertical className="me-2 fs-3" /> 
                      <GreenAssignmentIcon/> 
                    </div>
                    <div className="me-5">
                      <div className="fw-bold">
                        <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                        className="text-dark text-decoration-none">
                        {assignment.title}
                        </Link>
                      </div>
                        <div className="fs-6">
                          <div>
                            <span className="text-danger"> Multiple Modules </span>
                              |
                            <span className="fw-bold"> Not available until </span>
                              {convertAvailableFromDateToString(assignment.available_date)} | 
                          </div>
                          <div>
                            <span className="fw-bold"> Due </span>
                            {convertDueDateToString(assignment.due_date)}     |     {assignment.points} pts
                          </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                      <AssignmentSideButtons
                      assignmentName={assignment.title}
                      deleteAssignment={() => dispatch(deleteAssignment(assignment._id))}/>
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          ))}
          </ListGroup>
      </div>
  );}
  

  