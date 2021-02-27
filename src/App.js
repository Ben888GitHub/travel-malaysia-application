import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/HomePage";
import axios from "axios";
import publicIp from "public-ip";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import ExhibitionPage from "./components/ExhibitionPage";
import AdvertisingPageStandard from "./components/AdvertisingPageStandard";
import AdvertisingPagePremium from "./components/AdvertisingPagePremium";
import UnknownURL from "./components/UnknownURL";
import ArticlePage from "./components/ArticlePage";

function App() {
  return (
    <div className="App">
      {/* <h1>Travel Malaysia App</h1> */}

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/exhibitionPage/:exId">
          <ExhibitionPage />
        </Route>
        <Route path="/advertisingPageStandard/:adsId">
          <AdvertisingPageStandard />
        </Route>
        <Route path="/advertisingPagePremium/:adsId">
          <AdvertisingPagePremium />
        </Route>
        <Route path="/externalLinkUnknown">
          <UnknownURL />
        </Route>
        <Route path="/articlePage/:arId">
          <ArticlePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
