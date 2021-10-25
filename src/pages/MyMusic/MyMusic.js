import React, { useContext, useState } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import MusicContainer from "../../components/MusicContainer/MusicContainer";
import PlaylistModal from "../../components/Playlist/PlaylistModal";
import PublishMusicModal from "../../components/Playlist/PublishMusicModal";
import GlobalState from "../../contexts/GlobalState";

const MyMusic = ({ type }) => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [state, setState] = useContext(GlobalState);

  return (
    <Container fluid className="backgroundColour my-5 py-5">
      <Row className="my-5 py-5">
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
                seeAllLink={"my-published-one"}
                type={"song"}
              />
            ) : (
              ""
            )}

            {state.userPlaylist?.length ? (
              <MusicContainer
                title="My Playlists"
                items={state.userPlaylist}
                seeAllLink={"my-playlists"}
                type={type}
              />
            ) : (
              ""
            )}

            {state.userPlaylist?.length ? (
              <MusicContainer
                title="Favourite Playlists"
                items={state.userPlaylist}
                seeAllLink={"my-favourite-playlists"}
                type={type}
              />
            ) : (
              ""
            )}

            {state.userFavouriteSongs?.length ? (
              <MusicContainer
                title="Favourite Songs"
                items={state.userFavouriteSongs}
                seeAllLink={"my-favourite-songs"}
                type={"song"}
              />
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col
          xl={3}
          className={`blue sideImage ${
            state.fullscreen ? "d-none" : "d-none d-xl-block"
          }`}
        >
          <Image src="rhs_banner_v5.jpg" width={"100%"} height={"100%"} />
        </Col>
      </Row>
      <PlaylistModal
        show={showPlaylistModal}
        setShow={setShowPlaylistModal}
        type="CREATE"
      />
      <PublishMusicModal
        show={showPublishModal}
        setShow={setShowPublishModal}
      />
    </Container>
  );
};

export default MyMusic;
