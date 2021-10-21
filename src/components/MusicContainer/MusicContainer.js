import React from "react";
import { Card, Container } from "react-bootstrap";
import "./MusicContainer.scss";
import AlbumArt from "../../assets/album_art_blank.jpg";
import { Link } from "react-router-dom";
const MusicContainer = ({ title, seeAllLink, items }) => {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="m-card-text">{title}</h3>
        <Link to={seeAllLink}>
          <p>See All</p>
        </Link>
      </div>
      <div className="d-flex flex-wrap align-items-center">
        {items?.map((item) => (
          <Card className="bg-secondary m-card">
            <Card.Img variant="top" src={AlbumArt} />
            <Card.Body>
              <p className="m-card-text">{item.title}</p>
              {/* <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default MusicContainer;
