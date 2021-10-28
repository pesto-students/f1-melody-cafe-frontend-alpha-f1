import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import CurrentSection from "./CurrentSection";
const Routes = () => {
  return (
    <Switch>
      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:type/:slug?">
        <CurrentSection />
      </Route>
    </Switch>
  );
};

export default Routes;
