import React, { useContext } from "react";
import _ from "lodash";
import regex from "../../helpers/helper-functions"; // Regex functions for splitting the titles
import { useDispatch } from "react-redux";
import GlobalState from "../../contexts/GlobalState";
import { shufflePlaylist } from "../../utils/utils";

const SongListItems = (props) => {
  const [state, setState] = useContext(GlobalState);

  // console.log("inside song list items");

  const dispatch = useDispatch();
  // Set this song to selected if it matches the selectedSong state
  var addSelectedClass;

  if (props.selectedSong === props.video) {
    addSelectedClass = "list-item selected";
  } else {
    addSelectedClass = "list-item";
  }

  const callPlay = (song) => {
    let { items } = props;
    if (items) {
      let newQueue = [...state.originalQueue, song, ...items];
      if (state.shuffleOn) {
        newQueue = shufflePlaylist(newQueue, song);
      }
      if (props.isQueue) {
        setState((state) => ({
          ...state,
          currentSong: song,
          // queue: newQueue,
          // originalQueue: [...state.originalQueue, song],
        }));
      } else {
        setState((state) => ({
          ...state,
          currentSong: song,
          queue: newQueue,
          originalQueue: [...state.originalQueue, ...newQueue],
        }));
      }
    } else {
      let newQueue = state.originalQueue;

      newQueue = [...state.originalQueue, song];

      if (state.shuffleOn) {
        newQueue = shufflePlaylist(newQueue, song);
      }
      if (props.isQueue) {
        setState((state) => ({
          ...state,
          currentSong: song,
          // queue: newQueue,
          // originalQueue: [...state.originalQueue, song],
        }));
      } else {
        setState((state) => ({
          ...state,
          currentSong: song,
          queue: newQueue,
          originalQueue: [...state.originalQueue, song],
        }));
      }
    }
  };

  let songModel = () => {
    if (props.video?.kind === "youtube#video") {
      return {
        channelTitle: props.video?.snippet?.channelTitle,
        title: props.video?.snippet?.title,
        duration: null,
      };
    }
    if (props.video?.kind === "youtube#playlistItem") {
      return {
        channelTitle: props.video?.snippet?.videoOwnerChannelTitle,
        title: props.video?.snippet?.title,
        duration: props.video?.duration,
      };
    }
  };

  let song = songModel();
  // console.log(song);

  if (!song?.title) {
    return (
      <tr className="list-item ">
        {/* <td className="list-save"></td> */}
        <td className="list-track text-start px-4">Loading...</td>
        <td className="list-artist text-center px-4">Loading...</td>
        <td className="list-duration text-end px-4">Loading...</td>
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
    <tr className="py-5">
      {/* {renderSaveRemoveButton()} */}
      <td
        className="list-track text-start px-4"
        onClick={() => {
          //dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.trimTitle(song?.title).song}
      </td>
      <td
        className="list-artist text-center px-4"
        onClick={() => {
          //dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.trimTitle(song?.title).detail}
      </td>
      <td
        className="list-artist text-end px-4"
        onClick={() => {
          //dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {regex.editArtist(song?.channelTitle)}
      </td>
      {/* <td
        className="list-duration text-end px-4"
        onClick={() => {
          //dispatch(props.onVideoSelect(props.video, props.cachedPlaylist));
          callPlay(props.video);
        }}
      >
        {song.duration ? regex.editDuration(song?.duration) : "00:00"}
      </td> */}
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
