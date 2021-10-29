import React from "react";
import { Card, Container } from "react-bootstrap";
import "./MusicContainer.scss";
import AlbumArt from "../../assets/album_art_blank.jpg";
import { Link } from "react-router-dom";
import regex from "../../helpers/helper-functions";
const MusicContainer = ({ title, seeAllLink, items, type, isMyMusic }) => {
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
      <div
        className={
          isMyMusic
            ? "d-flex flex-wrap"
            : "d-flex flex-wrap justify-content-center justify-content-md-around"
        }
      >
        {items?.map((item, _i) => (
          <Card
            key={_i}
            className={`bg-secondary m-card ${
              isMyMusic ? "m-card-myMusic" : ""
            }`}
          >
            <Link
              to={{
                pathname: `${"playlist"}/${item?.snippet?.title || item?.slug}`,
                state:
                  type === "playlist"
                    ? { playlistData: item }
                    : { songData: item },
              }}
            >
              <Card.Img
                variant="top"
                src={
                  item?.playlistInfo?.youtubeThumbnail ||
                  item?.snippet?.thumbnails.high.url ||
                  AlbumArt
                }
                // width={100}
                // height={100}
                // fluid
                className="m-card-image"
              />
            </Link>
            <Card.Body>
              <p className="m-card-text">
                {regex.editTitle(
                  regex.truncate(item?.snippet?.title || item?.title)
                )}
              </p>
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
