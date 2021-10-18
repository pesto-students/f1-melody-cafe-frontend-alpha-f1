import React from "react";
import { Breadcrumb, Container, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import FilterBar from "../../components/FilterBar/FilterBar";
import "./FilteredSection.scss";
import _ from "lodash";
import RowLayout from "../../components/RowLayout/RowLayout";

const FilteredSection = ({ title, isDetails }) => {
  const playlistList = useSelector((state) => state.playlistList);
  const showPage = useSelector((state) => state.playlists.showPage);
  const cachedPlaylists = useSelector(
    (state) => state.playlists.cachedPlaylists
  );
  const renderSpecificGenre = () => {
    if (showPage !== "browse" && showPage !== false) {
      const genreInfo = _.find(playlistList, { genreSlug: showPage });
      return (
        <RowLayout
          header={`${genreInfo?.genreTitle} Playlists`}
          items={_.map(cachedPlaylists[showPage], (item) => item)}
          cols={4}
          type="playlist"
          slug={showPage}
        />
      );
    }
  };

  return (
    <Container fluid className="space-top2 backgroundColour">
      <Row>
        <Col xs={12} md={12} xl={9}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="">Library</Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-left">{title}</h1>
          <FilterBar />
          <div className="container-d">{renderSpecificGenre()}</div>
        </Col>
        <Col xl={3} className="d-none d-xl-block blue sideImage">
          <Image src="rhs_banner_v5.jpg" width={"100%"} height={"100%"} />
        </Col>
      </Row>
    </Container>
  );
};

export default FilteredSection;
