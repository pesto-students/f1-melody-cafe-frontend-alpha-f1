import React, { useContext } from "react";
import { Image, Button } from "react-bootstrap";
import GlobalState from "../../contexts/GlobalState";
import { shufflePlaylist } from "../../utils/utils";

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
    <div className="info-sec">
      <div className="atw">
        <Image src={data?.snippet?.thumbnails?.high?.url} />
      </div>
      <div className="info">
        <div className="_a">
          <h1 className="title">
            {data?.snippet?.title?.slice(0, 70)
              ? data?.snippet?.title?.slice(0, 70) + " ..."
              : data?.title}
          </h1>
        </div>
        <div className="_b">
          {/* <span className="al_name">..desc</span>
          <span className="al_name">more desc</span>
          <span className="al_name">number of tracks</span> */}
        </div>
        <div className="_c">
          <Button onClick={() => callPlay(data)} className="btn btn_solid">
            Play/Pause
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicDetail;
