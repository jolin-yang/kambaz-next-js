import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentSideButtons from "./AssignmentSideButtons";
import GreenAssignmentIcon from "./GreenAssignmentIcon";


export default function Assignments() {
    return (
      <div className="pt-3">
        <AssignmentControls /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-assignments">
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-1 fs-3" /> 
              <MdOutlineArrowDropDown className="me-0.5 fs-3" />
                <span className="fw-bold">ASSIGNMENTS</span> 
                <AssignmentControlButtons />
                <span className="rounded-5 border border-dark fs-6 float-end px-2 py-1"> 40% of Total </span>
              </div>
              <ListGroup className="wd-assignment rounded-0">
                <ListGroupItem className="wd-assignment p-3 ps-1">
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <BsGripVertical className="me-2 fs-3" /> 
                      <GreenAssignmentIcon/> 
                    </div>
                    <div className="me-5">
                      <div className="fw-bold">
                        <Link href="/courses/1234/assignments/123"
                        className="text-dark text-decoration-none">
                        A1
                        </Link>
                      </div>
                        <div className="fs-6">
                          <div>
                            <span className="text-danger"> Multiple Modules </span>
                              |
                            <span className="fw-bold"> Not available until </span>
                              May 6 at 12:00am | 
                          </div>
                          <div>
                            <span className="fw-bold"> Due </span>
                              May 13 at 11:59pm     |     100 pts
                          </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                      <AssignmentSideButtons />
                    </div>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="wd-assignment p-3 ps-1">
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <BsGripVertical className="me-2 fs-3" /> 
                      <GreenAssignmentIcon/> 
                    </div>
                    <div className="me-5">
                      <div className="fw-bold">
                          <Link href="/courses/1234/assignments/123"
                          className="text-dark text-decoration-none">
                          A2
                          </Link>
                      </div>
                        <div className="fs-6">
                          <div>
                            <span className="text-danger"> Multiple Modules </span>
                              |
                            <span className="fw-bold"> Not available until </span>
                              May 13 at 12:00am | 
                          </div>
                          <div>
                            <span className="fw-bold"> Due </span>
                              May 20 at 11:59pm     |     100 pts
                          </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                      <AssignmentSideButtons />
                    </div>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="wd-assignment p-3 ps-1">
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <BsGripVertical className="me-2 fs-3" /> 
                      <GreenAssignmentIcon/> 
                    </div>
                    <div className="me-5">
                      <div className="fw-bold">
                          <Link href="/courses/1234/assignments/123"
                          className="text-dark text-decoration-none">
                          A3
                          </Link>
                        </div>
                        <div className="fs-6">
                          <div>
                            <span className="text-danger"> Multiple Modules </span>
                              |
                            <span className="fw-bold"> Not available until </span>
                              May 20 at 12:00am | 
                          </div>
                          <div>
                            <span className="fw-bold"> Due </span>
                              May 27 at 11:59pm     |     100 pts
                          </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                      <AssignmentSideButtons />
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
      </div>
  );}
  
  
  