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
import LowIcon from "../assets/low.png";
import MedIcon from "../assets/medium.png";
import HighIcon from "../assets/hd.png";

import LyricsModal from "./LyricsModal";

import { QUALITY, REPEAT_MODE } from "../utils/constants";
import { shufflePlaylist, toHHMMSS } from "../utils/utils";
import getAudioLink from "../api/services/getAudioLink";
import { getStreamQuality } from "../utils/storage";
import regex from "../helpers/helper-functions";
import FullScreenController from "./FullScreenController";
import PlaylistModal from "./Playlist/PlaylistModal";
import API from "../api/services/api";
import PaymentModal from "./Payment/PaymentModal";
import toast from "react-hot-toast";

let previousStreamUrl = "";
let audio = new Audio();
audio.autoplay = false;

const Controller = (props) => {
  const [state, setState] = useContext(GlobalState);
  const [showPayment, setShowPayment] = useState(false);

  let api = new API();

  const getAudio = async (data, audioQuality) => {
    try {
      const res = await api.getSongUrl(data);
      return res;
    } catch (err) {
      console.log("err", err);
    }
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
  const [skipCount, setSkipCount] = useState(0);

  useEffect(() => {
    setSongLiked(false);
  }, [song.name]);

  const pauseAudio = () => {
    audio.pause();
    setPlaying(false);
  };

  const playAudio = () => {
    document.title = song?.name;
    audio.play().catch((err) => {
      toast("Song not available in your region fetching next playable song", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 3000,
      });
      goToNextSong(true, true);
    });
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

  const goToNextSong = (force, dueToError) => {
    const currentSongIndex = getCurrentSongIndex();
    if (!dueToError) {
      setSkipCount((currentCount) => currentCount + 1);
    }

    if (skipCount >= 2) {
      setShowPayment(true);
    } else {
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

  const changeQuality = () => {
    let currentQuality = state.qualityMode;
    currentQuality < QUALITY.HIGH
      ? currentQuality++
      : (currentQuality = QUALITY.LOW);
    setState((state) => ({ ...state, qualityMode: currentQuality }));
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

  const getQualityImage = () => {
    switch (state.qualityMode) {
      case QUALITY.HIGH:
        return HighIcon;
      case QUALITY.MED:
        return MedIcon;
      case REPEAT_MODE.LOW:
        return LowIcon;
      default:
        return HighIcon;
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
    goToNextSong(false, false);
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
        if (
          song?.kind === "youtube#playlistItem" ||
          song?.kind === "youtube#searchResult"
        ) {
          video_id = song?.snippet?.resourceId?.videoId;
        }
        if (song?.kind === "youtube#video") {
          video_id = song?.id;
        }
        setBuffering(true);
        getAudio(video_id, state.qualityMode).then((response) => {
          if (response?.status === 200) {
            const streamingUrl = response?.data;
            if (previousStreamUrl !== streamingUrl) {
              pauseAudio();
              audio = new Audio(streamingUrl);
              playAudio();
              previousStreamUrl = streamingUrl;
            }
          } else {
            goToNextSong(true, false);
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
        <Col className="p-0 m-0 d-flex">
          <div className="controller-song-details col-sm-5 col-md-3 col-lg-2 d-none d-sm-block">
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
          <div className="controller-controls-container col-4 col-sm-2 col-md-2 col-lg-1">
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
              onClick={() => goToNextSong(true, false)}
            />
          </div>
          <div className="controller-seekbar-container d-none d-md-flex col-md-3 col-lg">
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
          <div className="controller-options-container col col-md-2 col-lg-2 ">
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
              src={getQualityImage()}
              width="16px"
              height="16px"
              className="mr-4 controller-icon bg-light"
              onClick={() => changeQuality()}
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
        {/* <Col className="p-0 m-0" sm="auto"></Col>
        <Col className="p-0 m-0 d-none d-md-block"></Col>
        <Col className="p-0 m-0" sm="auto"></Col> */}
      </Row>
      <LyricsModal
        song={song}
        showLyrics={showLyrics}
        setShowLyrics={setShowLyrics}
      />
      <PaymentModal
        showPayment={showPayment}
        setShowPayment={setShowPayment}
        setSkipCount={setSkipCount}
      ></PaymentModal>
      ;
      <FullScreenController show={showFullScreen} setShow={setShowFullScreen} />
      <PlaylistModal show={showPlaylist} setShow={setShowPlaylist} type="ADD" />
    </div>
  );
};

export default Controller;
