import React from "react";
import { Nav, Navbar, NavDropdown, Row, Col, Container } from "react-bootstrap";
import "./FilterBar.scss";
const FilterBar = () => {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  {
    /* <p>This is a filter bar </p>
      <p>Will be of two types simple, home page and rounded ones</p> */
  }
  return (
    <Container className="nav123">
      <Nav
        // style={{ top: "50px", position: "sticky" }}
        variant="pills"
        activeKey="1"
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="1" href="#/home">
            NavLink 1 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item">
            NavLink 2 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" disabled>
            NavLink 3 content
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Dropdown" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">
            Something else here
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Container>
  );
};

export default FilterBar;
