import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import axios from "axios";
import "./NavbarComponent.css";

import {
  BrowserRouter as Router,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function NavbarComponent({ fetchExhibitorsById }) {
  const [show, setShow] = useState({
    showAbout: false,
    showDiscover: false,
    showDestinations: false,
    showThingsToDo: false,
    showPopDest: false,
    showExhibitionsData: false,
  });

  const showAboutInfo = () => {
    setShow({
      showAbout: true,
    });
  };

  const hideAboutInfo = () => {
    setShow({
      showAbout: false,
    });
  };

  const showDiscoverInfo = () => {
    setShow({
      showDiscover: true,
    });
  };

  const hideDiscoverInfo = () => {
    setShow({
      showDiscover: false,
    });
  };

  const showDestinationsInfo = () => {
    setShow({
      showDestinations: true,
    });
  };

  const hideDestinationsInfo = () => {
    setShow({
      showDestinations: false,
    });
  };

  const showThingsToDoInfo = () => {
    setShow({
      showThingsToDo: true,
    });
  };

  const hideThingsToDoInfo = () => {
    setShow({
      showThingsToDo: false,
    });
  };

  const showPopDestInfo = () => {
    setShow({
      showPopDest: true,
    });
  };

  const hidePopDestInfo = () => {
    setShow({
      showPopDest: false,
    });
  };

  const showExhibitionsInfo = () => {
    setShow({
      showExhibitionsData: true,
    });
  };

  const hideExhibitionsInfo = () => {
    setShow({
      showExhibitionsData: false,
    });
  };

  const [aboutData, setAboutData] = useState([]);
  const [discoverData, setDiscoverData] = useState([]);
  const [destData, setDestData] = useState([]);
  const [thingsToDo, setThingsToDo] = useState([]);
  const [popDest, setPopDest] = useState([]);
  const [exhibitionsData, setExhibitionsData] = useState([]);

  useEffect(() => {
    /* Fetch Navbar Data from Strapi */
    const fetchNavbarData = async () => {
      // About Data
      const responseAbout = await axios.get("http://localhost:1337/about");
      setAboutData(responseAbout.data.about_data);

      // Discover New Places Data
      const responseDnp = await axios.get(
        "http://localhost:1337/discover-new-places"
      );
      setDiscoverData(responseDnp.data.discover_data);

      // Destinations Data
      const responseDestData = await axios.get(
        "http://localhost:1337/destinations"
      );
      setDestData(responseDestData.data.destinations_data);

      // Things To Do Data
      const responseThingsToDo = await axios.get(
        "http://localhost:1337/things-to-do"
      );
      setThingsToDo(responseThingsToDo.data.things_to_do_data);

      // Popular Destinations Data
      const responsePopDest = await axios.get(
        "http://localhost:1337/popular-destinations"
      );
      setPopDest(responsePopDest.data.pop_dest_data);

      // Exhibitions Data
      const responseExhibitions = await axios.get(
        "http://localhost:1337/exhibitions-data"
      );
      setExhibitionsData(responseExhibitions.data);
    };
    fetchNavbarData();
  }, []);

  return (
    <div>
      <Navbar
        style={{
          background: "#ffe500",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
        expand="lg"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavDropdown
              onMouseEnter={showAboutInfo}
              onMouseLeave={hideAboutInfo}
              show={show.showAbout}
              title={
                <h5 style={{ color: "black", fontWeight: "bold" }}>ABOUT</h5>
              }
              id="basic-nav-dropdown"
            >
              {aboutData.map((value) => {
                return (
                  <NavDropdown.Item key={value.id}>
                    {value.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown
              onMouseEnter={showDiscoverInfo}
              onMouseLeave={hideDiscoverInfo}
              show={show.showDiscover}
              title={
                <h5 style={{ color: "black", fontWeight: "bold" }}>DISCOVER</h5>
              }
              id="basic-nav-dropdown"
            >
              {discoverData.map((value) => {
                return (
                  <NavDropdown.Item key={value.id}>
                    {value.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            <NavDropdown
              onMouseEnter={showDestinationsInfo}
              onMouseLeave={hideDestinationsInfo}
              show={show.showDestinations}
              title={
                <h5 style={{ color: "black", fontWeight: "bold" }}>
                  DESTINATIONS
                </h5>
              }
              id="basic-nav-dropdown"
            >
              {destData.map((value) => {
                return (
                  <NavDropdown.Item key={value.id}>
                    {value.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            <NavDropdown
              onMouseEnter={showThingsToDoInfo}
              onMouseLeave={hideThingsToDoInfo}
              show={show.showThingsToDo}
              title={
                <h5 style={{ color: "black", fontWeight: "bold" }}>
                  THINGS TO DO
                </h5>
              }
              id="basic-nav-dropdown"
            >
              {thingsToDo.map((value) => {
                return (
                  <NavDropdown.Item key={value.id}>
                    {value.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            <NavDropdown
              onMouseEnter={showPopDestInfo}
              onMouseLeave={hidePopDestInfo}
              show={show.showPopDest}
              title={
                <h5 style={{ color: "black", fontWeight: "bold" }}>
                  POPULAR DESTINATIONS
                </h5>
              }
              id="basic-nav-dropdown"
            >
              {popDest.map((value) => {
                return (
                  <NavDropdown.Item key={value.id}>
                    {value.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>

            <NavDropdown
              onMouseEnter={showExhibitionsInfo}
              onMouseLeave={hideExhibitionsInfo}
              show={show.showExhibitionsData}
              title={
                <h5 style={{ color: "black", fontWeight: "bold" }}>
                  EXHIBITIONS
                </h5>
              }
              id="basic-nav-dropdown"
            >
              {exhibitionsData.map((value) => {
                return (
                  <NavDropdown.Item key={value.id}>
                    <Link
                      to={`/exhibitionPage/${value.id}`}
                      onClick={() => fetchExhibitorsById(value.id)}
                    >
                      {value.title}
                    </Link>

                    {/* <Nav.Link as={Link} to={`/exhibitionPage/${value.id}`}>
                      {value.title}
                    </Nav.Link> */}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
