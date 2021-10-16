import React from "react";
import { Figure } from "react-bootstrap";

const MusicCover = ({ isRounded }) => {
  return (
    // <div>
    //   <p>Will be of two variations rounded corners and rounded</p>
    //   <p>will have optionals name and artist/movie name etc </p>
    // </div>
    <Figure>
      {isRounded ? (
        <Figure.Image
          // width={171}
          // height={180}
          // alt="171x180"
          src="download.jpeg"
          roundedCircle
        />
      ) : (
        <Figure.Image
          // width={171}
          // height={180}
          // alt="171x180"
          src="download.jpeg"
          rounded
        />
      )}
      <Figure.Caption>Nulla vitae</Figure.Caption>
    </Figure>
  );
};

export default MusicCover;
