import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import GlobalState from "./contexts/GlobalState";

import { REPEAT_MODE } from "./utils/constants";
import { useEffect, useState } from "react";
import Controller from "./components/Controller";
import _ from "lodash";
import { onPlaylistInit, onPageSelect } from "./entities";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const playlistList = useSelector((state) => state.playlistList);
  const dispatch = useDispatch();

  let genresArray = _.map(playlistList, (item) => item.genreSlug);
  genresArray.push("browse");

  const [state, setState] = useState({
    queue: [],
    currentSong: null,
    originalQueue: [],
    shuffleOn: false,
    repeatMode: REPEAT_MODE.NONE,
    userPlaylist: [],
    userPublish: [],
  });

  useEffect(() => {
    _.map(playlistList, (item) => {
      return _.map(item.playlists, (playlist) => {
        return dispatch(onPlaylistInit(playlist.playlistId, item.genreSlug));
      });
    });
  }, []);

  return (
    <div className="App">
      <GlobalState.Provider value={[state, setState]}>
        <Router>
          <Header />
          <Routes />
          <Controller className="controls m-0 p-0" />
        </Router>
      </GlobalState.Provider>
    </div>
  );
}

export default App;
