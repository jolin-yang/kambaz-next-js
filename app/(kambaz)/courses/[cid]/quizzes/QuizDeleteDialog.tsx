import { Modal, Button } from "react-bootstrap";

export default function AssignmentDeleteDialog({ show, handleClose, quizName, deleteQuiz,}: {
 show: boolean; handleClose: () => void; quizName: string;
 deleteQuiz: () => void; }) {

 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
   </Modal.Header>
   <Modal.Body>
    Are you sure you want to remove {quizName}?
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="danger"
     onClick={() => {
      deleteQuiz();
      handleClose();
     }} > Yes </Button>
   </Modal.Footer>
  </Modal>
);}
