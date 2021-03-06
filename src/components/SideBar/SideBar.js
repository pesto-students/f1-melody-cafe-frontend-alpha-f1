import React, { useState } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import { filtersListHome } from "../../utils/constants";
import PaymentModal from "../Payment/PaymentModal";

const SideBar = ({ show, handleClose, ...props }) => {
  const [showPayment, setShowPayment] = useState(false);
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header className="bg-dark text-white" closeButton>
          <Offcanvas.Title>
            <Login></Login>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-dark text-white">
          <Button
            variant="light"
            onClick={() => {
              setShowPayment(true);
            }}
          >
            Get Melody Plus
          </Button>
          <PaymentModal
            showPayment={showPayment}
            setShowPayment={setShowPayment}
            setSkipCount={(num) => null}
          ></PaymentModal>
          <hr />
          {filtersListHome?.map((filter, _ind) =>
            !filter.subFilters ? (
              <Nav.Item key={_ind} className="text-nowrap">
                <Nav.Link eventKey={_ind}>
                  <Link to={filter.url}>{filter.name}</Link>
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
                {filter.subFilters?.map((subFilter, _subInd) => (
                  <Nav.Item key={_subInd} eventKey={`${_ind}.${_subInd}`}>
                    <Nav.Link eventKey={_subInd}>
                      <Link to={subFilter.url}>{subFilter.name}</Link>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </>
            )
          )}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
