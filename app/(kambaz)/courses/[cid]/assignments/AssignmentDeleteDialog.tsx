import { Modal, Button } from "react-bootstrap";

export default function AssignmentDeleteDialog({ show, handleClose, assignmentName, deleteAssignment,}: {
 show: boolean; handleClose: () => void; assignmentName: string;
 deleteAssignment: () => void; }) {

 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
   </Modal.Header>
   <Modal.Body>
    Are you sure you want to remove {assignmentName}?
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="danger"
     onClick={() => {
      deleteAssignment();
      handleClose();
     }} > Yes </Button>
   </Modal.Footer>
  </Modal>
);}
