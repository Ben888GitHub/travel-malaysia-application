import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import {
  Navbar,
  Nav,
  Col,
  Row,
  Container,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import publicIp from "public-ip";
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import * as timeago from "timeago.js";
import DownloadBrochures from "./DownloadBrochures";
import Footer from "./Footer";
SwiperCore.use([Navigation, Pagination, Thumbs, EffectCoverflow, Autoplay]);

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1366 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1366, min: 768 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function ExhibitionPage() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1366 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 767 }); //change back to 767
  const isTabletDevice = useMediaQuery({
    minDeviceWidth: 768, //change back to 768
    maxDeviceWidth: 1224,
  });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  const [premiumAds, setPremiumAds] = useState([]);
  const [randomStandardAds, setRandomStandardAds] = useState({
    adsName: "",
    adsImage: "",
    adsId: 0,
    adsClicks: 0,
    adsViews: 0,
    standardCreditCharge: 0,
    adsRedirection: "",
    adsExternalLink: "",
    adsMethod: "",
  });
  const [merchantCreditBalance, setMerchantCreditBalance] = useState(0);
  const [merchantId, setMerchantId] = useState(0);
  const [clickOrViewUser, setClickOrViewUser] = useState("");
  const [currentBrowser, setCurrentBrowser] = useState("");
  const [currentLocation, setCurrentLocation] = useState(``);
  const [currentOS, setCurrentOS] = useState("");

  const [merchantLogo, setMerchantLogo] = useState("");
  const [merchantTitle, setMerchantTitle] = useState("");
  const [merchantLocation, setMerchantLocation] = useState("");
  const [merchantShortText, setMerchantShortText] = useState("");
  const [merchantContent, setMerchantContent] = useState("");
  const [merchantTopImages, setMerchantTopImages] = useState([]);
  const [merchantLandingImage, setMerchantLandingImage] = useState("");
  const [merchantArticleData, setMerchantArticleData] = useState([]);

  const { exId } = useParams();

  const [updatedCreditBalance, setUpdatedCreditBalance] = useState(0);

  var listOfStandardAdsCharge = 0;

  var listOfPremiumAdsCharge = [];

  useEffect(() => {
    const fetchExhibitorsById = async () => {
      const response = await axios.get(
        `http://localhost:1337/exhibitions-data/${exId}`
      );
      console.log(response.data);
      console.log(response.data.premium_ads_data);
      console.log(response.data.standard_ads_data);
      console.log(response.data.standard_ads_data);
      console.log(response.data.creditBalance);
      console.log(response.data.id);
      console.log(response.data.articles_data);

      // Premium Ads
      setPremiumAds(response.data.premium_ads_data);

      // Merchant Credit Balance
      setMerchantCreditBalance(response.data.creditBalance);

      // Merchant Id
      setMerchantId(response.data.id);

      // Merchant Article Data
      setMerchantArticleData(response.data.articles_data);

      // query the premium ads with "view" adsMethod
      // TODO, UNCOMMENT THIS
      response.data.premium_ads_data.map((value) => {
        // console.log(value.adsMethod === "view");
        if (
          value.adsMethod === "view" ||
          value.adsMethod === "click_and_view"
        ) {
          console.log(value.premiumCreditCharge);
          listOfPremiumAdsCharge.push(value.premiumCreditCharge);
          console.log(listOfPremiumAdsCharge);
          console.log(listOfPremiumAdsCharge.reduce((a, b) => a + b, 0));

          const viewPremiumAds = async () => {
            console.log(value.adsName);
            console.log(value.adsViews);
            console.log(response.data.creditBalance);
            console.log(response.data.id);
            console.log(value.premiumCreditCharge);

            // update the Premium adsViews every user view
            const updateAdsViews = await axios.put(
              `http://localhost:1337/premium-ads-data/${value.id}`,
              {
                adsViews: value.adsViews + 1,
              }
            );
            console.log(updateAdsViews.data);
            console.log(updateAdsViews.data.premiumCreditCharge);

            // update Merchant Credit Balance by ID
            const updateMerchantCreditBalanceById = await axios.put(
              `http://localhost:1337/exhibitions-data/${response.data.id}`,
              {
                creditBalance:
                  response.data.creditBalance -
                  listOfPremiumAdsCharge.reduce((a, b) => a + b, 0) -
                  listOfStandardAdsCharge,
              }
            );
            console.log(updateMerchantCreditBalanceById.data);
            setMerchantCreditBalance(
              updateMerchantCreditBalanceById.data.creditBalance
            );

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

      // Randomly display one data from Standard Ads
      let randomStandardData =
        response.data.standard_ads_data[
          Math.floor(Math.random() * response.data.standard_ads_data.length)
        ];
      console.log(randomStandardData);
      console.log(randomStandardData.adsName);
      console.log(randomStandardData.adsMethod);
      console.log(randomStandardData.adsImage.name);
      console.log(randomStandardData.standardCreditCharge);
      console.log(randomStandardData.Redirection);
      console.log(randomStandardData.externalLink);
      // console.log(randomStandardData)

      setRandomStandardAds({
        adsName: randomStandardData.adsName,
        adsImage: randomStandardData.adsImage.name,
        adsId: randomStandardData.id,
        adsClicks: randomStandardData.adsClicks,
        adsViews: randomStandardData.adsViews,
        standardCreditCharge: randomStandardData.standardCreditCharge,
        adsRedirection: randomStandardData.Redirection,
        adsExternalLink: randomStandardData.externalLink,
        adsMethod: randomStandardData.adsMethod,
      });

      // query the standard ads with "view" adsMethod
      // TODO, UNCOMMENT THIS
      if (
        randomStandardData.adsMethod === "view" ||
        randomStandardData.adsMethod === "click_and_view"
      ) {
        // console.log(randomStandardData.adsName);

        const viewStandardAds = async () => {
          console.log(await publicIp.v4());
          console.log(randomStandardData.adsName);
          console.log(randomStandardData.id);
          console.log(response.data.title);
          console.log(response.data.creditBalance); // todo, update this
          console.log(response.data.id);
          console.log(randomStandardData.adsViews);
          console.log(randomStandardData.standardCreditCharge);
          listOfStandardAdsCharge = randomStandardData.standardCreditCharge;
          console.log(listOfStandardAdsCharge);

          setUpdatedCreditBalance(randomStandardData.standardCreditCharge);

          // update the Standard adsViews every user view
          const updateAdsViews = await axios.put(
            `http://localhost:1337/standard-ads-data/${randomStandardData.id}`,
            {
              adsViews: randomStandardData.adsViews + 1,
            }
          );
          console.log(updateAdsViews.data);

          // update Merchant Credit Balance by ID
          // const updateMerchantCreditBalanceById = await axios.put(
          //   `http://localhost:1337/exhibitions-data/${response.data.id}`,
          //   {
          //     creditBalance:
          //       response.data.creditBalance -
          //       randomStandardData.standardCreditCharge,
          //   }
          // );
          // console.log(updateMerchantCreditBalanceById.data);

          // add User who viewed on the Standard Ads
          const addStandardViewUsers = await axios.post(
            "http://localhost:1337/standard-ads-user-views",
            {
              User: await publicIp.v4(),
              Date: new Date().toLocaleString(),
              BrowserType: "Chrome",
              standardAdsDatum: randomStandardData.id,
              AdsViewed: randomStandardData.adsName,
              OS: "MacOS",
              Location: "Indonesia, North Sumatra",
            }
          );
          console.log(addStandardViewUsers.data);
        };
        viewStandardAds();
      }
      //
      //

      setMerchantLogo(response.data.companyLogo.name);
      setMerchantTitle(response.data.title);
      setMerchantLocation(response.data.location);
      setMerchantShortText(response.data.shortText);
      setMerchantContent(response.data.content);
      setMerchantTopImages(response.data.topImages);
      setMerchantLandingImage(response.data.landingImage.name);
    };
    fetchExhibitorsById();

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
  }, []);

  // Todo, do the similar things like useEffect() above 👍
  const fetchExhibitorsById = async (valueId) => {
    const response = await axios.get(
      `http://localhost:1337/exhibitions-data/${valueId}`
    );
    console.log(response.data);
    console.log(response.data.premium_ads_data);
    console.log(response.data.standard_ads_data);
    console.log(response.data.standard_ads_data);
    console.log(response.data.creditBalance);
    console.log(response.data.id);
    console.log(response.data.articles_data);

    // Premium Ads
    setPremiumAds(response.data.premium_ads_data);

    // Merchant Credit Balance
    setMerchantCreditBalance(response.data.creditBalance);

    // Merchant Id
    setMerchantId(response.data.id);

    // Merchant Article Data
    setMerchantArticleData(response.data.articles_data);

    // query the premium ads with "view" adsMethod
    // TODO, UNCOMMENT THIS
    response.data.premium_ads_data.map((value) => {
      // console.log(value.adsMethod === "view");
      if (value.adsMethod === "view" || value.adsMethod === "click_and_view") {
        console.log(value.premiumCreditCharge);
        listOfPremiumAdsCharge.push(value.premiumCreditCharge);
        console.log(listOfPremiumAdsCharge);
        console.log(listOfPremiumAdsCharge.reduce((a, b) => a + b, 0));

        const viewPremiumAds = async () => {
          console.log(value.adsName);
          console.log(value.adsViews);
          console.log(response.data.creditBalance);
          console.log(response.data.id);
          console.log(value.premiumCreditCharge);

          // update the Premium adsViews every user view
          const updateAdsViews = await axios.put(
            `http://localhost:1337/premium-ads-data/${value.id}`,
            {
              adsViews: value.adsViews + 1,
            }
          );
          console.log(updateAdsViews.data);
          console.log(updateAdsViews.data.premiumCreditCharge);

          // update Merchant Credit Balance by ID
          const updateMerchantCreditBalanceById = await axios.put(
            `http://localhost:1337/exhibitions-data/${response.data.id}`,
            {
              creditBalance:
                response.data.creditBalance -
                listOfPremiumAdsCharge.reduce((a, b) => a + b, 0) -
                listOfStandardAdsCharge,
            }
          );
          console.log(updateMerchantCreditBalanceById.data);
          setMerchantCreditBalance(
            updateMerchantCreditBalanceById.data.creditBalance
          );

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

    // Randomly display one data from Standard Ads
    let randomStandardData =
      response.data.standard_ads_data[
        Math.floor(Math.random() * response.data.standard_ads_data.length)
      ];
    console.log(randomStandardData);
    console.log(randomStandardData.adsName);
    console.log(randomStandardData.adsMethod);
    console.log(randomStandardData.adsImage.name);
    console.log(randomStandardData.standardCreditCharge);
    console.log(randomStandardData.Redirection);
    console.log(randomStandardData.externalLink);

    setRandomStandardAds({
      adsName: randomStandardData.adsName,
      adsImage: randomStandardData.adsImage.name,
      adsId: randomStandardData.id,
      adsClicks: randomStandardData.adsClicks,
      adsViews: randomStandardData.adsViews,
      standardCreditCharge: randomStandardData.standardCreditCharge,
      adsRedirection: randomStandardData.Redirection,
      adsExternalLink: randomStandardData.externalLink,
      adsMethod: randomStandardData.adsMethod,
    });

    // query the standard ads with "view" adsMethod
    // TODO, UNCOMMENT THIS
    if (
      randomStandardData.adsMethod === "view" ||
      randomStandardData.adsMethod === "click_and_view"
    ) {
      // console.log(randomStandardData.adsName);

      const viewStandardAds = async () => {
        console.log(await publicIp.v4());
        console.log(randomStandardData.adsName);
        console.log(randomStandardData.id);
        console.log(response.data.title);
        console.log(response.data.creditBalance); // todo, update this
        console.log(response.data.id);
        console.log(randomStandardData.adsViews);
        console.log(randomStandardData.standardCreditCharge);
        listOfStandardAdsCharge = randomStandardData.standardCreditCharge;

        // update the Standard adsViews every user view
        const updateAdsViews = await axios.put(
          `http://localhost:1337/standard-ads-data/${randomStandardData.id}`,
          {
            adsViews: randomStandardData.adsViews + 1,
          }
        );
        console.log(updateAdsViews.data);

        // update Merchant Credit Balance by ID
        // const updateMerchantCreditBalanceById = await axios.put(
        //   `http://localhost:1337/exhibitions-data/${response.data.id}`,
        //   {
        //     creditBalance:
        //       response.data.creditBalance -
        //       randomStandardData.standardCreditCharge,
        //   }
        // );
        // console.log(updateMerchantCreditBalanceById.data);

        // add User who viewed on the Standard Ads
        const addStandardViewUsers = await axios.post(
          "http://localhost:1337/standard-ads-user-views",
          {
            User: await publicIp.v4(),
            Date: new Date().toLocaleString(),
            BrowserType: "Chrome",
            standardAdsDatum: randomStandardData.id,
            AdsViewed: randomStandardData.adsName,
            OS: "MacOS",
            Location: "Indonesia, North Sumatra",
          }
        );
        console.log(addStandardViewUsers.data);
      };
      viewStandardAds();
    }
    //
    //
    setMerchantLogo(response.data.companyLogo.name);
    setMerchantTitle(response.data.title);
    setMerchantLocation(response.data.location);
    setMerchantShortText(response.data.shortText);
    setMerchantContent(response.data.content);
    setMerchantTopImages(response.data.topImages);
    setMerchantLandingImage(response.data.landingImage.name);

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
  };
  // Todo 👆

  // clickPremiumAds, trigger when Premium Ads is clicked
  const clickPremiumAds = async (ads) => {
    console.log(ads.adsName);
    console.log(ads.adsClicks);
    console.log(merchantCreditBalance);
    console.log(merchantId);
    console.log(await publicIp.v4());
    console.log(currentBrowser);
    console.log(currentLocation);
    console.log(currentOS);
    console.log(ads.premiumCreditCharge);
    console.log(ads.id);

    // update the Premium adsClicks every user click
    const updateAdsClicks = await axios.put(
      `http://localhost:1337/premium-ads-data/${ads.id}`,
      {
        adsClicks: ads.adsClicks + 1,
      }
    );
    console.log(updateAdsClicks.data);

    // update the Merchant Credit Balance by ID
    const updateMerchantCreditBalanceById = await axios.put(
      `http://localhost:1337/exhibitions-data/${merchantId}`,
      {
        creditBalance: merchantCreditBalance - ads.premiumCreditCharge,
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
        premiumAdsDatum: ads.id,
        AdsClicked: ads.adsName,
        OS: currentOS,
        Location: currentLocation,
      }
    );
    console.log(addPremiumClickUsers.data);
  };

  // clickStandardAds, trigger when Standard Ads is clicked
  const clickStandardAds = async () => {
    console.log(randomStandardAds.adsName);
    console.log(merchantCreditBalance);
    console.log(merchantId);
    console.log(currentBrowser);
    console.log(currentLocation);
    console.log(currentOS);
    console.log(randomStandardAds.adsClicks);
    console.log(randomStandardAds.standardCreditCharge);
    console.log(randomStandardAds.adsId);
    console.log(await publicIp.v4());

    // update the Standard adsClicks every user click
    const updateAdsClicks = await axios.put(
      `http://localhost:1337/standard-ads-data/${randomStandardAds.adsId}`,
      {
        adsClicks: randomStandardAds.adsClicks + 1,
      }
    );
    console.log(updateAdsClicks.data);

    // update Merchant Credit Balance by ID
    const updateMerchantCreditBalanceById = await axios.put(
      `http://localhost:1337/exhibitions-data/${merchantId}`,
      {
        creditBalance:
          merchantCreditBalance - randomStandardAds.standardCreditCharge,
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
        standardAdsDatum: randomStandardAds.adsId,
        AdsClicked: randomStandardAds.adsName,
        OS: currentOS,
        Location: currentLocation,
      }
    );
    console.log(addStandardClickUsers.data);
  };

  return (
    <div>
      <NavbarComponent fetchExhibitorsById={fetchExhibitorsById} />
      <br />
      <br />
      <div>
        <hr
          style={{
            width: "68%",
            textAlign: "center",
            borderColor: "black",
            borderWidth: 5,
            margin: "0 auto",
          }}
        ></hr>
        {/* <h1 style={{ fontWeight: "bold", textAlign: "center" }}>COMPANY</h1> */}
      </div>
      <br />
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
          {premiumAds.map((ads) => {
            return (
              <SwiperSlide key={ads.id}>
                {ads.Redirection === "AdvertisingPage" ||
                ads.Redirection === "ExhibitionPage" ? (
                  <Link to={`/advertisingPagePremium/${ads.id}`}>
                    <div
                      onClick={() => {
                        // clickPremiumAds(ads);
                        if (
                          ads.adsMethod === "click" ||
                          ads.adsMethod === "click_and_view"
                        ) {
                          clickPremiumAds(ads);
                        }
                        if (ads.adsMethod === "view") {
                          return;
                        }
                        if (
                          ads.adsMethod === "" ||
                          ads.adsMethod === undefined ||
                          ads.adsMethod === null
                        ) {
                          return;
                        }
                      }}
                      key={ads.id}
                      style={{
                        height: 400,
                        backgroundImage: `url(${ads.adsImage.name})`,
                        // width: "50%",
                        borderRadius: 20,
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                ) : ads.Redirection === "ExternalLinks" ? (
                  [
                    ads.externalLink === "" ||
                    ads.externalLink === null ||
                    ads.externalLink === undefined ? (
                      <Link to="/externalLinkUnknown">
                        <div
                          key={ads.id}
                          style={{
                            height: 400,
                            backgroundImage: `url(${ads.adsImage.name})`,
                            // width: "50%",
                            borderRadius: 20,
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    ) : (
                      <a href={ads.externalLink}>
                        <div
                          onClick={() => {
                            // clickPremiumAds(ads);
                            if (
                              ads.adsMethod === "click" ||
                              ads.adsMethod === "click_and_view"
                            ) {
                              clickPremiumAds(ads);
                            }
                            if (ads.adsMethod === "view") {
                              return;
                            }
                            if (
                              ads.adsMethod === "" ||
                              ads.adsMethod === undefined ||
                              ads.adsMethod === null
                            ) {
                              return;
                            }
                          }}
                          key={ads.id}
                          style={{
                            height: 400,
                            backgroundImage: `url(${ads.adsImage.name})`,
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
      <Container>
        <Row className="justify-content-center">
          <Col>
            <img
              style={{
                width: 200,
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
              src={merchantLogo}
            />
            <br />
            <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
              {merchantTitle}
            </h1>
            <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
              {merchantLocation}
            </h1>
            <br />
            <hr
              style={{
                width: "100%",
                textAlign: "center",
                borderColor: "black",
                borderWidth: 5,
                margin: "0 auto",
              }}
            ></hr>
            <h5 style={{ marginTop: 5, textAlign: "center" }}>
              {merchantShortText}
            </h5>
            <br />
          </Col>
          {isDesktopOrLaptop && (
            <Col md={8}>
              {isPortrait ? (
                <Carousel
                  swipeable={false}
                  draggable={true}
                  //   showDots={true}
                  //   customRightArrow
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={false}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  //   removeArrowOnDeviceType={["tablet", "mobile"]}
                  //   deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                >
                  {merchantTopImages.slice(0, 3).map((value) => {
                    return (
                      <div
                        className="col d-flex justify-content-center"
                        style={{ paddingBottom: 35 }}
                      >
                        <div
                          className="card"
                          style={{
                            width: 280,
                            height: 280,
                          }}
                        >
                          <img
                            src={value.name}
                            className="card-img-top"
                            alt="..."
                            style={{
                              width: 280,
                              height: 280,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 p--2 g-4">
                  {merchantTopImages.slice(0, 3).map((value) => {
                    return (
                      <div
                        className="col d-flex justify-content-center"
                        style={{ paddingBottom: 35 }}
                      >
                        <div
                          className="card"
                          style={{
                            width: 220,
                            height: 220,
                          }}
                        >
                          <img
                            src={value.name}
                            className="card-img-top"
                            alt="..."
                            style={{
                              width: 220,
                              height: 220,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <p style={{ fontSize: 18, textAlign: "center" }}>
                {merchantContent}
              </p>
            </Col>
          )}
          {isTabletDevice && (
            <Col md={8}>
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 p--2 g-4">
                {merchantTopImages.slice(0, 3).map((value) => {
                  return (
                    <div
                      className="col d-flex justify-content-center"
                      style={{ paddingBottom: 35 }}
                    >
                      <div
                        className="card"
                        style={{
                          width: 220,
                          height: 220,
                        }}
                      >
                        <img
                          src={value.name}
                          className="card-img-top"
                          alt="..."
                          style={{
                            width: 220,
                            height: 220,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 18, textAlign: "center" }}>
                {merchantContent}
              </p>
            </Col>
          )}
          {isMobileDevice && (
            <Col md={8}>
              <Carousel
                swipeable={false}
                draggable={true}
                //   showDots={true}
                //   customRightArrow
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                //   removeArrowOnDeviceType={["tablet", "mobile"]}
                //   deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
              >
                {/* <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 p--2 g-4"> */}
                {merchantTopImages.slice(0, 3).map((value) => {
                  return (
                    <div
                      className="col d-flex justify-content-center"
                      style={{ paddingBottom: 35 }}
                    >
                      <div
                        className="card"
                        style={{
                          width: 280,
                          height: 280,
                        }}
                      >
                        <img
                          src={value.name}
                          className="card-img-top"
                          alt="..."
                          style={{
                            width: 280,
                            height: 280,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                {/* </div> */}
              </Carousel>

              <p style={{ fontSize: 18, textAlign: "center" }}>
                {merchantContent}
              </p>
            </Col>
          )}
        </Row>
      </Container>
      <br />
      <br />
      <Container>
        <h5>Articles:</h5>
        <br />
        {isDesktopOrLaptop && (
          <div>
            {isPortrait ? (
              <Carousel
                swipeable={false}
                draggable={true}
                //   showDots={true}
                //   customRightArrow
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                //   removeArrowOnDeviceType={["tablet", "mobile"]}
                //   deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
              >
                {merchantArticleData.map((value) => {
                  return (
                    <div
                      className="col d-flex justify-content-center"
                      style={{ paddingBottom: 35 }}
                    >
                      <div
                        className="card"
                        style={{
                          width: "20rem",
                          height: "30rem",
                        }}
                      >
                        <img
                          src={value.titleImages.name}
                          className="card-img-top"
                          alt="..."
                          style={{
                            height: 255,
                          }}
                        />
                        <div className="card-body">
                          {/* <Link to={`/articlePage/${value.alternativeText}`}> */}
                          <h5
                            style={{ fontWeight: 400 }}
                            className="card-title"
                          >
                            {value.title}
                          </h5>
                          {/* </Link> */}
                          <h5 className="card-text">{value.title}</h5>
                          {/* <a href="#!" class="btn btn-primary">Button</a> */}
                        </div>
                        <div className="card-footer">
                          Last Updated: {timeago.format(value.created_at)}
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {merchantArticleData.map((value) => {
                  return (
                    <div
                      className="col d-flex justify-content-center"
                      style={{ paddingBottom: 35 }}
                    >
                      <div
                        className="card"
                        style={{
                          width: "20rem",
                          height: "30rem",
                        }}
                      >
                        <img
                          src={value.titleImages.name}
                          className="card-img-top"
                          alt="..."
                          style={{
                            height: 255,
                          }}
                        />
                        <div className="card-body">
                          {/* <Link to={`/articlePage/${value.alternativeText}`}> */}
                          <h5
                            style={{ fontWeight: 400 }}
                            className="card-title"
                          >
                            {value.title}
                          </h5>
                          {/* </Link> */}
                          <h5 className="card-text">{value.title}</h5>
                          {/* <a href="#!" class="btn btn-primary">Button</a> */}
                        </div>
                        <div className="card-footer">
                          Last Updated: {timeago.format(value.created_at)}
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Container>
      <br />
      <div style={{ textAlign: "center" }} className="align-items-start">
        <h5>
          TAGS:
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              //   height: 40,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <Badge
            style={{
              //   width: "7.5%",
              //   padding: 12,
              backgroundColor: "#ffe500",
              color: "black",
            }}
          >
            Lorem Ipsum
          </Badge>{" "}
          <br />
        </h5>
      </div>
      <br />
      <br />
      <h5>------</h5>
      <br />
      <br />
      <div className="display-flex justify-content-center flex-direction-row">
        {randomStandardAds.adsRedirection === "AdvertisingPage" ||
        randomStandardAds.adsRedirection === "ExhibitionPage" ? (
          <Link to={`/advertisingPageStandard/${randomStandardAds.adsId}`}>
            <div
              //   onClick={() => clickStandardAds()}
              onClick={() => {
                if (
                  randomStandardAds.adsMethod === "click" ||
                  randomStandardAds.adsMethod === "click_and_view"
                ) {
                  clickStandardAds();
                }
                if (randomStandardAds.adsMethod === "view") {
                  return;
                }
                if (
                  randomStandardAds.adsMethod === "" ||
                  randomStandardAds.adsMethod === undefined ||
                  randomStandardAds.adsMethod === null
                ) {
                  return;
                }
              }}
              className="card"
              style={{
                width: "20rem",
                height: "20rem",
                margin: "0 auto",
              }}
            >
              <img
                src={randomStandardAds.adsImage}
                className="card-img-top"
                alt="..."
                style={{
                  height: 255,
                }}
              />
              <div className="card-body">
                <Link
                  to={`/advertisingPageStandard/${randomStandardAds.adsId}`}
                >
                  <h5
                    style={{ fontWeight: 400, textAlign: "center" }}
                    className="card-title"
                  >
                    {randomStandardAds.adsName}
                  </h5>
                </Link>
              </div>
            </div>
          </Link>
        ) : randomStandardAds.adsRedirection === "ExternalLinks" ? (
          [
            randomStandardAds.adsExternalLink === "" ||
            randomStandardAds.adsExternalLink === null ||
            randomStandardAds.adsExternalLink === undefined ? (
              <Link to="/externalLinkUnknown">
                <div
                  //   onClick={() => clickStandardAds()}
                  className="card"
                  style={{
                    width: "20rem",
                    height: "20rem",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={randomStandardAds.adsImage}
                    className="card-img-top"
                    alt="..."
                    style={{
                      height: 255,
                    }}
                  />
                  <div className="card-body">
                    <a href={randomStandardAds.adsExternalLink}>
                      <h5
                        style={{ fontWeight: 400, textAlign: "center" }}
                        className="card-title"
                      >
                        {randomStandardAds.adsName}
                      </h5>
                    </a>
                  </div>
                </div>
              </Link>
            ) : (
              <a href={randomStandardAds.adsExternalLink}>
                <div
                  //   onClick={() => clickStandardAds()}
                  onClick={() => {
                    if (
                      randomStandardAds.adsMethod === "click" ||
                      randomStandardAds.adsMethod === "click_and_view"
                    ) {
                      clickStandardAds();
                    }
                    if (randomStandardAds.adsMethod === "view") {
                      return;
                    }
                    if (
                      randomStandardAds.adsMethod === "" ||
                      randomStandardAds.adsMethod === undefined ||
                      randomStandardAds.adsMethod === null
                    ) {
                      return;
                    }
                  }}
                  className="card"
                  style={{
                    width: "20rem",
                    height: "20rem",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={randomStandardAds.adsImage}
                    className="card-img-top"
                    alt="..."
                    style={{
                      height: 255,
                    }}
                  />
                  <div className="card-body">
                    <a href={randomStandardAds.adsExternalLink}>
                      <h5
                        style={{ fontWeight: 400, textAlign: "center" }}
                        className="card-title"
                      >
                        {randomStandardAds.adsName}
                      </h5>
                    </a>
                  </div>
                </div>
              </a>
            ),
          ]
        ) : null}
      </div>
      <br />
      <br />
      <div style={{ backgroundColor: "#FFF180" }}>
        <hr
          style={{
            width: "60%",
            textAlign: "center",
            borderColor: "black",
            borderWidth: 5,
            margin: "0 auto",
          }}
        ></hr>
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
          SIMILAR LOCATION
        </h1>
        <br />
        <Container>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {merchantTopImages.slice(0, 4).map((value) => {
              return (
                <div
                  className="col d-flex justify-content-center"
                  style={{ paddingBottom: 35 }}
                >
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      height: "16rem",

                      //   marginLeft: -60,
                      //   marginLeft: 80,
                      //   marginRight: 80,
                    }}
                  >
                    <img
                      src={value.name}
                      className="card-img-top"
                      alt="..."
                      style={{
                        // borderTopLeftRadius: 40,
                        // borderTopRightRadius: 40,
                        height: 255,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <br />
        <hr
          style={{
            width: "60%",
            textAlign: "center",
            borderColor: "black",
            borderWidth: 5,
            margin: "0 auto",
          }}
        ></hr>

        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>CATEGORY</h1>
        <br />
        <Container>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {merchantTopImages.map((value) => {
              return (
                <div
                  className="col d-flex justify-content-center"
                  style={{ paddingBottom: 35 }}
                >
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      height: "16rem",

                      //   marginLeft: -60,
                      //   marginLeft: 80,
                      //   marginRight: 80,
                    }}
                  >
                    <img
                      src={value.name}
                      className="card-img-top"
                      alt="..."
                      style={{
                        // borderTopLeftRadius: 40,
                        // borderTopRightRadius: 40,
                        height: 255,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <br />
        <DownloadBrochures />
        <br />
      </div>

      <Footer />
    </div>
  );
}

export default ExhibitionPage;
