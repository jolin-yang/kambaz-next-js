"use client"

import { FormLabel, FormControl, Form, Col, Row, FormSelect, FormCheck, Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid } = useParams();

    return (
      <div className="px-5 pt-3">
        <div className="px-5">
        <Form>
          <FormLabel>Assignment Name</FormLabel>
          <FormControl/><br />
          <FormControl as="textarea" rows={8} /><br />
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Points </FormLabel>
            <Col sm={10}>
                <FormControl type="number" defaultValue="100" />
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Assignment Group </FormLabel>
            <Col sm={10}>
                <FormSelect>
                  <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
                  <option value="EXAMS">EXAMS</option>
                </FormSelect>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Display Grade as </FormLabel>
            <Col sm={10}>
                <FormSelect>
                  <option value="Percentage" defaultChecked>Percentage</option>
                  <option value="Points">Points</option>
                </FormSelect>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Submission Type </FormLabel>
            <Col sm={10}>
              <div className="border rounded p-3 w-100">
                <FormSelect className="mb-4">
                  <option value="Online" defaultChecked>Online</option>
                  <option value="In Person">In Person</option>
                </FormSelect>
                <div className="mb-4 fw-bold">
                  Online Entry Options
                </div>
                <div>
                  <FormCheck className="mb-4" id="text-entry" type="checkbox" label="Text Entry"/>
                  <FormCheck className="mb-4" id="url" type="checkbox" label="Website URL" defaultChecked/>
                  <FormCheck className="mb-4" id="media" type="checkbox" label="Media Recordings"/>                  
                  <FormCheck className="mb-4" id="annotation" type="checkbox" label="Student Annotation"/>
                  <FormCheck className="mb-3" id="file" type="checkbox" label="File Uploads"/>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Assign </FormLabel>
            <Col sm={10}>
              <div className="border rounded p-3 w-100">
                <FormLabel className="fw-bold">Assign to</FormLabel>
                <FormSelect className="mb-3">
                  <option value="Everyone" defaultChecked>Everyone</option>
                </FormSelect>
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl type="date"
                  defaultValue="2024-05-13"
                  className="mb-3">
                </FormControl>
                <Row className="mb-3">
                  <Col>
                    <FormLabel className="fw-bold">Available from</FormLabel>
                    <FormControl type="date"
                      defaultValue="2024-05-06">
                    </FormControl>
                  </Col>
                  <Col>
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <FormControl type="date"></FormControl>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
        <hr className="mt-5" />
        <div>
          <Link href={`/courses/${cid}/assignments`} id="wd-group-btn" 
          className="float-end me-2 mb-3 btn btn-danger position-relative">
                  Save</Link>
          <Link href={`/courses/${cid}/assignments`} id="wd-group-btn"
          className="float-end me-2 mb-3 btn btn-secondary position-relative">
                  Cancel</Link>
        </div>
      </div>
    </div>
  );}
  