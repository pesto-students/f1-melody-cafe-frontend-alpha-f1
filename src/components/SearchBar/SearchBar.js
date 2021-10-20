import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import api from "../../helpers/api";
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
} from "react-bootstrap";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    items: [],
  });
  const [searchHistory, setSearchHistory] = useState([]);

  const selectedSong = useSelector(
    (state) => state.songController.selectedSong
  );

  const videoSearch = (term) => {
    setSearchResults({
      items: [],
    });

    let url = `https://www.googleapis.com/youtube/v3/search?maxResults=10&relevanceLanguage=en&regionCode=IN&topicId=/m/04rlf&part=snippet&q=${term}&key=${api}`;

    axios
      .get(url)
      .then((response) => {
        _.map(response.data.items, (video) => {
          if (video.id.kind === "youtube#video") {
            let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${video.id.videoId}&key=${api}`;
            axios
              .get(url)
              .then((result) => {
                video.duration = result.data.items[0].contentDetails.duration;
                video.viewCount = result.data.items[0].statistics.viewCount;
                setSearchResults({
                  items: [...searchResults.items, video],
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setSearchResults({
              items: [...searchResults.items, video],
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let debounced = _.debounce(videoSearch, 210);

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

  // get results from users search history
  //   useEffect(()=>{
  //       if (props.user){
  //       base.syncState(`${props.user.uid}/searchHistory`, {
  //         context: this,
  //         state: 'searchHistory',
  //         asArray: true
  //       });
  //     }
  //   },[])

  const renderResults = () => {
    const songsArray = _.filter(searchResults.items, function (item) {
      return item.id.kind === "youtube#video";
    });
    const songs = _.map(songsArray, (result) => {
      let index = _.findIndex(props.savedSongs, { id: result.id.videoId });

      return (
        <SearchResult
          key={result.etag}
          result={result}
          onVideoSelect={onVideoSelect}
          selectedSong={selectedSong}
          savedSongs={props.savedSongs}
          saveSong={props.saveSong}
          removeSong={props.removeSong}
          index={index}
          user={props.user}
          setSearchHistory={searchHistoryHandler}
        />
      );
    });

    let artistsArray = _.filter(searchResults.items, function (item) {
      return item.id.kind === "youtube#channel";
    });

    let artists = _.map(artistsArray, (result) => {
      return <SearchResult key={result.etag} result={result} />;
    });

    let playlistsArray = _.filter(searchResults.items, function (item) {
      return item.id.kind === "youtube#playlist";
    });

    let playlists = _.map(playlistsArray, (result) => {
      return (
        <SearchResult
          key={result.etag}
          result={result}
          onSearchPlaylistInit={onSearchPlaylistInit}
        />
      );
    });

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
                      <th></th>
                      <th>Title</th>
                      <th>Artist</th>
                      <th>Dur</th>
                      <th>Plays</th>
                    </tr>

                    {songs}
                  </tbody>
                </table>
              </div>
            )}
            {/*artists.length > 0 &&
            <div className="result-group">
              <h3>Artists</h3>
              {artists}
            </div>
          */}
            {playlists.length > 0 && (
              <div className="result-group">
                <h3>Playlists</h3>
                {playlists}
              </div>
            )}
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

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <Form className="d-flex" onSubmit={onFormSubmit}>
        <FormControl
          type="search"
          className="me-2"
          aria-label="Search"
          value={term}
          onChange={(e) => onInputChange(e)}
          autoFocus={true}
          placeholder="Search artists, songs, playlists.."
          onClick={decoratedOnClick}
        />
        {/* <Button variant="outline-success">Search</Button> */}
      </Form>
    );
  }

  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="0">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{renderResults()}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default SearchBar;
