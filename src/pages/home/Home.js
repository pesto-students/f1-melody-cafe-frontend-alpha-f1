import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import FilterBar from "../../components/FilterBar/FilterBar";
import MusicCover from "../../components/MusicCover/MusicCover";
import RowLayout from "../../components/RowLayout/RowLayout";
import "./Home.scss";

const Home = () => {
  const data = [
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
    <img className="d-block w-100" src="download.jpeg" alt="Second slide" />,
  ];

  const data2 = [
    <Link to="/album">
      <MusicCover />
    </Link>,
    <MusicCover />,
    <MusicCover />,
    <MusicCover />,
    <MusicCover />,
    <MusicCover />,
  ];

  const data3 = [
    <MusicCover isRounded={true} />,
    <MusicCover isRounded={true} />,
    <MusicCover isRounded={true} />,
    <MusicCover isRounded={true} />,
    <MusicCover isRounded={true} />,
    <MusicCover isRounded={true} />,
  ];

  return (
    <Container fluid className="backgroundColour">
      <Row>
        <Col lg={9}>
          <FilterBar />

          <Container className="space-top">
            <CustomCarousel items={data} cols={2} />
          </Container>

          <RowLayout header="test Header" items={data2} cols={5} />
          <RowLayout header="test Header 2" items={data3} cols={5} />
          <RowLayout header="test Header 2" items={data3} cols={5} />
          <RowLayout header="test Header 2" items={data3} cols={5} />
          <RowLayout header="test Header 2" items={data3} cols={5} />
          <RowLayout header="test Header 2" items={data3} cols={5} />
          <RowLayout header="test Header 2" items={data3} cols={5} />
        </Col>
        <Col lg={3} className="blue sideImage">
          <Image src="rhs_banner_v5.jpg" width={"100%"} height={"100%"} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
