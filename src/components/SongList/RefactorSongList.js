import React, { useContext } from "react";
import _ from "lodash";
import GlobalState from "../../contexts/GlobalState";
import SongListItems from "./SongListItem";

const RefactorSongList = (props) => {
  const [state, setState] = useContext(GlobalState);

  const queueListArray = _.map(state.queue, (video) => {
    if (
      video.snippet.title !== "Deleted video" &&
      video.snippet.title !== "Private video"
    ) {
      // let index = _.findIndex(props.savedSongs, { id: video.id });

      return (
        <SongListItems
          key={video.etag}
          video={video}
          //   onVideoSelect={onVideoSelect}
          //   selectedSong={selectedSong}
          // cachedPlaylist={cachedPlaylists[genre][props.playlistId].songs}
          // savedSongs={props.savedSongs}
          // saveSong={props.saveSong}
          // removeSong={props.removeSong}
          // index={index}
          user={props.user}
        />
      );
    }
  });

  const songsListArray = _.map(props.songs, (video) => {
    if (
      video.snippet.title !== "Deleted video" &&
      video.snippet.title !== "Private video"
    ) {
      // let index = _.findIndex(props.savedSongs, { id: video.id });

      return (
        <SongListItems
          key={video.etag}
          video={video}
          //   onVideoSelect={onVideoSelect}
          //   selectedSong={selectedSong}
          // cachedPlaylist={cachedPlaylists[genre][props.playlistId].songs}
          // savedSongs={props.savedSongs}
          // saveSong={props.saveSong}
          // removeSong={props.removeSong}
          // index={index}
          user={props.user}
        />
      );
    }
  });

  //   const playAll = () => {
  //     dispatch(
  //       onVideoSelect(
  //         cachedPlaylists[genre][props.playlistId].songs[0],
  //         cachedPlaylists[genre][props.playlistId].songs
  //       )
  //     );
  //     player?.target.playVideo();

  //     let newOriginalQueue;
  //     let newQueue = [
  //       ...state.originalQueue,
  //       cachedPlaylists[genre][props.playlistId].songs[0],
  //       ...cachedPlaylists[genre][props.playlistId].songs,
  //     ];
  //     if (state.shuffleOn) {
  //       newQueue = shufflePlaylist(
  //         newQueue,
  //         cachedPlaylists[genre][props.playlistId].songs[0]
  //       );
  //     }
  //     setState((state) => ({
  //       ...state,
  //       currentSong: cachedPlaylists[genre][props.playlistId].songs[0],
  //       queue: newQueue,
  //       originalQueue: [...state.originalQueue, ...newQueue],
  //     }));
  //   };

  return (
    <div className="outer-container">
      {/* <div className="song-list-container" style={background}> */}
      {/* <div className="song-list-title-block">
          <div className="song-list-thumbnail" style={thumbnail}></div>
          <div className="song-list-details">
            <h1>{}</h1>
            <span>{} Songs</span>
            <button className="song-list-play" onClick={playAll}>
              &#9658; Play All
            </button>
            {renderSavePlaylistBtn()}
          </div> 
        </div>*/}

      <table className="list-group">
        <tbody>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artist</th>
            <th>Dur</th>
            <th>Plays</th>
          </tr>
          {props.renderQueue ? queueListArray : ""}
          {props.songs ? songsListArray : ""}
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
};

export default RefactorSongList;
