import React, { useContext, useState } from "react";
import { Breadcrumb, Container, Row, Col, Image, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import MusicDetail from "../../components/MusicDetail/MusicDetail";
import SongList from "../../components/SongList/SongList";
import GlobalState from "../../contexts/GlobalState";
// import "./FilteredSection.scss";

const FilteredDetails = ({ title, location }) => {
  let data = location?.state?.songData || location?.state?.playlistData;
  const showPage = useSelector((state) => state.playlists.showPage);
  const [state, setState] = useContext(GlobalState);

  const [savedSongs, setSavedSongs] = useState({});
  const [items, setItems] = useState({});

  const saveSong = (song) => {
    setSavedSongs((state) => [...state.savedSongs, song]);
  };

  const removeSong = (index) => {
    let array = savedSongs;
    array.splice(index, 1);
    setSavedSongs(array);
  };

  return (
    <Container fluid className="space-top2 backgroundColour detail_wrap">
      <Row>
        <Col xs={12} md={12} xl={9}>
          <Breadcrumbs />
          <h1 className="text-left">
            {data?.snippet?.title?.slice(0, 70)
              ? data?.snippet?.title?.slice(0, 70) + " ..."
              : title}
          </h1>
          <MusicDetail data={data} />
          <SongList
            playlistId={showPage}
            what={() => ({})}
            user={null}
            items={items}
            savedSongs={savedSongs}
            saveSong={saveSong}
            removeSong={removeSong}
          />
        </Col>
        <Col
          xl={3}
          className={`blue sideImage ${
            state.fullscreen ? "d-none" : "d-none d-xl-block"
          }`}
        >
          <Image
            src="http://localhost:3000/rhs_banner_v5.jpg"
            width={"100%"}
            height={"100%"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FilteredDetails;
