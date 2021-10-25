import React from "react";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import MusicCover from "../MusicCover/MusicCover";
import "./RowLayout.scss";

const RowLayout = ({ header, items, cols, rows, type, slug, isRounded }) => {
  let songItems = items?.map((item) => {
    // console.log(item);
    return (
      <MusicCover
        key={item.id || item.genreSlug}
        data={item}
        type={type}
        slug={item.id || item.genreSlug || slug}
        isRounded={isRounded}
      />
    );
  });
  return (
    <div className="space-top">
      <h3 className="text-left">{header}</h3>
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
