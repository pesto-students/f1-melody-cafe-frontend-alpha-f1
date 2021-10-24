import React, { useContext, useState, useEffect } from "react";
import GlobalState from "../contexts/GlobalState";

import { Col, Dropdown, DropdownButton, Image, Row } from "react-bootstrap";

import AlbumArtBlank from "../assets/album_art_blank.jpg";
import PlayIcon from "../assets/play.svg";
import PauseIcon from "../assets/pause.svg";
import NextIcon from "../assets/next.svg";
import PrevIcon from "../assets/prev.svg";
import ShuffleIcon from "../assets/shuffle.svg";
import ShuffleOnIcon from "../assets/shuffle-active.svg";
import RepeatIcon from "../assets/repeat.svg";
import RepeatAllIcon from "../assets/repeat-all.svg";
import RepeatOneIcon from "../assets/repeat-one.svg";
import Playlist from "../assets/playlist.svg";
import LyricsIcon from "../assets/lyrics.svg";
import LikeIcon from "../assets/like.svg";
import LikeActiveIcon from "../assets/like-active.svg";

import LyricsModal from "./LyricsModal";

import { REPEAT_MODE } from "../utils/constants";
import { shufflePlaylist, toHHMMSS } from "../utils/utils";
import getAudioLink from "../api/services/getAudioLink";
import { getStreamQuality } from "../utils/storage";
import regex from "../helpers/helper-functions";
import FullScreenController from "./FullScreenController";
import PlaylistModal from "./Playlist/PlaylistModal";

let previousStreamUrl = "";
let audio = new Audio();
audio.autoplay = false;

const Controller = (props) => {
  const [state, setState] = useContext(GlobalState);

  const getAudio = async (data, audioQuality) => {
    const res = getAudioLink.get("/song", {
      params: { id: data },
    });

    return res;
  };

  const song =
    state.currentSong === null
      ? {
          lyrics: null,
          art: AlbumArtBlank,
          name: "No song playing",
          artist: "Play one from your library",
        }
      : {
          ...state.currentSong,
          lyrics: null,
          art: state.currentSong?.snippet?.thumbnails?.high?.url,
          name: regex.editTitle(state.currentSong?.snippet?.title),
          artist: regex.editArtist(state.currentSong?.channelTitle),
        };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [isBuffering, setBuffering] = useState(false);
  const [songLiked, setSongLiked] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    setSongLiked(false);
  }, [song.name]);

  const pauseAudio = () => {
    audio.pause();
    setPlaying(false);
  };

  const playAudio = () => {
    document.title = song?.name;
    audio.play();
    setPlaying(true);
  };

  const restartAudio = () => {
    audio.currentTime = 0;
    playAudio();
  };

  const getCurrentSongIndex = () => {
    let currentSongIndex = -1;
    for (let index = 0; index < state.queue.length; index++) {
      const element = state.queue[index];
      if (element.id === song?.id) {
        currentSongIndex = index;
        break;
      }
    }

    return currentSongIndex;
  };

  const goToNextSong = (force) => {
    const currentSongIndex = getCurrentSongIndex();
    if (currentSongIndex !== -1) {
      let nextSongIndex = currentSongIndex;
      switch (state.repeatMode) {
        case REPEAT_MODE.NONE:
        default:
          if (currentSongIndex < state.queue.length - 1) {
            nextSongIndex++;
          }
          break;
        case REPEAT_MODE.ALL:
          if (currentSongIndex < state.queue.length - 1) {
            nextSongIndex++;
          } else {
            nextSongIndex = 0;
          }
          break;
        case REPEAT_MODE.ONE:
          if (force && currentSongIndex < state.queue.length - 1) {
            nextSongIndex++;
          } else {
            restartAudio();
          }
          break;
      }

      setState((state) => ({
        ...state,
        currentSong: state.queue[nextSongIndex],
      }));
    }
  };

  const goToPreviousSong = () => {
    const currentSongIndex = getCurrentSongIndex();
    if (currentSongIndex !== -1) {
      let previousSongIndex = currentSongIndex;
      if (currentSongIndex > 0) {
        previousSongIndex--;
      } else if (currentSongIndex === 0 && state.repeatMode === 0) {
        previousSongIndex = state.queue.length - 1;
      }

      setState((state) => ({
        ...state,
        currentSong: state.queue[previousSongIndex],
      }));
    }
  };

  const unshuffleQueue = () => {
    setState((state) => ({ ...state, queue: state.originalQueue }));
  };

  const shuffleQueue = () => {
    const shuffledQueue = shufflePlaylist([...state.originalQueue], song);
    setState((state) => ({ ...state, queue: shuffledQueue }));
  };

  const changeShuffle = () => {
    state.shuffleOn ? unshuffleQueue() : shuffleQueue();
    setState((state) => ({ ...state, shuffleOn: !state.shuffleOn }));
  };

  const toggleFullScreen = (e) => {
    e.preventDefault();
    setShowFullScreen((state) => !state);
    setState((state) => ({ ...state, fullscreen: !showFullScreen }));
  };

  const likeSongHandler = (e) => {
    e.preventDefault();
    setSongLiked((liked) => !liked);
    if (!songLiked) {
      setState((state) => ({
        ...state,
        userFavouriteSongs: [...state.userFavouriteSongs, song],
      }));
    } else {
      setState((state) => ({
        ...state,
        userFavouriteSongs: state.userFavouriteSongs.filter(
          (favouriteSong) => favouriteSong.id !== song.id
        ),
      }));
    }
  };

  const addToPlaylistHandler = (e) => {
    e.preventDefault();
    setShowPlaylist((state) => !state);
  };

  const changeRepeat = () => {
    let currentRepeat = state.repeatMode;
    currentRepeat < REPEAT_MODE.ONE
      ? currentRepeat++
      : (currentRepeat = REPEAT_MODE.NONE);
    setState((state) => ({ ...state, repeatMode: currentRepeat }));
  };

  const handleSeekbarChange = (event) => {
    const selectedDuration = event.target.value;
    setCurrentTime(selectedDuration);
    audio.currentTime = selectedDuration;
  };

  const getRepeatIcon = () => {
    switch (state.repeatMode) {
      case REPEAT_MODE.NONE:
        return RepeatIcon;
      case REPEAT_MODE.ALL:
        return RepeatAllIcon;
      case REPEAT_MODE.ONE:
        return RepeatOneIcon;
      default:
        return RepeatIcon;
    }
  };

  audio.ontimeupdate = () => {
    setCurrentTime(audio.currentTime);
  };

  audio.onpause = () => {
    setPlaying(false);
  };

  audio.onplay = () => {
    setPlaying(true);
  };

  audio.onended = () => {
    audio.currentTime = 0;
    pauseAudio();
    goToNextSong(false);
  };

  audio.onloadstart = () => {
    setBuffering(true);
  };

  audio.oncanplay = () => {
    setBuffering(false);
    setDuration(audio.duration);
  };

  useEffect(
    () => {
      audio.currentTime = 0;
      pauseAudio();
      if (song?.id !== undefined) {
        let video_id = null;
        if (song?.kind === "youtube#playlistItem") {
          video_id = song?.snippet?.resourceId?.videoId;
        }
        if (song?.kind === "youtube#video") {
          video_id = song?.id;
        }
        setBuffering(true);
        getAudio(video_id, getStreamQuality()).then((response) => {
          console.log(response);
          if (response.status === 200) {
            const streamingUrl = response.data;
            if (previousStreamUrl !== streamingUrl) {
              pauseAudio();
              audio = new Audio(streamingUrl);
              playAudio();
              previousStreamUrl = streamingUrl;
            }
          } else {
            goToNextSong(true);
          }
        });
      }
    },
    // eslint-disable-next-line
    [song?.id]
  );

  const showLyricsModal = () => {
    setShowLyrics(song?.lyrics !== null || true);
  };

  const albumArt = song?.art !== "" ? song?.art : AlbumArtBlank;

  return (
    <div className="controls">
      <Row className="m-0">
        <Col className="p-0 m-0 d-none d-md-block" md={3}>
          <div className="controller-song-details">
            <Image
              alt=""
              src={albumArt}
              roundedCircle
              className="controller-song-art"
            />
            <p className="controller-song-title" title={song?.name}>
              {song?.name}
            </p>
            <p className="controller-song-artist" title={song?.artist}>
              {song?.artist}
            </p>
          </div>
        </Col>
        <Col className="p-0 m-0" sm="auto">
          <div className="controller-controls-container">
            <img
              alt=""
              src={PrevIcon}
              width="16px"
              height="16px"
              className="mr-3 controller-icon"
              onClick={() => goToPreviousSong()}
            />
            <div
              className="controller-play controller-icon"
              onClick={() => (isPlaying ? pauseAudio() : playAudio())}
            >
              <img
                alt=""
                src={isPlaying ? PauseIcon : PlayIcon}
                width="16px"
                height="16px"
                className="controller-play-icon"
              />
            </div>
            <img
              alt=""
              src={NextIcon}
              width="16px"
              height="16px"
              className="ml-3 controller-icon"
              onClick={() => goToNextSong(true)}
            />
          </div>
        </Col>
        <Col className="p-0 m-0">
          <div className="controller-seekbar-container">
            <p className="controller-time p-0 m-0 pr-3">
              {toHHMMSS(currentTime)}
            </p>
            <input
              className="seekbar"
              type="range"
              min={0}
              max={String(audio.duration)}
              value={currentTime}
              onChange={(event) => handleSeekbarChange(event)}
            />
            <p className="controller-time p-0 m-0 pl-3">{toHHMMSS(duration)}</p>
          </div>
        </Col>
        <Col className="p-0 m-0  " sm="auto">
          <div className="controller-options-container">
            <DropdownButton
              key={"up"}
              id={`dropdown-button-drop-up`}
              drop={"up"}
              variant="secondary"
              title=""
              className="removeBackBorder"
              size="sm"
            >
              <Dropdown.Item
                eventKey="1"
                onClick={(e) => addToPlaylistHandler(e)}
              >
                Add to Playlist
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>
            {/* </div> */}

            <img
              alt=""
              src={state.shuffleOn ? ShuffleOnIcon : ShuffleIcon}
              width="16px"
              height="16px"
              className="mr-4 controller-icon"
              onClick={() => changeShuffle()}
            />
            <img
              alt=""
              src={getRepeatIcon()}
              width="16px"
              height="16px"
              className="mr-4 controller-icon"
              onClick={() => changeRepeat()}
            />
            <img
              alt=""
              src={songLiked ? LikeActiveIcon : LikeIcon}
              width="16px"
              height="16px"
              className="mr-5 controller-icon"
              onClick={(e) => likeSongHandler(e)}
            />
            <img
              alt=""
              src={LyricsIcon}
              width="16px"
              height="16px"
              className="controller-icon"
              onClick={() => showLyricsModal()}
            />
            <img
              alt=""
              src={Playlist}
              width="16px"
              height="16px"
              className="mr-4 controller-icon"
              onClick={(e) => toggleFullScreen(e)}
            />
          </div>
        </Col>
      </Row>

      <LyricsModal
        song={song}
        showLyrics={showLyrics}
        setShowLyrics={setShowLyrics}
      />

      <FullScreenController show={showFullScreen} setShow={setShowFullScreen} />
      <PlaylistModal show={showPlaylist} setShow={setShowPlaylist} type="ADD" />
    </div>
  );
};

export default Controller;
