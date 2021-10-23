import React, { useContext } from "react";
import _ from "lodash";

// Actions
import { onVideoSelect } from "../../entities";

import SongListItems from "./SongListItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import GlobalState from "../../contexts/GlobalState";
import { shufflePlaylist } from "../../utils/utils";

const SongList = (props) => {
  const [state, setState] = useContext(GlobalState);

  const cachedPlaylists = useSelector(
    (state) => state.playlists.cachedPlaylists
  );
  const player = useSelector((state) => state.songController.player);
  const selectedSong = useSelector(
    (state) => state.songController.selectedSong
  );
  const dispatch = useDispatch();
  let genre = _.findKey(cachedPlaylists, props.playlistId);

  if (!cachedPlaylists[genre]) {
    return null;
  }
  console.log(props.songs);
  // state = {};

  // playAll = playAll.bind(this);
  // savePlaylist = savePlaylist.bind(this);
  // removePlaylist = removePlaylist.bind(this);

  const savePlaylist = () => {
    if (props.user) {
      if (!props.items[props.playlistId]) {
        let thumb;
        if (cachedPlaylists[genre][props.playlistId].playlistInfo.thumbnail) {
          thumb =
            cachedPlaylists[genre][props.playlistId].playlistInfo.thumbnail;
        } else {
          thumb =
            cachedPlaylists[genre][props.playlistId].playlistInfo
              .youtubeThumbnail;
        }
        // base.post(`${props.user.uid}/savedPlaylists`, {
        //   data: {
        //     ...props.items,
        //     [props.playlistId]: {
        //       playlistId: props.playlistId,
        //       title:
        //         cachedPlaylists[genre][props.playlistId]
        //           .playlistInfo.playlistTitle,
        //       thumbnail: thumb,
        //     },
        //   },
        //   then(err) {
        //     console.log(err);
        //   },
        // });
      }
    } else {
      alert("please log in to save playlists!");
    }
  };

  const removePlaylist = () => {
    if (props.items[props.playlistId]) {
      //   base.remove(
      //     `${props.user.uid}/savedPlaylists/${props.playlistId}`
      //   );
    }
  };

  const renderSavePlaylistBtn = () => {
    if (props.user) {
      if (!props.items[props.playlistId]) {
        return (
          <button className="song-list-save" onClick={savePlaylist}>
            Favourite
          </button>
        );
      } else {
        return (
          <button className="song-list-save" onClick={removePlaylist}>
            UnFavourite
          </button>
        );
      }
    } else {
      return (
        <button className="song-list-save" onClick={savePlaylist}>
          Favourite
        </button>
      );
    }
  };

  const playAll = () => {
    dispatch(
      onVideoSelect(
        cachedPlaylists[genre][props.playlistId].songs[0],
        cachedPlaylists[genre][props.playlistId].songs
      )
    );
    player?.target.playVideo();

    let newOriginalQueue;
    let newQueue = [
      ...state.originalQueue,
      cachedPlaylists[genre][props.playlistId].songs[0],
      ...cachedPlaylists[genre][props.playlistId].songs,
    ];
    if (state.shuffleOn) {
      newQueue = shufflePlaylist(
        newQueue,
        cachedPlaylists[genre][props.playlistId].songs[0]
      );
    }
    setState((state) => ({
      ...state,
      currentSong: cachedPlaylists[genre][props.playlistId].songs[0],
      queue: newQueue,
      originalQueue: [...state.originalQueue, ...newQueue],
    }));
  };

  // DRY shortcut for this playlist
  const playlistInfo = cachedPlaylists[genre][props.playlistId]?.playlistInfo;

  // Set the image URLS
  let thumbnail;

  if (genre === "yourmusic") {
    thumbnail = {
      backgroundImage: "url(" + playlistInfo?.thumbnail + ")",
    };
  } else if (playlistInfo?.thumbnail) {
    thumbnail = {
      backgroundImage:
        "url(" +
        process.env.PUBLIC_URL +
        "/images/playlists/" +
        playlistInfo?.thumbnail +
        ")",
    };
  } else {
    thumbnail = {
      backgroundImage: "url(" + playlistInfo?.youtubeThumbnail + ")",
    };
  }

  // Set background image
  let background = {
    backgroundImage:
      "url(" +
      process.env.PUBLIC_URL +
      "/images/playlists/" +
      playlistInfo?.background +
      ")",
  };

  // Create an array of songs by mapping through props
  const songListArray = _.map(
    cachedPlaylists[genre][props.playlistId]?.songs,
    (video) => {
      if (
        video.snippet.title !== "Deleted video" &&
        video.snippet.title !== "Private video"
      ) {
        let index = _.findIndex(props.savedSongs, { id: video.id });

        return (
          <SongListItems
            key={video.etag}
            video={video}
            onVideoSelect={onVideoSelect}
            selectedSong={selectedSong}
            cachedPlaylist={cachedPlaylists[genre][props.playlistId].songs}
            savedSongs={props.savedSongs}
            saveSong={props.saveSong}
            removeSong={props.removeSong}
            index={index}
            user={props.user}
          />
        );
      }
    }
  );

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
          onVideoSelect={onVideoSelect}
          selectedSong={selectedSong}
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
    console.log(video);
    if (
      video.snippet.title !== "Deleted video" &&
      video.snippet.title !== "Private video"
    ) {
      // let index = _.findIndex(props.savedSongs, { id: video.id });

      return (
        <SongListItems
          key={video.etag}
          video={video}
          onVideoSelect={onVideoSelect}
          selectedSong={selectedSong}
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

  return (
    <div className="outer-container">
      <div className="song-list-container" style={background}>
        <div className="song-list-title-block">
          <div className="song-list-thumbnail" style={thumbnail}></div>
          <div className="song-list-details">
            <h1>{playlistInfo?.playlistTitle}</h1>
            <span>{playlistInfo?.songCount} Songs</span>
            <button className="song-list-play" onClick={playAll}>
              &#9658; Play All
            </button>
            {renderSavePlaylistBtn()}
          </div>
        </div>

        <table className="list-group">
          <tbody>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Dur</th>
              <th>Plays</th>
            </tr>

            {songListArray}
            {props.renderQueue ? queueListArray : ""}
            {props.songs ? songsListArray : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
