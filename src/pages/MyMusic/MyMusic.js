import React, { useContext, useEffect, useState } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import API from "../../api/services/api";
import MusicContainer from "../../components/MusicContainer/MusicContainer";
import PlaylistModal from "../../components/Playlist/PlaylistModal";
import PublishMusicModal from "../../components/Playlist/PublishMusicModal";
import GlobalState from "../../contexts/GlobalState";
import SideImage from "../../assets/rhs_banner_v5.jpg";

const MyMusic = ({ type }) => {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [state, setState] = useContext(GlobalState);

  let api = new API();

  useEffect(() => {
    api.getPlaylists().then((data) => setUserPlaylist(data.data.rows));
    // if (userPlaylist.length) {
    //   setState((state) => ({
    //     ...state,
    //     userPlaylist: [...state.userPlaylist, ...userPlaylist],
    //   }));
    // }
  }, []);

  return (
    <Container fluid className="backgroundColour my-5 py-5">
      <Row className="my-5 py-5 h-100">
        <Col lg={12} xl={10}>
          <div className="h-100">
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
                isMyMusic={true}
              />
            ) : (
              ""
            )}

            {state.userPlaylist?.length || userPlaylist.length ? (
              <MusicContainer
                title="My Playlists"
                items={userPlaylist || state.userPlaylist}
                seeAllLink={"my-playlists"}
                type={type}
                isMyMusic={true}
              />
            ) : (
              ""
            )}

            {state.userPlaylist?.length || userPlaylist.length ? (
              <MusicContainer
                title="Favourite Playlists"
                items={userPlaylist || state.userPlaylist}
                seeAllLink={"my-favourite-playlists"}
                type={type}
                isMyMusic={true}
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
                isMyMusic={true}
              />
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col
          xl={2}
          className={`blue sideImage ${
            state.fullscreen ? "d-none" : "d-none d-xl-block"
          }`}
        >
          <Image src={SideImage} width={"100%"} height={"100%"} />
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
