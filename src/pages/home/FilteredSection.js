import React, { useContext } from "react";
import { Breadcrumb, Container, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import MusicContainer from "../../components/MusicContainer/MusicContainer";
import FilterBar from "../../components/FilterBar/FilterBar";
import "./FilteredSection.scss";
import _ from "lodash";
import RowLayout from "../../components/RowLayout/RowLayout";
import { filtersListHome } from "../../utils/constants";
import GlobalState from "../../contexts/GlobalState";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const FilteredSection = ({ title, isDetails, location, type }) => {
  const [state, setState] = useContext(GlobalState);
  const playlistList = useSelector((state) => state.playlistList);

  const showPage = useSelector((state) => state.playlists.showPage);

  const cachedPlaylists = useSelector(
    (state) => state.playlists.cachedPlaylists
  );

  let match = location.pathname.startsWith("/my-");

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
          <Breadcrumbs />
          <h1 className="text-left">{title}</h1>
          <FilterBar filterList={filtersListHome} />
          {match ? (
            <MusicContainer items={location?.state?.items} type={type} />
          ) : (
            ""
          )}
          {renderSpecificGenre()}
        </Col>
        <Col
          xl={3}
          className={`blue sideImage ${
            state.fullscreen ? "d-none" : "d-none d-xl-block"
          }`}
        >
          <Image src="rhs_banner_v5.jpg" width={"100%"} height={"100%"} />
        </Col>
      </Row>
    </Container>
  );
};

export default FilteredSection;
