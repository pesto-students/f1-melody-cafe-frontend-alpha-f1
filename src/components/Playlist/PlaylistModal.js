import React, { useContext, useEffect, useState } from "react";
import { Form, Modal, Button, Image } from "react-bootstrap";
import GlobalState from "../../contexts/GlobalState";
import AlbumArt from "../../assets/album_art_blank.jpg";
import API from "../../api/services/api";

const PlaylistModal = ({ show, setShow, type }) => {
  const api = new API();
  const [playlistName, setPlaylistName] = useState("");
  const [state, setState] = useContext(GlobalState);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    api.getPlaylists().then((data) => setUserPlaylist(data.data.row));
    // if (userPlaylist.length) {
    //   setState((state) => ({
    //     ...state,
    //     userPlaylist: [...state.userPlaylist, ...userPlaylist],
    //   }));
    // }
  }, []);

  const addToPlaylistHandler = (e, currentPlaylist) => {
    e.preventDefault();

    if (type === "ADD") {
      api.updatePlaylist(currentPlaylist.id, {
        ...currentPlaylist,
        track: [...currentPlaylist.track, state.currentSong],
      });
    } else {
      api.updatePlaylist(currentPlaylist.id, {
        ...currentPlaylist,
        track: [...currentPlaylist.track, ...state.queue],
      });
    }

    // setState((state) => ({
    //   ...state,
    //   userPlaylist: state.userPlaylist.map((playlist) =>
    //     playlist.name === currentPlaylist.name
    //       ? { ...playlist, track: [...playlist.track, state.currentSong] }
    //       : playlist
    //   ),
    // }));

    setShow(false);
    setPlaylistName("");
  };

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    // setState((state) => ({
    //   ...state,
    //   userPlaylist: [
    //     ...state.userPlaylist,
    //     { name: playlistName, track: [], slug: playlistName, src: null },
    //   ],
    // }));
    if (type === "ADD") {
      api
        .createPlaylist({
          name: playlistName,
          type: "userAlbum",
          userId: "e256a711-fc38-470d-8223-6cffd45ed3e1",
          track: [state.currentSong],
        })
        .then((data) => setIsUpdated(true));
    } else if (type === "QUEUE") {
      api
        .createPlaylist({
          name: playlistName,
          type: "userAlbum",
          userId: "e256a711-fc38-470d-8223-6cffd45ed3e1",
          track: [...state.queue],
        })
        .then((data) => setIsUpdated(true));
    } else {
      api
        .createPlaylist({
          name: playlistName,
          type: "userAlbum",
          userId: "e256a711-fc38-470d-8223-6cffd45ed3e1",
          track: null,
        })
        .then((data) => setIsUpdated(true));
    }

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
      scrollable={true}
      contentClassName="bg-light text-dark"
    >
      <Modal.Header className="border-secondary">
        <div className="m-0 p-0">
          {/* <span className="mr-3">
            <img alt="" src={""} width="36px" />
          </span> */}
          {type === "ADD" || type === "QUEUE" ? (
            <>
              <h3>Add to Playlist</h3>
              <h5>Existing Playlists</h5>
            </>
          ) : (
            <h3>Create New Playlist</h3>
          )}
        </div>
      </Modal.Header>
      {type === "ADD" || type === "QUEUE" ? (
        <Modal.Body className="mt-0 pt-0" style={{ maxHeight: "250px" }}>
          {userPlaylist?.length || state.userPlaylist?.length ? (
            userPlaylist.map((playlist) => (
              <div
                className="d-flex border-bottom align-items-center py-3"
                onClick={(e) => addToPlaylistHandler(e, playlist)}
              >
                <Image
                  src={playlist.src ? playlist.src : AlbumArt}
                  width="50px"
                  height="50px"
                  rounded
                />
                <p className="ms-3">{playlist.name}</p>
              </div>
            ))
          ) : (
            <div className="d-flex border-bottom align-items-center py-3">
              No playlists yet
            </div>
          )}
        </Modal.Body>
      ) : (
        ""
      )}
      <Modal.Footer className="d-block border-0 pt-2 mt-0">
        <Form onSubmit={(e) => createPlaylistHandler(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="mb-2 pb-2">
              {type === "ADD" ? "Create New Playlist" : "Enter Playlist Name"}
            </Form.Label>
            <Form.Control
              className="mb-4 pb-1"
              type="text"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
              placeholder={
                type === "ADD" || type === "QUEUE"
                  ? "Enter name of new playlist "
                  : "Playlist Name"
              }
            />
          </Form.Group>

          <Button
            className="w-100"
            variant="dark"
            disabled={!playlistName}
            type="submit"
          >
            Create Playlist
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default PlaylistModal;
