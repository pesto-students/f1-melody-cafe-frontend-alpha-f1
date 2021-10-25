import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./BreadCrumbs.scss";

const Breadcrumbs = () => {
  let history = useHistory();
  let pathnameArray = history.location.pathname.split("/");

  // console.log(history, pathnameArray);

  const breadcrumbsHandler = (e, n) => {
    e.preventDefault();
    if (n !== 0) history.go(n);
  };
  return (
    <div>
      <Breadcrumb>
        {[...Array(pathnameArray.length).keys()].map((ind) => (
          <Breadcrumb.Item
            key={ind}
            onClick={(e) =>
              breadcrumbsHandler(e, -(pathnameArray.length - ind - 1))
            }
            className="cool-link"
          >
            {pathnameArray[ind] ? pathnameArray[ind] : "home"}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
