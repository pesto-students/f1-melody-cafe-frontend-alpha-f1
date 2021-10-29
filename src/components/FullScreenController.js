import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import API from "../api/services/api";
import GlobalState from "../contexts/GlobalState";
import PlaylistModal from "./Playlist/PlaylistModal";
import RefactorSongList from "./SongList/RefactorSongList";
import SongList from "./SongList/SongList";

const FullScreenController = ({ show, setShow }) => {
  const [state, setState] = useContext(GlobalState);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const addToPlaylistHandler = (e) => {
    e.preventDefault();
    setShowPlaylist((state) => !state);
  };

  const clearQueueHandler = (e) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      currentSong: null,
      queue: [],
      originalQueue: [],
    }));
  };

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
            <Button
              onClick={(e) => addToPlaylistHandler(e)}
              className="ms-3 mb-2"
              variant="light"
              size="md"
            >
              Save as Playlist
            </Button>
            <Button
              onClick={(e) => clearQueueHandler(e)}
              className="ms-3 mb-2"
              variant="outline-light"
              size="md"
            >
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
      <PlaylistModal
        show={showPlaylist}
        setShow={setShowPlaylist}
        type="QUEUE"
      />
    </div>
  );
};

export default FullScreenController;
