import { FormLabel, FormControl, Container, Form, Col, Row, Dropdown, FormSelect, FormCheck, InputGroup, Button } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";

export default function AssignmentEditor() {
    return (
      <div className="px-5 pt-3">
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
              <Container className="border p-3">
                <FormSelect className="mb-4">
                  <option value="Online" defaultChecked>Online</option>
                  <option value="In Person">In Person</option>
                </FormSelect>
                <div className="mb-4 fw-bold">
                  Online Entry Options
                </div>
                <div>
                  <FormCheck className="mb-4" type="checkbox" label="Text Entry"/>
                  <FormCheck className="mb-4"type="checkbox" label="Website URL"/>
                  <FormCheck className="mb-4"type="checkbox" label="Media Recordings"/>                  
                  <FormCheck className="mb-4"type="checkbox" label="Student Annotation"/>
                  <FormCheck className="mb-3"type="checkbox" label="File Uploads"/>
                </div>
              </Container>
            </Col>
          </Row>
          <Row className="mb-4 ms-5">
            <FormLabel column sm={2} className="text-end"> Assign </FormLabel>
            <Col sm={10}>
              <Container className="border p-3">
                <FormLabel className="fw-bold">Assign to</FormLabel>
                <FormSelect className="mb-3">
                  <option value="Everyone" defaultChecked>Everyone</option>
                </FormSelect>
                <FormLabel className="fw-bold">Due</FormLabel>
                <InputGroup className="mb-3">
                  <FormControl placeholder="May 13, 2024, 11:59 PM"/>
                  <InputGroupText><MdOutlineCalendarMonth /></InputGroupText>
                </InputGroup>
                <Row className="mb-3">
                  <Col>
                    <FormLabel className="fw-bold">Available from</FormLabel>
                    <InputGroup>
                      <FormControl type="text" defaultValue="May 6, 2024, 12:00 AM"/>
                      <InputGroupText><MdOutlineCalendarMonth /></InputGroupText>
                    </InputGroup>
                  </Col>
                  <Col>
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <InputGroup>
                      <FormControl type="text" />
                      <InputGroupText><MdOutlineCalendarMonth /></InputGroupText>
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Form>
        <br />
        <hr />
        <Button variant="danger" id="wd-assignment-btn" className="float-end">
            <div className="position-relative me-2" style={{ bottom: "1px" }} />
                Save</Button>
        <Button variant="secondary" id="wd-group-btn" className="float-end me-2">
            <div className="position-relative me-2" style={{ bottom: "1px" }} />
                Cancel</Button>
      </div>
  );}
  
  