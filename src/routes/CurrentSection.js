import React from "react";
import { useLocation, useParams } from "react-router";
import FilteredDetails from "../pages/home/FilteredDetails";
import FilteredSection from "../pages/home/FilteredSection";
import MyMusic from "../pages/MyMusic/MyMusic";

const CurrentSection = () => {
  let location = useLocation();
  let { type, slug, filter } = useParams();
  console.log(type, slug, filter);
  if (type === "song" || type === "playlist") {
    return <FilteredDetails title={slug} location={location} />;
  } else if (
    type === "album" ||
    type === "radio" ||
    type === "podcast" ||
    type === "genre"
  ) {
    return <FilteredSection type={type} title={type} location={location} />;
  } else if (type === "my-music") {
    return <MyMusic type="playlist" />;
  } else if (type && !slug) {
    return <FilteredSection type={type} title={type} location={location} />;
  }
};

export default CurrentSection;
