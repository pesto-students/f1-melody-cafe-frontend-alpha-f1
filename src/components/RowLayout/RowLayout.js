import React from "react";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import "./RowLayout.scss";
const RowLayout = ({ header, items, cols, rows }) => {
  return (
    <div className="space-top">
      <h2 className="text-left">{header}</h2>
      <CustomCarousel items={items} rows={rows} cols={cols} />
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
