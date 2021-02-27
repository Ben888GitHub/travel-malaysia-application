import React from "react";
import "./NearbyMap.css";

function NearbyMap() {
  return (
    <div>
      <div>
        <hr
          style={{
            width: "50%",
            textAlign: "center",
            borderColor: "black",
            borderWidth: 5,
          }}
        ></hr>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>NEARBY</h1>
      </div>

      <br />

      <div id="map-container-google-1" className="z-depth-1-half map-container">
        <iframe
          src="https://maps.google.com/maps?q=kualalumpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          // style="border:0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default NearbyMap;
