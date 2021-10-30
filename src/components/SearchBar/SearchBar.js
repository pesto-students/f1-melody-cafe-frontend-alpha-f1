import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
// Actions
import {
  onSearchPlaylistInit,
  onPlaylistSelect,
  onVideoSelect,
} from "../../entities";

// Components
import SearchResult from "./SearchResult";

import {
  useAccordionButton,
  Accordion,
  Card,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import GlobalState from "../../contexts/GlobalState";
import API from "../../api/services/api";

const SearchBar = (props) => {
  const [state, setState] = useContext(GlobalState);
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    items: [],
  });
  const [searchHistory, setSearchHistory] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setState((state) => ({ ...state, fullscreen: !show }));
  };
  const handleShow = () => {
    setShow(true);
    setState((state) => ({ ...state, fullscreen: !show }));
  };

  let api = new API();

  const selectedSong = useSelector(
    (state) => state.songController.selectedSong
  );

  const videoSearch = (term) => {
    setSearchResults({
      items: [],
    });

    api
      .getSongs(null, term)
      .then((response) => {
        setSearchResults({
          items: [...searchResults.items, ...response.data.records],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let debounced = _.debounce(videoSearch, 500);

  const onInputChange = (event) => {
    if (event.target.value === " " || event.target.value === null) {
      setTerm(event.target.value);
      setSearchResults({});
    } else {
      setTerm(event.target.value);
      debounced(event.target.value);
    }
  };

  const searchHistoryHandler = () => {
    setSearchHistory([...searchHistory, term]);
  };

  const searchFromHistory = (term) => {
    setTerm(term);
    debounced(term);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    searchHistoryHandler();
  };

  const renderResults = () => {
    // console.log(searchResults);
    const songsArray = _.filter(searchResults.items, function (item) {
      return item.id.kind === "youtube#video" || item.kind === "youtube#video";
    });

    const songs = _.map(songsArray, (result) => {
      return (
        <SearchResult
          key={result.etag}
          result={result}
          // onVideoSelect={onVideoSelect}
          selectedSong={selectedSong}
          // savedSongs={props.savedSongs}
          // saveSong={props.saveSong}
          // removeSong={props.removeSong}
          // index={index}
          user={props.user}
          setSearchHistory={searchHistoryHandler}
        />
      );
    });
    // console.log(songs);
    // let artistsArray = _.filter(searchResults.items, function (item) {
    //   return item.id.kind === "youtube#channel";
    // });

    // let artists = _.map(artistsArray, (result) => {
    //   return <SearchResult key={result.etag} result={result} />;
    // });
    // console.log(artists);
    // let playlistsArray = _.filter(searchResults.items, function (item) {
    //   return item.id.kind === "youtube#playlist";
    // });

    // let playlists = _.map(playlistsArray, (result) => {
    //   return (
    //     <SearchResult
    //       key={result.etag}
    //       result={result}
    //       // onSearchPlaylistInit={onSearchPlaylistInit}
    //     />
    //   );
    // });
    // console.log(playlists);

    let history = _.map(searchHistory, (item) => {
      return (
        <a className="search-history" onClick={() => searchFromHistory(item)}>
          {item}
        </a>
      );
    });

    if (term) {
      return (
        <div>
          <ul className="search-results">
            {songs.length > 0 && (
              <div className="result-group">
                <h3>Songs</h3>

                <table className="list-group">
                  <tbody>
                    <tr>
                      {/* <th></th> */}
                      <th className="px-3">Title</th>
                      <th className="px-3">Label</th>
                      {/* <th>Dur</th>
                      <th>Plays</th> */}
                    </tr>

                    {songs}
                  </tbody>
                </table>
              </div>
            )}
            {/* {artists.length > 0 && (
              <div className="result-group">
                <h3>Artists</h3>
                {artists}
              </div>
            )} */}
            {/* {playlists.length > 0 && (
              <div className="result-group">
                <h3>Playlists</h3>
                {playlists}
              </div>
            )} */}
          </ul>
        </div>
      );
    } else if (searchHistory.length > 0) {
      return (
        <div>
          <h2>Previous searches</h2>
          {history}
        </div>
      );
    }
  };

  // function CustomToggle({ children, eventKey }) {
  //   // const decoratedOnClick = useAccordionButton(eventKey, () =>
  //   //   console.log("totally custom!")
  //   // );

  //   return (
  //     <>
  //       <input onClick={handleShow} placeholder="search songs" />
  //       {children}
  //     </>
  //   );
  // }

  return (
    <div>
      {/* <Accordion>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="0">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{renderResults()}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion> */}
      <input
        onClick={handleShow}
        placeholder="search songs"
        className="border rounded my-3 py-2 ps-3 pe-5"
      />
      <Modal
        show={show}
        onHide={handleClose}
        scrollable={true}
        fullscreen={true}
      >
        <Modal.Header closeButton={handleClose}>
          <Form className="d-flex w-100" onSubmit={onFormSubmit}>
            <FormControl
              type="search"
              className="border rounded my-3 py-2 ps-3 pe-5 "
              aria-label="Search"
              value={term}
              onChange={(e) => onInputChange(e)}
              autoFocus={true}
              placeholder="Search artists, songs, playlists.."
              // onClick={handleShow}
            />
          </Form>
        </Modal.Header>
        <Modal.Body>{renderResults()}</Modal.Body>
        {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default SearchBar;
