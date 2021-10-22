import React from "react";
import { Card, Container } from "react-bootstrap";
import "./MusicContainer.scss";
import AlbumArt from "../../assets/album_art_blank.jpg";
import { Link } from "react-router-dom";
const MusicContainer = ({ title, seeAllLink, items, type }) => {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between">
        {title ? <h3 className="m-card-text">{title}</h3> : ""}
        {seeAllLink ? (
          <Link
            to={{
              pathname: seeAllLink,
              state: { items: items },
            }}
          >
            <p>See All</p>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="d-flex flex-wrap align-items-center">
        {items?.map((item, _i) => (
          <Card key={_i} className="bg-secondary m-card">
            <Link
              to={{ pathname: `${type}/${item.slug}`, state: { items: items } }}
            >
              <Card.Img variant="top" src={AlbumArt} />
            </Link>
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
