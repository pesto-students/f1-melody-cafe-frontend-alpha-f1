import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Carousel from "react-grid-carousel";
import "./CustomCarousel.scss";

const CustomCarousel = ({ items, cols, rows }) => {
  // const [index, setIndex] = useState(0);
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };
  // return (
  //   <Carousel fade activeIndex={index} onSelect={handleSelect}>
  //     {items.map((item) => (
  //       <Carousel.Item interval={1000}>
  //         {/* <img className="d-block w-100" src={item.src} alt="Second slide" /> */}
  //         {item}
  //         {/* <Carousel.Caption>
  //         <h3>Second slide label</h3>
  //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //       </Carousel.Caption> */}
  //       </Carousel.Item>
  //     ))}
  //     {/* <Carousel.Item interval={1000}>
  //       <img className="d-block w-100" src="download.jpeg" alt="Third slide" />
  //       <Carousel.Caption>
  //         <h3>Third slide label</h3>
  //         <p>
  //           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
  //         </p>
  //       </Carousel.Caption>
  //     </Carousel.Item>
  //     <Carousel.Item interval={1000}>
  //       <img className="d-block w-100" src="download.jpeg" alt="Third slide" />
  //       <Carousel.Caption>
  //         <h3>Third slide label</h3>
  //         <p>
  //           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
  //         </p>
  //       </Carousel.Caption>
  //     </Carousel.Item> */}
  //   </Carousel>
  // );

  const [showArrow, setShowArrow] = useState(true);

  const toggleShowArrow = (flag) => {
    setShowArrow(flag);
  };

  return (
    <div
      onMouseEnter={() => toggleShowArrow(false)}
      onMouseLeave={() => toggleShowArrow(true)}
    >
      <Carousel
        cols={cols}
        rows={rows}
        gap={20}
        loop
        // showDots
        hideArrow={showArrow}
        responsiveLayout={[
          {
            breakpoint: 1200,
            cols: 3,
          },
          {
            breakpoint: 990,
            cols: 2,
          },
        ]}
        mobileBreakpoint={670}
        // arrowRight={<ArrowBtn type="right" />}
        // arrowLeft={<ArrowBtn type="left" />}>
      >
        {items?.map((item, i) => (
          <Carousel.Item key={i}>
            <Card>{item}</Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
