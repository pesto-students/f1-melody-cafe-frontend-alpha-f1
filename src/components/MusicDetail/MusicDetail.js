import React, { useContext } from "react";
import { Image, Button } from "react-bootstrap";
import GlobalState from "../../contexts/GlobalState";
import { shufflePlaylist } from "../../utils/utils";
import AlbumArt from "../../assets/album_art_blank.jpg";

const MusicDetail = ({ data }) => {
  console.log(data);
  const [state, setState] = useContext(GlobalState);

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

  return (
    <div>
      <div className="d-flex flex-wrap flex-md-nowrap justify-content-md-start  justify-content-center align-items-end">
        <Image
          src={data?.snippet?.thumbnails?.high?.url || data?.src || AlbumArt}
          // height="300px"
          // width="300px"
          fluid
          className="p-3"
        />

        <div className="text-left">
          <h1 className="title">
            {data?.snippet?.title?.slice(0, 70)
              ? data?.snippet?.title?.slice(0, 70) + " ..."
              : data?.title}
          </h1>

          {/* <p>
            Label <span>Year</span>
          </p>
          <p>Various Artists</p>
          <p>
            {data?.songs ? data?.songs?.length + " Tracks " : ""}
            <span>duration sec</span>
          </p> */}

          <div className="d-inline-flex flex-wrap align-items-center justify-content-md-start justify-content-center">
            <Button onClick={() => callPlay(data)} className="btn btn_solid">
              Play/Pause
            </Button>
            {/* <p>Favourite Button</p> */}
            {/* <p>Menu Button</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDetail;
