import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Model = (props) => {
  return (
    <>
      <Modal show={true} onHide={props.closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeHandler}>
            Close
          </Button>
          <Button variant="danger" onClick={props.submitHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Model;
