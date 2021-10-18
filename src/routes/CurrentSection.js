import React from "react";
import { useLocation, useParams } from "react-router";
import FilteredDetails from "../pages/home/FilteredDetails";
import FilteredSection from "../pages/home/FilteredSection";

const CurrentSection = () => {
  let location = useLocation();
  let { type, slug, filter } = useParams();
  console.log(type, slug, filter);
  if (type === "song" || type === "playlist") {
    return <FilteredDetails title={slug} location={location} />;
  }
  if (
    type === "album" ||
    type === "radio" ||
    type === "podcast" ||
    type === "genre"
  ) {
    return <FilteredSection title={slug} location={location} />;
  }
};

export default CurrentSection;
