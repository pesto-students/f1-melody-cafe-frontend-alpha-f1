import React, { useContext } from "react";
import _ from "lodash";
import GlobalState from "../../contexts/GlobalState";
import SongListItems from "./SongListItem";
import { Table } from "react-bootstrap";

const RefactorSongList = (props) => {
  const [state, setState] = useContext(GlobalState);
  console.log("SongListtt");

  const queueListArray = _.map(state.queue, (video) => {
    if (
      video?.snippet?.title !== "Deleted video" &&
      video?.snippet?.title !== "Private video"
    ) {
      // let index = _.findIndex(props.savedSongs, { id: video.id });

      return (
        <SongListItems
          key={video?.etag}
          video={video}
          //   onVideoSelect={onVideoSelect}
          //   selectedSong={selectedSong}
          // cachedPlaylist={cachedPlaylists[genre][props.playlistId].songs}
          // savedSongs={props.savedSongs}
          // saveSong={props.saveSong}
          // removeSong={props.removeSong}
          // index={index}
          isQueue={true}
          user={props?.user}
        />
      );
    }
  });

  const songsListArray = _.map(props.songs, (video) => {
    if (
      video?.snippet?.title !== "Deleted video" &&
      video?.snippet?.title !== "Private video"
    ) {
      // let index = _.findIndex(props.savedSongs, { id: video.id });

      return (
        <SongListItems
          key={video?.etag}
          video={video}
          items={props.songs}
          //   onVideoSelect={onVideoSelect}
          //   selectedSong={selectedSong}
          // cachedPlaylist={cachedPlaylists[genre][props.playlistId].songs}
          // savedSongs={props.savedSongs}
          // saveSong={props.saveSong}
          // removeSong={props.removeSong}
          // index={index}
          isQueue={false}
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

      <Table hover variant="dark" className="my-3 mx-0 px-0" responsive>
        <thead>
          <tr>
            {/* <th></th> */}
            <th className="text-start px-4">Title</th>
            <th className="text-center px-4">Details</th>
            <th className="text-end px-4">Label</th>
            {/* <th>Plays</th> */}
          </tr>
        </thead>
        <tbody>
          {props.renderQueue ? queueListArray : ""}
          {props.songs ? songsListArray : ""}
        </tbody>
      </Table>
      {/* </div> */}
    </div>
  );
};

export default RefactorSongList;
