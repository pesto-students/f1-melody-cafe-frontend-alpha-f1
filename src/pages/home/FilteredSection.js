import React from "react";
import { Breadcrumb, Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterBar from "../../components/FilterBar/FilterBar";
import MusicCover from "../../components/MusicCover/MusicCover";
import "./FilteredSection.scss";

const FilteredSection = ({ title, isDetails }) => {
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
          <div className="container-d">
            {[...Array(90).keys()].map((item, ind) => (
              <Link to={`/${title}/${ind}`}>
                <MusicCover />
              </Link>
            ))}
          </div>
        </Col>
        <Col xl={3} className="d-none d-xl-block blue sideImage">
          <Image src="rhs_banner_v5.jpg" width={"100%"} height={"100%"} />
        </Col>
      </Row>
    </Container>
  );
};

export default FilteredSection;
