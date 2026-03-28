"use client"

import * as client from "../../../client";
import { addAssignment, updateAssignment } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { useParams } from "next/navigation";
import { useState } from 'react';
import { FormLabel, FormControl, Form, Col, Row, FormSelect, FormCheck } from "react-bootstrap";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = useSelector((state: RootState) => state.assignmentsReducer.assignments.find(
    (a : any) => a._id === aid)) as any;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role !== "STUDENT";
  const isStudent = !isFaculty;


  const properAvailableDateFormat = assignment?.available_date ? 
    assignment.available_date.includes("at") ?
      new Date(assignment.available_date.split(" at")[0] + " 2026").toISOString().slice(0, 10) 
      : assignment.available_date
    : "";
  const properDueDateFormat = assignment?.due_date ?
    assignment.due_date.includes("at") ?
      new Date(assignment.due_date.split(" at")[0] + " 2026").toISOString().slice(0, 10) 
      : assignment.due_date
    : "";


  const [title, setTitle] = useState(assignment?.title || "");
  const [description, setDescription] = useState(assignment?.description || "");
  const [points, setPoints] = useState(assignment?.points || 100);
  const [availableFromDate, setAvailableFromDate] = useState(properAvailableDateFormat);
  const [dueDate, setDueDate] = useState(properDueDateFormat);
  const [availableUntilDate, setAvailableUntilDate] = useState((assignment as any)?.until_date || "");

  const onSave = async () => {
    if (aid === "new") {
      const newAssignment = await client.createAssignmentForCourse(cid as string, 
        { title, course: cid, description, points, due_date: dueDate, available_date: availableFromDate, until_date: availableUntilDate }
      );
      dispatch(addAssignment(newAssignment));
    } 
    else {
      const updatedAssignment = { _id: aid, title, course: cid, description, points, due_date: dueDate, available_date: availableFromDate, until_date: availableUntilDate };
      await client.updateAssignment(updatedAssignment);
      dispatch(updateAssignment(updatedAssignment));
    }
  }

    return (
      <div className="px-5 pt-3">
        <div className="px-5">
        <Form>
          <FormLabel>Assignment Name</FormLabel>
          <FormControl readOnly={isStudent} defaultValue={title} onChange={(e) => setTitle(e.target.value)}/><br />
          <FormControl readOnly={isStudent} as="textarea" rows={8} defaultValue={description} onChange={(e) => setDescription(e.target.value)}/><br />
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Points </FormLabel>
            <Col sm={10}>
                <FormControl readOnly={isStudent} type="number" defaultValue={points} onChange={(e) => setPoints(Number(e.target.value))}/>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Assignment Group </FormLabel>
            <Col sm={10}>
                <FormSelect disabled={isStudent}>
                  <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
                  <option value="EXAMS">EXAMS</option>
                </FormSelect>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Display Grade as </FormLabel>
            <Col sm={10}>
                <FormSelect disabled={isStudent}>
                  <option value="Percentage" defaultChecked>Percentage</option>
                  <option value="Points">Points</option>
                </FormSelect>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Submission Type </FormLabel>
            <Col sm={10}>
              <div className="border rounded p-3 w-100">
                <FormSelect disabled={isStudent} className="mb-4">
                  <option value="Online" defaultChecked>Online</option>
                  <option value="In Person">In Person</option>
                </FormSelect>
                <div className="mb-4 fw-bold">
                  Online Entry Options
                </div>
                <div>
                  <FormCheck disabled={isStudent} className="mb-4" id="text-entry" type="checkbox" label="Text Entry"/>
                  <FormCheck disabled={isStudent} className="mb-4" id="url" type="checkbox" label="Website URL" defaultChecked/>
                  <FormCheck disabled={isStudent} className="mb-4" id="media" type="checkbox" label="Media Recordings"/>                  
                  <FormCheck disabled={isStudent} className="mb-4" id="annotation" type="checkbox" label="Student Annotation"/>
                  <FormCheck disabled={isStudent} className="mb-3" id="file" type="checkbox" label="File Uploads"/>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Assign </FormLabel>
            <Col sm={10}>
              <div className="border rounded p-3 w-100">
                <FormLabel className="fw-bold">Assign to</FormLabel>
                <FormSelect className="mb-3" disabled={isStudent}>
                  <option value=""></option>
                  <option value="Everyone">Everyone</option>
                </FormSelect>
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl readOnly={isStudent} type="date"
                  defaultValue={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mb-3">
                </FormControl>
                <Row className="mb-3">
                  <Col>
                    <FormLabel className="fw-bold">Available from</FormLabel>
                    <FormControl readOnly={isStudent} type="date"
                      defaultValue={availableFromDate}
                      onChange={(e) => setAvailableFromDate(e.target.value)}>
                    </FormControl>
                  </Col>
                  <Col>
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <FormControl readOnly={isStudent} type="date"
                      defaultValue={availableUntilDate}
                      onChange={(e) => setAvailableUntilDate(e.target.value)}>
                    </FormControl>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
        <hr className="mt-5" />
        <div>
          {isFaculty && (
            <Link href={`/courses/${cid}/assignments`} onClick={onSave} className="float-end me-2 mb-3 btn btn-danger position-relative">
              Save
            </Link>
          )}
          <Link href={`/courses/${cid}/assignments`} id="wd-group-btn"
          className="float-end me-2 mb-3 btn btn-secondary position-relative">
                  Cancel
          </Link>
        </div>
      </div>
    </div>
  );}
  