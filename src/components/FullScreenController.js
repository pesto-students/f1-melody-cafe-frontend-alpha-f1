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
          <div className="d-flex flex-wrap flex-column align-items-end flex-md-row align-items-md-end justify-content-md-end">
            <Modal.Title className="">
              <h4>Queue</h4>
            </Modal.Title>
            <Button className="ms-3 mb-2" variant="light" size="md">
              Add to Queue
            </Button>
            <Button className="ms-3 mb-2" variant="outline-light" size="md">
              Clear Queue
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
