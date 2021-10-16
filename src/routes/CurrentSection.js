import React from "react";
import { useParams } from "react-router";
import FilteredDetails from "../pages/home/FilteredDetails";
import FilteredSection from "../pages/home/FilteredSection";

const CurrentSection = () => {
  let { id, slug, filter } = useParams();
  console.log(id, slug, filter);
  if (id && slug) {
    return <FilteredDetails title={slug} />;
  }
  return <FilteredSection title={id} />;
};

export default CurrentSection;
