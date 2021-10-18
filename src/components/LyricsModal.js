import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import GeniusLogo from "../assets/genius-logo.jpg";
// import { getSongLyrics } from "../api/manager";

const LyricsModal = (props) => {
  const [lyrics, setLyrics] = useState(null);

  const callGetSongLyrics = () => {
    setLyrics(props.song.lyrics);
    if (props.song.lyrics === "") {
      setLyrics("Fetching song lyrics, please wait ...");
      //   getSongLyrics(props.song.id).then((response) => {
      //     if (response.status === 200) {
      //       const songLyrics = response.data.result;
      //       songLyrics !== null
      //         ? setLyrics(songLyrics)
      //         : setLyrics("Song lyrics unavailable.");
      //       props.song.lyrics = songLyrics;
      //     } else {
      //       setLyrics("Song lyrics unavailable. Please try later.");
      //     }
      //   });
    }
  };

  useEffect(() => {
    callGetSongLyrics();
  }, [props.song]);

  return (
    <Modal
      centered
      show={props.showLyrics}
      onHide={() => props.setShowLyrics(false)}
    >
      <Modal.Header closeButton>
        <p className="m-0 p-0">
          <span className="mr-3">
            <img alt="" src={GeniusLogo} width="36px" />
          </span>
          Lyrics powered by Genius
        </p>
      </Modal.Header>
      <Modal.Body className="lyric-body">{lyrics}</Modal.Body>
    </Modal>
  );
};

export default LyricsModal;
