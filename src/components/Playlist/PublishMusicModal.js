import React, { useContext, useReducer, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import GlobalState from "../../contexts/GlobalState";
import formReducer from "../../entities/form-reducer";

const initialFormState = {
  title: "",
  thumbnail: null,
  fileSrc: null,
};

const PublishMusicModal = ({ show, setShow }) => {
  const [state, setState] = useContext(GlobalState);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [validated, setValidated] = useState(false);

  const publishSongHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setState((state) => ({
      ...state,
      userPublish: [
        ...state.userPublish,
        {
          title: formState.title,
          thumbnail: formState.thumbnail,
          fileSrc: formState.fileSrc,
        },
      ],
    }));
    setShow(false);
    setValidated(true);
  };

  const handleTextChange = (e) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <Modal
      centered
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header>
        <p className="m-0 p-0">
          <span className="mr-3">
            <img alt="" src={""} width="36px" />
          </span>
          Publish Your Title
        </p>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => publishSongHandler(e)}
        >
          <Form.Group controlId="validationCustom01">
            <Form.Label>Song Title</Form.Label>
            <Form.Control
              value={formReducer.title}
              onChange={(e) => handleTextChange(e)}
              required
              type="text"
              placeholder="Song Title"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Upload Thumbnail</Form.Label>
            <Form.Control
              type="file"
              value={formReducer.thumbnail}
              onChange={(e) => handleTextChange(e)}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              Please upload a thumbnail
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFileSm2" className="mb-3">
            <Form.Label>Upload Media</Form.Label>
            <Form.Control
              type="file"
              value={formReducer.fileSrc}
              onChange={(e) => handleTextChange(e)}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              Please upload a file
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" type="submit">
            Publish My Music
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PublishMusicModal;
