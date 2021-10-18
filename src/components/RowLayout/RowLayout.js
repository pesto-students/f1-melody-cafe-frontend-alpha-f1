import React from "react";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import MusicCover from "../MusicCover/MusicCover";
import "./RowLayout.scss";

const RowLayout = ({ header, items, cols, rows, type, slug }) => {
  let songItems = items?.map((item) => {
    console.log(item);
    return (
      <MusicCover
        key={item.id || item.genreSlug}
        data={item}
        type={type}
        slug={item.id || item.genreSlug || slug}
      />
    );
  });
  return (
    <div className="space-top">
      <h2 className="text-left">{header}</h2>
      <CustomCarousel items={songItems} rows={rows} cols={cols} />
      {/* <CustomCarousel>
        {children.map((item) => (
          <CustomCarouselItem>{item}</CustomCarouselItem>
        ))}
      </CustomCarousel> */}
      {/* <p>
        will be used as a row layout will have a header and the multiple Music
        Covers as childrens
      </p> */}
    </div>
  );
};

export default RowLayout;
