import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Image,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import SideBar from "../SideBar/SideBar";
import Logo from "../../assets/TheMelodyCafeLogo.gif";
import "./Header.scss";
import SearchBar from "../SearchBar/SearchBar";
import { filtersListHome } from "../../utils/constants";
import FilterBar from "../FilterBar/FilterBar";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Navbar
        fixed="top"
        // collapseOnSelect
        //expand="sm"
        // bg="dark"
        variant="dark"
        className="headerHome"
      >
        <Container fluid className="mx-2 px-4 my-2 flex-nowrap">
          <Button variant="primary" onClick={toggleShow} className="me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </Button>

          <Navbar.Brand>
            <Link to="/">
              <Image src={Logo} width="100px" height="50px" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="d-flex">
            <Nav className="me-auto">
              <SearchBar />
            </Nav>
            <Nav className="d-none d-md-flex flex-wrap">
              <Nav.Link>
                <Button variant="light">Go Ad Free</Button>
              </Nav.Link>
              <Nav.Link>
                <Button variant="light">Get Melody Plus</Button>
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <Login></Login>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <FilterBar filterList={filtersListHome} isHome={true} />
      </Navbar>
      <SideBar show={show} handleClose={handleClose} />
    </>
  );
};

export default Header;
