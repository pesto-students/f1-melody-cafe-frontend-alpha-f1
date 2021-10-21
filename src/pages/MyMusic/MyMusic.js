import React, { useContext, useState } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import MusicContainer from "../../components/MusicContainer/MusicContainer";
import CreatePlaylistModal from "../../components/Playlist/CreatePlaylistModal";
import PublishMusicModal from "../../components/Playlist/PublishMusicModal";
import GlobalState from "../../contexts/GlobalState";

const MyMusic = () => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [state, setState] = useContext(GlobalState);

  return (
    <Container fluid className="backgroundColour">
      <Row className="content mt-5 pt-5">
        <Col lg={12} xl={9}>
          <div>
            <Button
              className="d-inline-block mt-5 mb-3 mx-4"
              variant="outline-secondary"
              onClick={() => {
                setShowPlaylistModal(true);
              }}
            >
              Create New Playlist
            </Button>

            <Button
              className="d-inline-block mt-0 mb-5 ml-5"
              variant="outline-secondary"
              onClick={() => {
                setShowPublishModal(true);
              }}
            >
              Publish Your Music
            </Button>
            {state.userPublish?.length ? (
              <MusicContainer
                title="My Published Ones"
                items={state.userPublish}
              />
            ) : (
              ""
            )}

            {state.userPlaylist?.length ? (
              <MusicContainer title="My Playlists" items={state.userPlaylist} />
            ) : (
              ""
            )}

            {state.userPlaylist?.length ? (
              <MusicContainer
                title="Favourite Playlists"
                items={state.userPlaylist}
              />
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col xl={3} className="d-none d-xl-block blue sideImage">
          <Image src="rhs_banner_v5.jpg" width={"100%"} height={"100%"} />
        </Col>
      </Row>
      <CreatePlaylistModal
        show={showPlaylistModal}
        setShow={setShowPlaylistModal}
      />
      <PublishMusicModal
        show={showPublishModal}
        setShow={setShowPublishModal}
      />
    </Container>
  );
};

export default MyMusic;
