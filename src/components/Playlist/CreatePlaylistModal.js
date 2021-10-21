import React, { useContext, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import GlobalState from "../../contexts/GlobalState";

const CreatePlaylistModal = ({ show, setShow }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [state, setState] = useContext(GlobalState);

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      userPlaylist: [...state.userPlaylist, { title: playlistName, songs: [] }],
    }));
    setShow(false);
    setPlaylistName("");
  };

  return (
    <Modal
      centered
      show={show}
      onHide={() => {
        setShow(false);
        setPlaylistName("");
      }}
    >
      <Modal.Header>
        <p className="m-0 p-0">
          <span className="mr-3">
            <img alt="" src={""} width="36px" />
          </span>
          Create New Playlist
        </p>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => createPlaylistHandler(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Playlist Name</Form.Label>
            <Form.Control
              type="text"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
              placeholder="Playlist Name"
            />
          </Form.Group>
          <Button variant="secondary" disabled={!playlistName} type="submit">
            Create Playlist
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePlaylistModal;
