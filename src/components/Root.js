import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
// import Sidebar from './Sidebar';
import { PAGES } from "../utils/MenuProvider";
import Controller from "./Controller";

const Root = () => {
  const [currentPage, setCurrentPage] = useState(PAGES[0]);

  const getCurrentPage = () => {
    const selectedPage = PAGES.filter((page) => {
      return page === currentPage;
    });
    return selectedPage[0].page;
  };

  return (
    <div className="root-container">
      <Row className="content m-0 p-0">
        <Col md={3} lg={2} className="sidebar m-0 p-0">
          {/* <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} /> */}
        </Col>
        <Col md={9} lg={10} className="page-container m-0 p-0">
          {/* {getCurrentPage()} */}
        </Col>
      </Row>
      <Row className="controls m-0 p-0">
        <Controller />
      </Row>
    </div>
  );
};

export default Root;
