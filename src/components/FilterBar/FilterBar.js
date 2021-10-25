import React from "react";
import { Nav, Navbar, NavDropdown, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./FilterBar.scss";
const FilterBar = ({ filterList, isHome }) => {
  // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  {
    /* <p>This is a filter bar </p>
      <p>Will be of two types simple, home page and rounded ones</p> */
  }
  return (
    <Container fluid className={isHome ? "filter filterHome  px-4 " : "filter"}>
      <Nav
        // style={{ top: "50px", position: "sticky" }}
        variant="pills"
        activeKey="0"
        // onSelect={handleSelect}
        className="justify-content-center"
        navbarScroll={true}
      >
        {filterList?.map((filter, _ind) =>
          !filter.subFilters ? (
            <Nav.Item key={_ind} className="text-nowrap">
              <Nav.Link eventKey={_ind}>
                <Link to={filter.url}>{filter.name}</Link>
              </Nav.Link>
            </Nav.Item>
          ) : (
            <NavDropdown key={_ind} title={filter.name} id="nav-dropdown">
              {filter.subFilters?.map((subFilter, _subInd) => (
                <NavDropdown.Item key={_subInd} eventKey={`${_ind}.${_subInd}`}>
                  <Link to={subFilter.url}>{subFilter.name}</Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          )
        )}
      </Nav>
    </Container>
  );
};

export default FilterBar;
