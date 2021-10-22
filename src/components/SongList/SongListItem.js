import React, { useContext } from "react";
import _ from "lodash";
import regex from "../../helpers/helper-functions"; // Regex functions for splitting the titles
import { useDispatch } from "react-redux";
import GlobalState from "../../contexts/GlobalState";
import { shufflePlaylist } from "../../utils/utils";

const SongListItems = (props) => {
  const [state, setState] = useContext(GlobalState);

  console.log("inside song list items");

  const dispatch = useDispatch();
  // Set this song to selected if it matches the selectedSong state
  var addSelectedClass;

  if (props.selectedSong === props.video) {
    addSelectedClass = "list-item selected";
  } else {
    addSelectedClass = "list-item";
  }

  const callPlay = (song) => {
    let newQueue = [...state.originalQueue, song];
    if (state.shuffleOn) {
      newQueue = shufflePlaylist(newQueue, song);
    }
    setState((state) => ({
      ...state,
      currentSong: song,
      queue: newQueue,
      originalQueue: [...state.originalQueue, song],
    }));
  };

  if (!props.video.channelTitle) {
    return (
      <tr className="list-item">
        <td className="list-save"></td>
        <td className="list-track">Loading...</td>
        <td className="list-artist"></td>
        <td className="list-duration"></td>
        {/* <td className="list-play-count"></td> */}
      </tr>
    );
  }

  function renderSaveRemoveButton() {
    if (props.user) {
      if (props.index !== -1) {
        return (
          <td
            className="list-remove-song"
            onClick={() => props.removeSong(props.index)}
          >
            &#x2713;
          </td>
        );
      } else {
        return (
          <td
            className="list-save-song"
            onClick={() => props.saveSong(props.video)}
          >
            &#xff0b;
          </td>
        );
      }
    } else {
      return <td className="list-save-song"></td>;
    }
  }

  return (
    <tr className={addSelectedClass}>
      {renderSaveRemoveButton()}
      <td
        className="list-track"
        onClick={() => {
          dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.editTitle(props.video.snippet.title)}
      </td>
      <td
        className="list-artist"
        onClick={() => {
          dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.editArtist(props.video.channelTitle)}
      </td>
      <td
        className="list-duration"
        onClick={() => {
          dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.editDuration(props.video.duration)}
      </td>
      {/* <td
        className="list-play-count"
        onClick={() => {
          dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.editPlayCount(props.video.viewCount)}
      </td> */}
    </tr>
  );
};

export default SongListItems;
