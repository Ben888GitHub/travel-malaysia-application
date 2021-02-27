import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useMediaQuery } from "react-responsive";
import IconButton from "@material-ui/core/IconButton";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import landingImage from "../images/dreamstime_xxl_82982642 1.png";
import {
  Form,
  FormControl,
  CardDeck,
  Card,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Thumbs,
  // Controller,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";
import axios from "axios";
import publicIp from "public-ip";
import ThingsToDo from "./ThingsToDo";
import NearbyMap from "./NearbyMap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Partnerships from "./Partnerships";
import DownloadBrochures from "./DownloadBrochures";
import Footer from "./Footer";
SwiperCore.use([Navigation, Pagination, Thumbs, EffectCoverflow, Autoplay]);

function HomePage() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1366 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 767 }); //change back to 767
  const isTabletDevice = useMediaQuery({
    minDeviceWidth: 768, //change back to 768
    maxDeviceWidth: 1224,
  });

  const [randomPremiumAds, setRandomPremiumAds] = useState([]);
  const [randomStandardAds, setRandomStandardAds] = useState([]);
  const [merchantCreditBalance, setMerchantCreditBalance] = useState(0);
  const [merchantId, setMerchantId] = useState(0);
  const [clickOrViewUser, setClickOrViewUser] = useState("");
  const [currentBrowser, setCurrentBrowser] = useState("");
  const [currentLocation, setCurrentLocation] = useState(``);
  const [currentOS, setCurrentOS] = useState("");

  const [destData, setDestData] = useState([]);

  const [destDataFirst, setDestDataFirst] = useState({
    firstName: "",
    firstCaption: "",
  });

  const [destDataSecond, setDestDataSecond] = useState({
    secondName: "",
    secondCaption: "",
  });

  const [destDataThird, setDestDataThird] = useState({
    thirdName: "",
    thirdCaption: "",
  });

  const [destDataFourth, setDestDataFourth] = useState({
    fourthName: "",
    fourthCaption: "",
  });

  const [destDataFifth, setDestDataFifth] = useState({
    fifthName: "",
    fifthCaption: "",
  });

  // This is used to determine the length of Standard Ads
  var listOfUpdatedStandardAds = [];

  var listOfUpdatedPremiumAds = [];

  useEffect(() => {
    const fetchRandomExhibitors = async () => {
      const response = await axios.get(
        `http://localhost:1337/exhibitions-data`
      );
      var randomExhibitors =
        response.data[Math.floor(Math.random() * response.data.length)];
      console.log(randomExhibitors);

      // Random Premium Ads
      setRandomPremiumAds(randomExhibitors.premium_ads_data);

      // Random Standard Ads
      setRandomStandardAds(randomExhibitors.standard_ads_data);

      // Random Merchant Credit Balance
      setMerchantCreditBalance(randomExhibitors.creditBalance);

      // Random Merchant Id
      setMerchantId(randomExhibitors.id);

      //
      //
      // query the premium ads with "view" adsMethod
      // TODO, UNCOMMENT THIS
      randomExhibitors.premium_ads_data.map((value) => {
        console.log(value.adsMethod === "view");
        if (
          value.adsMethod === "view" ||
          value.adsMethod === "click_and_view"
        ) {
          console.log(value);
          // console.log(await publicIp.v4())
          const viewPremiumAds = async () => {
            // Check if all existed

            // todo, uncomment this
            console.log(await publicIp.v4());
            console.log(value.adsName);
            console.log(value.id);
            console.log(randomExhibitors.title);
            console.log(randomExhibitors.creditBalance); // todo, update this
            console.log(randomExhibitors.id);
            console.log(value.adsViews);
            console.log(value.premiumCreditCharge);

            // todo, don't hardcode currentBrowser, currentLocation, and currentOS

            // update the Premium adsViews every user view
            const updateAdsViews = await axios.put(
              `http://localhost:1337/premium-ads-data/${value.id}`,
              {
                adsViews: value.adsViews + 1,
              }
            );
            console.log(updateAdsViews.data);
            listOfUpdatedPremiumAds.push(
              updateAdsViews.data.premiumCreditCharge
            );

            console.log(listOfUpdatedPremiumAds);
            console.log(listOfUpdatedPremiumAds.reduce((a, b) => a + b, 0));

            // update Merchant Credit Balance from by ID
            const updateMerchantCreditBalanceById = await axios.put(
              `http://localhost:1337/exhibitions-data/${randomExhibitors.id}`,
              {
                creditBalance:
                  randomExhibitors.creditBalance - value.premiumCreditCharge,
              }
            );
            console.log(updateMerchantCreditBalanceById.data);
            console.log(updateMerchantCreditBalanceById.data.creditBalance);

            // add User who viewed on the Premium Ads
            const addPremiumViewUsers = await axios.post(
              "http://localhost:1337/premium-ads-user-views",
              {
                User: await publicIp.v4(),
                Date: new Date().toLocaleString(),
                BrowserType: "Chrome", //todo
                premiumAdsDatum: value.id,
                AdsViewed: value.adsName,
                OS: "MacOS", //todo
                Location: "Indonesia, North Sumatra", //todo
              }
            );

            console.log(addPremiumViewUsers.data);
          };
          viewPremiumAds();
        }
      });

      //
      //
      // query the standard ads with "view" adsMethod
      // TODO, UNCOMMENT THIS
      randomExhibitors.standard_ads_data.map((value) => {
        console.log(value.adsMethod === "view");
        if (
          value.adsMethod === "view" ||
          value.adsMethod === "click_and_view"
        ) {
          console.log(value);

          const viewStandardAds = async () => {
            console.log(await publicIp.v4());
            console.log(value.adsName);
            console.log(value.id);
            console.log(randomExhibitors.title);
            console.log(randomExhibitors.creditBalance); // todo, update this
            console.log(randomExhibitors.id);
            console.log(value.adsViews);
            console.log(value.standardCreditCharge);

            // todo, don't hardcode currentBrowser, currentLocation, and currentOS

            // update the Standard adsViews every user view
            const updateAdsViews = await axios.put(
              `http://localhost:1337/standard-ads-data/${value.id}`,
              {
                adsViews: value.adsViews + 1,
              }
            );
            console.log(updateAdsViews.data);

            // Push the total of updateAdsViews.data
            listOfUpdatedStandardAds.push(updateAdsViews.data);

            // Query the listOfUpdatedStandardAds and its length
            console.log(listOfUpdatedStandardAds);
            console.log(listOfUpdatedStandardAds.length);

            // update Merchant Credit Balance by ID
            const updateMerchantCreditBalanceById = await axios.put(
              `http://localhost:1337/exhibitions-data/${randomExhibitors.id}`,
              {
                creditBalance:
                  randomExhibitors.creditBalance -
                  (value.standardCreditCharge *
                    listOfUpdatedStandardAds.length +
                    listOfUpdatedPremiumAds.reduce((a, b) => a + b, 0)),
              }
            );
            console.log(updateMerchantCreditBalanceById.data);
            console.log(updateMerchantCreditBalanceById.data.creditBalance);

            // update the merchantCreditBalance after deduction
            setMerchantCreditBalance(
              updateMerchantCreditBalanceById.data.creditBalance
            );

            // add User who viewed on the Standard Ads
            const addStandardViewUsers = await axios.post(
              "http://localhost:1337/standard-ads-user-views",
              {
                User: await publicIp.v4(),
                Date: new Date().toLocaleString(),
                BrowserType: "Chrome",
                standardAdsDatum: value.id,
                AdsViewed: value.adsName,
                OS: "MacOS",
                Location: "Indonesia, North Sumatra",
              }
            );
            console.log(addStandardViewUsers.data);
          };
          viewStandardAds();
        }
      });
    };
    fetchRandomExhibitors();

    // Get Current Location
    const getCurrentLocation = async () => {
      const responseCurrentLocation = await axios.get("https://ipapi.co/json");
      setCurrentLocation(
        `${responseCurrentLocation.data.country_name}, ${responseCurrentLocation.data.region}`
      );
      console.log(
        `${responseCurrentLocation.data.country_name}, ${responseCurrentLocation.data.region}`
      );
    };
    getCurrentLocation();

    // Get Current Browser
    const getCurrentBrowser = () => {
      const isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      if (isChrome) {
        console.log("Chrome");
        setCurrentBrowser("Chrome");
      } else {
        console.log("Other Browser");
        setCurrentBrowser("Chrome");
      }
    };
    getCurrentBrowser();

    // Get Current OS
    const getCurrentOS = () => {
      if (navigator.appVersion.indexOf("Win") != -1) {
        console.log("Windows");
        setCurrentOS("Windows");
      }
      if (navigator.appVersion.indexOf("Mac") != -1) {
        console.log("MacOS");
        setCurrentOS("MacOS");
      }
      if (navigator.appVersion.indexOf("X11") != -1) {
        console.log("UNIX");
        setCurrentOS("UNIX");
      }
      if (navigator.appVersion.indexOf("Linux") != -1) {
        console.log("Linux");
        setCurrentOS("Linux");
      }
    };
    getCurrentOS();

    // fetch Destinations Data from Strapi
    const fetchDestinations = async () => {
      const response = await axios.get("http://localhost:1337/destinations");
      console.log(response.data.allDestinations);
      setDestData(response.data.allDestinations);

      setDestDataFirst({
        firstName: response.data.allDestinations[0].name,
        firstCaption: response.data.allDestinations[0].alternativeText,
      });

      setDestDataSecond({
        secondName: response.data.allDestinations[1].name,
        secondCaption: response.data.allDestinations[1].alternativeText,
      });

      setDestDataThird({
        thirdName: response.data.allDestinations[2].name,
        thirdCaption: response.data.allDestinations[2].alternativeText,
      });

      setDestDataFourth({
        fourthName: response.data.allDestinations[3].name,
        fourthCaption: response.data.allDestinations[3].alternativeText,
      });

      setDestDataFifth({
        fifthName: response.data.allDestinations[4].name,
        fifthCaption: response.data.allDestinations[4].alternativeText,
      });
    };
    fetchDestinations();
  }, []);

  // clickPremiumAds, trigger when Premium Ads is clicked
  const clickPremiumAds = async (premiumAds) => {
    console.log(premiumAds.adsName);
    console.log(premiumAds.adsClicks);
    console.log(merchantCreditBalance);
    console.log(merchantId);
    console.log(currentBrowser);
    console.log(currentLocation);
    console.log(await publicIp.v4());
    console.log(currentOS);
    console.log(premiumAds.premiumCreditCharge);
    console.log(premiumAds.id);
    console.log(premiumAds.Redirection);

    // update the Premium adsClicks every user click
    const updateAdsClicks = await axios.put(
      `http://localhost:1337/premium-ads-data/${premiumAds.id}`,
      {
        adsClicks: premiumAds.adsClicks + 1,
      }
    );
    console.log(updateAdsClicks.data);

    // update Merchant Credit Balance by ID
    const updateMerchantCreditBalanceById = await axios.put(
      `http://localhost:1337/exhibitions-data/${merchantId}`,
      {
        creditBalance: merchantCreditBalance - premiumAds.premiumCreditCharge,
      }
    );
    console.log(updateMerchantCreditBalanceById.data);

    // add User who clicked on the Premium Ads
    const addPremiumClickUsers = await axios.post(
      "http://localhost:1337/premium-ads-user-clicks",
      {
        User: await publicIp.v4(),
        Date: new Date().toLocaleString(),
        BrowserType: currentBrowser,
        premiumAdsDatum: premiumAds.id,
        AdsClicked: premiumAds.adsName,
        OS: currentOS,
        Location: currentLocation,
      }
    );
    console.log(addPremiumClickUsers.data);
  };

  // clickStandardAds
  const clickStandardAds = async (standardAds) => {
    console.log(standardAds.adsName);
    console.log(standardAds.adsClicks);
    console.log(merchantCreditBalance);
    console.log(merchantId);
    console.log(currentBrowser);
    console.log(currentLocation);
    console.log(await publicIp.v4());
    console.log(currentOS);
    console.log(standardAds.standardCreditCharge);
    console.log(standardAds.id);

    // update the Standard adsClicks every user click
    const updateAdsClicks = await axios.put(
      `http://localhost:1337/standard-ads-data/${standardAds.id}`,
      {
        adsClicks: standardAds.adsClicks + 1,
      }
    );
    console.log(updateAdsClicks.data);

    // update Merchant Credit Balance by ID
    const updateMerchantCreditBalanceById = await axios.put(
      `http://localhost:1337/exhibitions-data/${merchantId}`,
      {
        creditBalance: merchantCreditBalance - standardAds.standardCreditCharge,
      }
    );
    console.log(updateMerchantCreditBalanceById.data);

    // add User who clicked on the Standard Ads
    const addStandardClickUsers = await axios.post(
      "http://localhost:1337/standard-ads-user-clicks",
      {
        User: await publicIp.v4(),
        Date: new Date().toLocaleString(),
        BrowserType: currentBrowser,
        standardAdsDatum: standardAds.id,
        AdsClicked: standardAds.adsName,
        OS: currentOS,
        Location: currentLocation,
      }
    );
    console.log(addStandardClickUsers.data);
  };

  // Put this in NavbarComponent
  const fetchExhibitorsById = async (valueId) => {
    const response = await axios.get(
      `http://localhost:1337/exhibitions-data/${valueId}`
    );
    console.log(response.data);
    console.log(response.data.premium_ads_data);
  };

  return (
    <div>
      {/* <h1>Home Page</h1> */}
      <img
        style={{ width: "100%", height: "auto" }}
        src={landingImage}
        alt="Landing Image"
      />
      <NavbarComponent fetchExhibitorsById={fetchExhibitorsById} />
      <br />
      <br />
      <div
        style={{
          width: 350,
          background: "#ffe500",
          borderRadius: 20,
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Form inline style={{ justifyContent: "center" }}>
          <FormControl
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
              width: 250,
            }}
            type="text"
            placeholder="Where do you want to go?"
            className="mr-sm-2"
          />
          {/* <Button variant="outline-success">Search</Button> */}
          <IconButton>
            <SearchRoundedIcon style={{ fontSize: 35 }} />
          </IconButton>
        </Form>
      </div>
      <br />
      <br />
      {isDesktopOrLaptop && (
        <div>
          <hr
            style={{
              width: "50%",
              textAlign: "center",
              borderColor: "black",
              borderWidth: 5,
              borderRadius: 40,
            }}
          ></hr>
          <h1 style={{ fontWeight: "bold" }}>HIGHLIGHTS</h1>
        </div>
      )}
      {isTabletDevice && (
        <div>
          <hr
            style={{
              width: "50%",
              textAlign: "center",
              borderColor: "black",
              borderWidth: 5,
              borderRadius: 40,
            }}
          ></hr>
          <h1 style={{ fontWeight: "bold" }}>HIGHLIGHTS</h1>
        </div>
      )}
      {isMobileDevice && (
        <div>
          <hr
            style={{
              width: "70%",
              textAlign: "center",
              borderColor: "black",
              borderWidth: 5,
              borderRadius: 40,
            }}
          ></hr>
          <h2 style={{ fontWeight: "bold" }}>HIGHLIGHTS</h2>
        </div>
      )}
      <br />
      <React.Fragment>
        <Swiper
          centeredSlides={true}
          grabCursor={true}
          // tag="section"
          // wrapperTag="ul"
          // id="main"
          effect="coverflow"
          // thumbs={{ swiper: thumbsSwiper }} // todo, comment this out
          loop={true}
          navigation
          pagination
          spaceBetween={20}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: -30,
            },
          }}
        >
          {randomPremiumAds.map((premiumAds) => {
            return (
              <SwiperSlide key={premiumAds.id}>
                {premiumAds.Redirection === "AdvertisingPage" ? (
                  <Link to={`/advertisingPagePremium/${premiumAds.id}`}>
                    <div
                      key={premiumAds.id}
                      onClick={() => {
                        // alert(premiumAds.adsName);
                        // console.log(premiumAds.adsMethod);
                        if (
                          premiumAds.adsMethod === "click" ||
                          premiumAds.adsMethod === "click_and_view"
                        ) {
                          clickPremiumAds(premiumAds);
                        }
                        if (premiumAds.adsMethod === "view") {
                          return;
                        }
                        if (
                          premiumAds.adsMethod === "" ||
                          premiumAds.adsMethod === undefined ||
                          premiumAds.adsMethod === null
                        ) {
                          return;
                        }
                      }}
                      key={premiumAds.id}
                      style={{
                        height: 400,
                        backgroundImage: `url(${premiumAds.adsImage.name})`,
                        // width: "50%",
                        borderRadius: 20,
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                ) : premiumAds.Redirection === "ExhibitionPage" ? (
                  <Link to={`/exhibitionPage/${merchantId}`}>
                    <div
                      onClick={() => {
                        // alert(premiumAds.adsName);
                        // console.log(premiumAds.adsMethod);
                        if (
                          premiumAds.adsMethod === "click" ||
                          premiumAds.adsMethod === "click_and_view"
                        ) {
                          clickPremiumAds(premiumAds);
                        }
                        if (premiumAds.adsMethod === "view") {
                          return;
                        }
                        if (
                          premiumAds.adsMethod === "" ||
                          premiumAds.adsMethod === undefined ||
                          premiumAds.adsMethod === null
                        ) {
                          return;
                        }
                      }}
                      key={premiumAds.id}
                      style={{
                        height: 400,
                        backgroundImage: `url(${premiumAds.adsImage.name})`,
                        // width: "50%",
                        borderRadius: 20,
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                ) : premiumAds.Redirection === "ExternalLinks" ? (
                  [
                    premiumAds.externalLink === "" ||
                    premiumAds.externalLink === null ||
                    premiumAds.externalLink === undefined ? (
                      <Link to="/externalLinkUnknown">
                        <div
                          onClick={() => {
                            // alert(premiumAds.adsName);
                            // console.log(premiumAds.adsMethod);
                            if (
                              premiumAds.adsMethod === "click" ||
                              premiumAds.adsMethod === "click_and_view"
                            ) {
                              clickPremiumAds(premiumAds);
                            }
                            if (premiumAds.adsMethod === "view") {
                              return;
                            }
                            if (
                              premiumAds.adsMethod === "" ||
                              premiumAds.adsMethod === undefined ||
                              premiumAds.adsMethod === null
                            ) {
                              return;
                            }
                          }}
                          key={premiumAds.id}
                          style={{
                            height: 400,
                            backgroundImage: `url(${premiumAds.adsImage.name})`,
                            // width: "50%",
                            borderRadius: 20,
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    ) : (
                      <a href={premiumAds.externalLink}>
                        <div
                          onClick={() => {
                            // alert(premiumAds.adsName);
                            // console.log(premiumAds.adsMethod);
                            if (
                              premiumAds.adsMethod === "click" ||
                              premiumAds.adsMethod === "click_and_view"
                            ) {
                              clickPremiumAds(premiumAds);
                            }
                            if (premiumAds.adsMethod === "view") {
                              return;
                            }
                            if (
                              premiumAds.adsMethod === "" ||
                              premiumAds.adsMethod === undefined ||
                              premiumAds.adsMethod === null
                            ) {
                              return;
                            }
                          }}
                          key={premiumAds.id}
                          style={{
                            height: 400,
                            backgroundImage: `url(${premiumAds.adsImage.name})`,
                            // width: "50%",
                            borderRadius: 20,
                            cursor: "pointer",
                          }}
                        />
                      </a>
                    ),
                  ]
                ) : null}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </React.Fragment>
      <br />
      <br />
      <br />
      <div className="row justify-content-center" style={{ marginBottom: 40 }}>
        <CardDeck style={{ width: "80rem" }}>
          {randomStandardAds.map((standardAds) => {
            return (
              <Card
                style={{ borderRadius: 20, cursor: "pointer" }}
                key={standardAds.id}
              >
                {standardAds.Redirection === "AdvertisingPage" ? (
                  <Link
                    onClick={() => {
                      if (
                        standardAds.adsMethod === "click" ||
                        standardAds.adsMethod === "click_and_view"
                      ) {
                        clickStandardAds(standardAds);
                      }
                      if (standardAds.adsMethod === "view") {
                        return;
                      }
                      if (
                        standardAds.adsMethod === "" ||
                        standardAds.adsMethod === undefined ||
                        standardAds.adsMethod === null
                      ) {
                        return;
                      }
                    }}
                    to={`/advertisingPageStandard/${standardAds.id}`}
                  >
                    <Card.Img
                      style={{
                        height: 300,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                      variant="top"
                      src={standardAds.adsImage.name}
                    />
                    <Card.ImgOverlay>
                      {/* <Card.Text> */}
                      <Link
                        onClick={() => {
                          if (
                            standardAds.adsMethod === "click" ||
                            standardAds.adsMethod === "click_and_view"
                          ) {
                            clickStandardAds(standardAds);
                          }
                          if (standardAds.adsMethod === "view") {
                            return;
                          }
                        }}
                        to={`/advertisingPageStandard/${standardAds.id}`}
                      >
                        <h2 style={{ fontWeight: "bold", color: "white" }}>
                          {standardAds.adsName}
                        </h2>
                      </Link>
                      {/* </Card.Text> */}
                    </Card.ImgOverlay>
                    <Card.Footer
                      style={{
                        background: "#ffe500",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                      }}
                    >
                      <h5>{standardAds.adsName}</h5>
                    </Card.Footer>
                  </Link>
                ) : standardAds.Redirection === "ExhibitionPage" ? (
                  <Link
                    onClick={() => {
                      if (
                        standardAds.adsMethod === "click" ||
                        standardAds.adsMethod === "click_and_view"
                      ) {
                        clickStandardAds(standardAds);
                      }
                      if (standardAds.adsMethod === "view") {
                        return;
                      }
                      if (
                        standardAds.adsMethod === "" ||
                        standardAds.adsMethod === undefined ||
                        standardAds.adsMethod === null
                      ) {
                        return;
                      }
                    }}
                    to={`/exhibitionPage/${merchantId}`}
                  >
                    <Card.Img
                      style={{
                        height: 300,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                      variant="top"
                      src={standardAds.adsImage.name}
                    />
                    <Card.ImgOverlay>
                      {/* <Card.Text> */}
                      <Link
                        onClick={() => {
                          if (
                            standardAds.adsMethod === "click" ||
                            standardAds.adsMethod === "click_and_view"
                          ) {
                            clickStandardAds(standardAds);
                          }
                          if (standardAds.adsMethod === "view") {
                            return;
                          }
                          if (
                            standardAds.adsMethod === "" ||
                            standardAds.adsMethod === undefined ||
                            standardAds.adsMethod === null
                          ) {
                            return;
                          }
                        }}
                        to={`/exhibitionPage/${merchantId}`}
                      >
                        <h2 style={{ fontWeight: "bold", color: "white" }}>
                          {standardAds.adsName}
                        </h2>
                      </Link>
                      {/* </Card.Text> */}
                    </Card.ImgOverlay>
                    <Card.Footer
                      style={{
                        background: "#ffe500",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                      }}
                    >
                      <h5>{standardAds.adsName}</h5>
                    </Card.Footer>
                  </Link>
                ) : standardAds.Redirection === "ExternalLinks" ? (
                  [
                    standardAds.externalLink === "" ||
                    standardAds.externalLink === null ||
                    standardAds.externalLink === undefined ? (
                      <Link to="/externalLinkUnknown">
                        <Card.Img
                          style={{
                            height: 300,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          }}
                          variant="top"
                          src={standardAds.adsImage.name}
                        />
                        <Card.ImgOverlay>
                          {/* <Card.Text> */}

                          <h2 style={{ fontWeight: "bold", color: "white" }}>
                            {standardAds.adsName}
                          </h2>

                          {/* </Card.Text> */}
                        </Card.ImgOverlay>
                        <Card.Footer
                          style={{
                            background: "#ffe500",
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                          }}
                        >
                          <h5>{standardAds.adsName}</h5>
                        </Card.Footer>
                      </Link>
                    ) : (
                      <a
                        onClick={() => {
                          if (
                            standardAds.adsMethod === "click" ||
                            standardAds.adsMethod === "click_and_view"
                          ) {
                            clickStandardAds(standardAds);
                          }
                          if (standardAds.adsMethod === "view") {
                            return;
                          }
                        }}
                        href={standardAds.externalLink}
                      >
                        <Card.Img
                          style={{
                            height: 300,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          }}
                          variant="top"
                          src={standardAds.adsImage.name}
                        />
                        <Card.ImgOverlay>
                          {/* <Card.Text> */}
                          <a
                            onClick={() => {
                              if (
                                standardAds.adsMethod === "click" ||
                                standardAds.adsMethod === "click_and_view"
                              ) {
                                clickStandardAds(standardAds);
                              }
                              if (standardAds.adsMethod === "view") {
                                return;
                              }
                            }}
                            href={standardAds.externalLink}
                          >
                            <h2 style={{ fontWeight: "bold", color: "white" }}>
                              {standardAds.adsName}
                            </h2>
                          </a>
                          {/* </Card.Text> */}
                        </Card.ImgOverlay>
                        <Card.Footer
                          style={{
                            background: "#ffe500",
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                          }}
                        >
                          <h5>{standardAds.adsName}</h5>
                        </Card.Footer>
                      </a>
                    ),
                  ]
                ) : null}
              </Card>
            );
          })}
        </CardDeck>
      </div>
      <br />
      <br />
      <div style={{ backgroundColor: "#FFF180" }}>
        <div>
          <hr
            style={{
              width: "50%",
              textAlign: "center",
              borderColor: "black",
              borderWidth: 5,
            }}
          ></hr>
          <h1 style={{ fontWeight: "bold" }}>POPULAR PLACES</h1>
        </div>
        <br />
        <div>
          <Container>
            <Row>
              <Col style={{ marginRight: 30, marginLeft: -25 }} lg>
                <Card style={{ width: "30rem", height: "36rem" }}>
                  <Card.Img
                    style={{ height: "32.72rem" }}
                    variant="top"
                    src={destDataFirst.firstName}
                  />
                  <Card.Footer style={{ background: "#E9D403" }}>
                    <h5>{destDataFirst.firstCaption}</h5>
                  </Card.Footer>
                </Card>
                <br />
                <br />
              </Col>

              <Col style={{ marginRight: 30 }} md={true}>
                <Row>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      style={{ height: "14rem" }}
                      src={destDataSecond.secondName}
                    />
                    <Card.Footer>
                      <h5>{destDataSecond.secondCaption}</h5>
                    </Card.Footer>
                  </Card>
                </Row>
                <br />
                <Row>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      style={{ height: "14rem" }}
                      src={destDataThird.thirdName}
                    />
                    <Card.Footer>
                      <h5>{destDataThird.thirdCaption}</h5>
                    </Card.Footer>
                  </Card>
                </Row>
                <br />
              </Col>
              <br />
              <br />
              <Col style={{ marginRight: -30 }} md>
                <Row>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      style={{ height: "14rem" }}
                      src={destDataFourth.fourthName}
                      variant="top"
                    />
                    <Card.Footer>
                      <h5>{destDataFourth.fourthCaption}</h5>
                    </Card.Footer>
                  </Card>
                </Row>
                <br />
                <Row>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      style={{ height: "14rem" }}
                      src={destDataFifth.fifthName}
                      variant="top"
                    />
                    <Card.Footer>
                      <h5>{destDataFifth.fifthCaption}</h5>
                    </Card.Footer>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <br />
        <br />
      </div>

      <ThingsToDo />
      <br />
      <br />
      <NearbyMap />
      <br />
      <br />
      <Partnerships />
      <br />
      <DownloadBrochures />
      <Footer />
    </div>
  );
}

export default HomePage;
