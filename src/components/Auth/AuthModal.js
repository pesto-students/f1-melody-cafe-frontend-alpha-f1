import React from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import AuthImage from "../../assets/7566.jpg";
import Logo from "../../assets/TheMelodyCafeLogo.gif";

const AuthModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Image src={Logo} width="100px" height="50px" />
        <h1>Login/Signup </h1>
        <p>Get a personalized experience, and access all your music</p>
        <Row className="landing">
          <Col>
            <Form style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }}>
              <Form.Group>
                <Form.Label>Enter your email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter your password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>

          <Col>
            <div>
              <Image src={AuthImage} thumbnail style={{ border: "none" }} />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AuthModal;
