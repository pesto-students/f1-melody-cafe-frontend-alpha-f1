import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";

import { Col, Container, Row, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./Home.scss";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import RowLayout from "../../components/RowLayout/RowLayout";
import GlobalState from "../../contexts/GlobalState";
import API from "../../api/services/api";
// make a permanent playlist object with few songs catergory
const playlistsIds = {
  LatestSongs: "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
  RomanticSongs: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy",
  BestOfEdSheeran: "PLH583WMsSz85HljEkmsdJeF4-OWjwg6By",
  EdmSongs: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5",
  TopBolloywood: "PLcRN7uK9CFpPkvCc-08tWOQo6PAg4u0lA",
  TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
  Reggaeton: "PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN",
};

let slowConnectionTimeout;

const Home = () => {
  const Api = new API();
  const [state, setState] = useContext(GlobalState);
  const [songObj, setSongObj] = useState({});
  const playlistList = useSelector((state) => state.playlistList);
  const showPage = useSelector((state) => state.playlists.showPage);

  const fetchFromApi = () => {
    slowConnectionTimeout = setTimeout(() => {}, 5000);

    const getTrendingMusic = async () => {
      const res = await Api.getSongs('trending')
      return res.data;
    };

    const getPlayListItems = async (data) => {
      const res = await Api.getSongs("playlist",data);
      return res.data;
    };

    getTrendingMusic().then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ trending: data } };
      });
    });

    getPlayListItems(playlistsIds.LatestSongs).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ latestSongs: data } };
      });
    });

    getPlayListItems(playlistsIds.RomanticSongs).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ romanticSongs: data } };
      });
    });

    getPlayListItems(playlistsIds.TopBolloywood).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ topBolloywood: data } };
      });
    });

    getPlayListItems(playlistsIds.BestOfEdSheeran).then((data) => {
      setSongObj((prevState) => {
        return { ...prevState, ...{ edSheeran: data } };
      });
    });
  };

  useEffect(() => {
    const startingTime = new Date();
    const storedTime = localStorage.getItem("trackTime");
    const savedSongs = JSON.parse(localStorage.getItem("homePageSongObj"));

    if (!window.navigator.onLine) {
      alert("You don't have internet!");
    }

    const checkTimeAndFetch = () => {
      const timeElapsed = new Date() - Date.parse(storedTime); //parse the date

      const timeElapsedInHr = timeElapsed / (1000 * 60 * 60); //convert ms into hr

      // if time is more than 12 hr we will fetch from the api

      // console.log("Saved song", savedSongs);
      if (timeElapsedInHr > 12 || !savedSongs.latestSongs) {
        fetchFromApi();
        localStorage.setItem("trackTime", startingTime); //dont forgot to update the time
      } else {
        setSongObj(savedSongs);
      }
    };

    if (!storedTime) {
      // if no time stored we will store it
      localStorage.setItem("trackTime", startingTime);
      fetchFromApi();
    } else {
      checkTimeAndFetch();
    }
  }, []);

  // if song object changes we will push it to localstoarge
  useEffect(() => {
    localStorage.setItem("homePageSongObj", JSON.stringify(songObj));
  }, [songObj]);

  const data = [
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
  ];

  const renderGenreList = () => {
    if (showPage === "browse") {
      return (
        <RowLayout
          header="Browse Genres"
          items={playlistList}
          cols={4}
          type="genre"
          // slug={showPage}
        />
      );
    }
  };

  return (
    <Container fluid className="backgroundColour my-5 py-2 space-top2">
      <Row className="m-0 p-0">
        <Col lg={12} xl={9}>
          <Container
            // onMouseOver={() => toggleShowArrow(false)}
            className="space-top-home"
          >
            <CustomCarousel items={data} cols={2} />
          </Container>

          <RowLayout
            header="Trending Now"
            type="song"
            items={songObj.trending}
            cols={4}
          />
          <RowLayout
            header="Latest Music"
            items={songObj.latestSongs}
            cols={4}
            type="song"
          />
          <RowLayout
            header="Top Bollywood"
            items={songObj.topBolloywood}
            cols={4}
            type="song"
          />
          {renderGenreList()}
          <RowLayout
            header="Best Of Ed Sheeran"
            items={songObj.edSheeran}
            cols={4}
            type="song"
            isRounded={true}
          />
          <RowLayout
            header="Romantic Mood"
            items={songObj.romanticSongs}
            cols={4}
            type="song"
          />
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
    </Container>
  );
};

export default Home;
