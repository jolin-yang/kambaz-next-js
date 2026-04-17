import { Modal, Button } from "react-bootstrap";

export default function NoQuizDialog({ show, handleClose,}: {
 show: boolean; handleClose: () => void; }) {

 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
   </Modal.Header>
   <Modal.Body>
   There are no quizzes yet. Click the + Quiz button to add a quiz.
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
        Close
    </Button>
   </Modal.Footer>
  </Modal>
);}
