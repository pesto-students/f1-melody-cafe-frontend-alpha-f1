import React from "react";
import { Modal } from "react-bootstrap";

const FullScreenController = ({ show, setShow }) => {
  //onHide={() => setShow(false)}
  return (
    <div>
      <Modal show={show} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    </div>
  );
};

export default FullScreenController;
