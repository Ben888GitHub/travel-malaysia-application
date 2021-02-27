import React, { useState, useEffect } from "react";
import axios from "axios";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import { useMediaQuery } from "react-responsive";

function Footer() {
  const [aboutData, setAboutData] = useState([]);
  const [discoverData, setDiscoverData] = useState([]);
  const [destData, setDestData] = useState([]);
  const [thingsToDo, setThingsToDo] = useState([]);
  const [popDest, setPopDest] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1366 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 767 }); //change back to 767
  const isTabletDevice = useMediaQuery({
    minDeviceWidth: 768, //change back to 768
    maxDeviceWidth: 1224,
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      const response = await axios.get("http://localhost:1337/about");
      // console.log(response.data);
      // console.log(response.data.about_data);
      setAboutData(response.data.about_data);
    };
    fetchAboutData();

    const fetchDnp = async () => {
      const response = await axios.get(
        "http://localhost:1337/discover-new-places"
      );
      // console.log(response.data);
      // console.log(response.data.title);
      setDiscoverData(response.data.discover_data);
      // console.log(response.data.discover_data[0].title);
      // console.log(response.data.discover_data[1].title);
    };
    fetchDnp();

    const fetchDestinations = async () => {
      const response = await axios.get("http://localhost:1337/destinations");
      // console.log(response.data);
      // console.log(response.data.allDestinations);
      setDestData(response.data.destinations_data);
    };
    fetchDestinations();

    const fetchThingsToDo = async () => {
      const response = await axios.get("http://localhost:1337/things-to-do");
      // console.log(response.data.things_to_do_data);
      setThingsToDo(response.data.things_to_do_data);
      // console.log(response.data.ThingsToDo);
    };
    fetchThingsToDo();

    const newPopularDestinations = async () => {
      const response = await axios.get(
        "http://localhost:1337/popular-destinations"
      );
      // console.log(response.data);
      // console.log(response.data.title);
      setPopDest(response.data.pop_dest_data);
      // console.log(response.data.pop_dest_data[0].title);
      // console.log(response.data.pop_dest_data[1].title);
    };
    newPopularDestinations();
  }, []);

  return (
    <footer
      style={{ backgroundColor: "#252525" }}
      className="text-center text-lg-start"
    >
      {isDesktopOrLaptop && (
        <div className="container p-5">
          <div style={{ marginLeft: -100 }} className="row">
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0" style={{ color: "#ffe401" }}>
                About
              </h5>
              <ul className="list-unstyled">
                {aboutData.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Discover
              </h5>

              <ul className="list-unstyled">
                {discoverData.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Destinations
              </h5>

              <ul className="list-unstyled">
                {destData.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Things to do
              </h5>

              <ul className="list-unstyled">
                {thingsToDo.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Popular
              </h5>

              <ul className="list-unstyled">
                {popDest.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              style={{ marginRight: -100 }}
              className="col-lg-3 col-md-5 mb-4 mb-md-0"
            >
              <h4 className="text-light">Terms & Conditions Privacy Policy</h4>

              <InstagramIcon style={{ color: "white", margin: 20 }} />
              <FacebookIcon style={{ color: "white", margin: 20 }} />
              <TwitterIcon style={{ color: "white", margin: 20 }} />

              <p style={{ color: "#ffe401" }}>
                {" "}
                © 2020 Copyright: MDBootstrap.com
              </p>
            </div>
          </div>
        </div>
      )}

      {isTabletDevice && (
        <div className="container p-5">
          <div className="row">
            <div className="col-lg-4 col-md-3 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0" style={{ color: "#ffe401" }}>
                About
              </h5>
              <ul className="list-unstyled">
                {aboutData.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Discover
              </h5>

              <ul className="list-unstyled">
                {discoverData.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Destinations
              </h5>

              <ul className="list-unstyled">
                {destData.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-4 col-md-3 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Things to do
              </h5>

              <ul className="list-unstyled">
                {thingsToDo.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
              <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
                Popular
              </h5>

              <ul className="list-unstyled">
                {popDest.map((value) => {
                  return (
                    <li key={value.id}>
                      <a
                        style={{ color: "#ffe401" }}
                        href="#!"
                        className="text-light"
                      >
                        {value.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
              <h4 className="text-light">Terms & Conditions Privacy Policy</h4>

              <InstagramIcon style={{ color: "white", margin: 20 }} />
              <FacebookIcon style={{ color: "white", margin: 20 }} />
              <TwitterIcon style={{ color: "white", margin: 20 }} />

              <p style={{ color: "#ffe401" }}>
                {" "}
                © 2020 Copyright: MDBootstrap.com
              </p>
            </div>
          </div>
        </div>
      )}

      {isMobileDevice && (
        <div className="container p-5">
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0" style={{ color: "#ffe401" }}>
              About
            </h5>
            <ul className="list-unstyled">
              {aboutData.map((value) => {
                return (
                  <li key={value.id}>
                    <a
                      style={{ color: "#ffe401" }}
                      href="#!"
                      className="text-light"
                    >
                      {value.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
              Discover
            </h5>

            <ul className="list-unstyled">
              {discoverData.map((value) => {
                return (
                  <li key={value.id}>
                    <a
                      style={{ color: "#ffe401" }}
                      href="#!"
                      className="text-light"
                    >
                      {value.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
              Destinations
            </h5>

            <ul className="list-unstyled">
              {destData.map((value) => {
                return (
                  <li key={value.id}>
                    <a
                      style={{ color: "#ffe401" }}
                      href="#!"
                      className="text-light"
                    >
                      {value.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
              Things to do
            </h5>

            <ul className="list-unstyled">
              {thingsToDo.map((value) => {
                return (
                  <li key={value.id}>
                    <a
                      style={{ color: "#ffe401" }}
                      href="#!"
                      className="text-light"
                    >
                      {value.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 style={{ color: "#ffe401" }} className="text-uppercase mb-0">
              Popular
            </h5>

            <ul className="list-unstyled">
              {popDest.map((value) => {
                return (
                  <li key={value.id}>
                    <a
                      style={{ color: "#ffe401" }}
                      href="#!"
                      className="text-light"
                    >
                      {value.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            // style={{ marginRight: -100 }}
            className="col-lg-3 col-md-5 mb-4 mb-md-0"
          >
            <h4 className="text-light">Terms & Conditions Privacy Policy</h4>

            <InstagramIcon style={{ color: "white", margin: 20 }} />
            <FacebookIcon style={{ color: "white", margin: 20 }} />
            <TwitterIcon style={{ color: "white", margin: 20 }} />

            <p style={{ color: "#ffe401" }}>
              {" "}
              © 2020 Copyright: MDBootstrap.com
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;

{
  /* <div
        class="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a class="text-dark" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div> */
}

{
  /* <li>
                <a style={{ color: "#ffe401" }} href="#!" class="text-light">
                  Link 1
                </a>
              </li>
              <li>
                <a style={{ color: "#ffe401" }} href="#!" class="text-light">
                  Link 2
                </a>
              </li>
              <li>
                <a style={{ color: "#ffe401" }} href="#!" class="text-light">
                  Link 3
                </a>
              </li>
              <li>
                <a style={{ color: "#ffe401" }} href="#!" class="text-light">
                  Link 4
                </a>
              </li> */
}
