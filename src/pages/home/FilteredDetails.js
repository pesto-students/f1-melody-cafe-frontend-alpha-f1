import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import MusicDetail from "../../components/MusicDetail/MusicDetail";
import RefactorSongList from "../../components/SongList/RefactorSongList";
import SongList from "../../components/SongList/SongList";
import GlobalState from "../../contexts/GlobalState";
import SideImage from "../../assets/rhs_banner_v5.jpg";
import RowLayout from "../../components/RowLayout/RowLayout";
import API from "../../api/services/api";
// import "./FilteredSection.scss";

const FilteredDetails = ({ title, location }) => {
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
  let data = null;
  data = location?.state?.songData || location?.state?.playlistData;
  useEffect(() => {
    let isPlaylist = data?.id?.kind === "youtube#playlist" ? true : false;
    if (isPlaylist) {
      const api = new API();
      const getPlaylistItems = async () => {
        try {
          const res = await api.getPlaylistItems(data?.id?.playlistId);
          //console.log(res);
          return res?.data?.items;
        } catch (err) {
          console.log(err);
        }
      };

      getPlaylistItems().then((data) => {
        //console.log(data);
        setItems(data);
      });
    }
  }, [data]);
  console.log(data);

  return (
    <Container
      fluid
      className="space-top2 backgroundColour detail_wrap my-5 py-5"
    >
      <Row>
        <Col xs={12} md={12} xl={10}>
          <Breadcrumbs />
          {/* <h1 className="text-left">
            {data?.snippet?.title?.slice(0, 70)
              ? data?.snippet?.title?.slice(0, 70) + " ..."
              : title}
          </h1> */}
          {data ? (
            <>
              <MusicDetail data={data} />
              <RefactorSongList
                // playlistId={"charts"}
                // what={() => ({})}
                user={null}
                renderQueue={false}
                songs={items}
                // items={{}}
                // savedSongs={[]}
                // saveSong={() => null}
                // removeSong={() => null}
              />
              {/* <RowLayout
                header="Similar Type"
                type="song"
                items={null}
                cols={4}
              />
              <RowLayout
                header="More From Artist"
                items={null}
                cols={4}
                type="song"
              />
              <RowLayout
                header="Type(Album/Songs) Artists"
                items={null}
                cols={4}
                type="song"
                isRounded={true}
              /> */}

              <div className="py-3 px-4 mt-4 mb-2 mx-3 d-flex-column flex-wrap text-start">
                <h5>About {data?.snippet?.title}</h5>
                <p>{data?.snippet?.description}</p>
                <h6>
                  Released On:
                  {new Date(data?.snippet?.publishedAt).toDateString()}
                </h6>
                <h6>Duration: </h6>
                <h6>Language:</h6>
                <p>Label Name</p>
              </div>
            </>
          ) : (
            <div>...Loading</div>
          )}
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
    </Container>
  );
};

export default FilteredDetails;
