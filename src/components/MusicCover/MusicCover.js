import React, { useContext, useEffect } from "react";
import { Figure, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GlobalState from "../../contexts/GlobalState";
import { shufflePlaylist } from "../../utils/utils";
import { onPageSelect, onPlaylistSelect } from "../../entities";

const MusicCover = ({ isRounded, data, type, slug }) => {
  const [state, setState] = useContext(GlobalState);
  const dispatch = useDispatch();

  // if (data.playlistInfo) {
  //   //console.log("playlistInfo", data, data.playlistInfo);
  //   let { thumbnail, playlistId, playlistTitle, songCount, youtubeThumbnail } =
  //     data.playlistInfo;
  // }

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

  const showAlert = () => {
    alert("alert is displayed");
  };

  const dispatchSelector = () => {
    if (type === "playlist") {
      dispatch(onPlaylistSelect(data?.playlistInfo?.playlistId, slug));
    }
    if (type === "genre") {
      dispatch(onPageSelect(slug));
    }
  };

  return (
    // <div>
    //   <p>Will be of two variations rounded corners and rounded</p>
    //   <p>will have optionals name and artist/movie name etc </p>
    // </div>
    <Link
      to={{
        pathname: `/${type}/${slug}`,
        // search: "?sort=name",
        // hash: "#the-hash",
        state: { songData: data },
      }}
      onClick={() => {
        dispatchSelector();
      }}
    >
      <Figure>
        {isRounded ? (
          <Image
            width={"170px"}
            height={"170px"}
            // alt="171x180"
            src={
              data?.playlistInfo?.youtubeThumbnail ||
              data?.snippet?.thumbnails.high.url ||
              "/images/genres/thumbs/" + data?.genreSlug + ".png)"
            }
            roundedCircle
          />
        ) : (
          <Figure.Image
            // width={171}
            // height={180}
            // alt="171x180"
            src={
              data?.playlistInfo?.youtubeThumbnail ||
              data?.snippet?.thumbnails.high.url ||
              "/images/genres/thumbs/" + data?.genreSlug + ".png)"
            }
            rounded
          />
        )}
        <Figure.Caption>
          {" "}
          {data?.playlistInfo?.playlistTitle ||
            data?.genreTitle ||
            data?.snippet?.title.slice(0, 70) + " ..."}
        </Figure.Caption>
      </Figure>
    </Link>
  );
};

export default MusicCover;
