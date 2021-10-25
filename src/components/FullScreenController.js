import React from "react";
import { Modal, Button } from "react-bootstrap";
import RefactorSongList from "./SongList/RefactorSongList";
import SongList from "./SongList/SongList";

const FullScreenController = ({ show, setShow }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen={true}
        contentClassName="bg-dark text-white"
        scrollable
      >
        <Modal.Header
          className="border-bottom-0"
          closeButton={() => setShow(false)}
        ></Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap align-items-center justify-content-end mx-5 px-5">
            <Modal.Title>
              <h3>Queue</h3>
            </Modal.Title>
            <Button className="py-2 px-5 mx-4" variant="light" size="lg">
              Lightdd
            </Button>
            <Button className="py-2 px-5" variant="outline-light" size="lg">
              Light
            </Button>
          </div>
          <RefactorSongList
            // playlistId={"charts"}
            // what={() => ({})}
            user={null}
            renderQueue={true}
            // items={{}}
            // savedSongs={[]}
            // saveSong={() => null}
            // removeSong={() => null}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FullScreenController;
