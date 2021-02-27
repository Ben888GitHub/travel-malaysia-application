import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";

function AdvertisingPageStandard() {
  const { adsId } = useParams();

  console.log(adsId);

  const [adsName, setAdsName] = useState("");
  const [adsImage, setAdsImage] = useState("");

  useEffect(() => {
    const fetchStandardAdsById = async () => {
      const response = await axios.get(
        `http://localhost:1337/standard-ads-data/${adsId}`
      );
      console.log(response.data);
      setAdsName(response.data.adsName);
      setAdsImage(response.data.adsImage.name);
    };
    fetchStandardAdsById();
  }, []);

  const fetchExhibitorsById = async (valueId) => {
    const response = await axios.get(
      `http://localhost:1337/exhibitions-data/${valueId}`
    );
    console.log(response.data);
    console.log(response.data.premium_ads_data);
  };

  return (
    <div>
      <NavbarComponent fetchExhibitorsById={fetchExhibitorsById} />
      <br />
      <h1>{adsName}</h1>
      <br />
      <div
      // style={{ margin: "0 auto" }}
      // className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
      >
        <div
          className="col d-flex justify-content-center"
          style={{ paddingBottom: 35 }}
        >
          <div
            className="card"
            style={{
              width: "20rem",
              height: "25rem",
            }}
          >
            <img
              src={adsImage}
              className="card-img-top"
              alt="..."
              style={{
                height: 255,
              }}
            />
            <div className="card-body">
              {/* <Link to={`/articlePage/${value.alternativeText}`}> */}
              <h5 style={{ fontWeight: 400 }} className="card-title">
                {adsName}
              </h5>
              {/* </Link> */}
              {/* <h5 className="card-text">{value.title}</h5> */}
              {/* <a href="#!" class="btn btn-primary">Button</a> */}
            </div>
            <div className="card-footer">{adsName}</div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdvertisingPageStandard;
