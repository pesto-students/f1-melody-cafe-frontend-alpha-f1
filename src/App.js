import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import GlobalState from "./contexts/GlobalState";

import { QUALITY, REPEAT_MODE } from "./utils/constants";
import { useEffect, useState } from "react";
import Controller from "./components/Controller";
import _ from "lodash";
import { Toaster } from "react-hot-toast";

function App() {
  const [state, setState] = useState({
    queue: [],
    currentSong: null,
    originalQueue: [],
    shuffleOn: false,
    fullscreen: false,
    repeatMode: REPEAT_MODE.NONE,
    qualityMode: QUALITY.HIGH,
    userPlaylist: [],
    userPublish: [],
    userFavouriteSongs: [],
  });

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
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
