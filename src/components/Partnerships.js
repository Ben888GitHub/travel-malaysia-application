import React, { useState, useEffect } from "react";
import Ticker from "react-ticker";
import whatsAppImg from "../images/whatsapp-icon-ruy.png";
import wholeFoodsImg from "../images/purepng.com-whole-foods-market-logologobrand-logoiconslogos-251519939974dxh1f.png";
import dreamworksImg from "../images/dreamwork-logo-him.png";
import burgerKing from "../images/burger-king-logo-xua.png";
import instagramImg from "../images/21502363075irgstsx7vrabhcrpn3sywzemi6sm5qq1d9b81jzhbcswluxizu5cbah444kkikmuez1ldpmqbqbx250hgo78d6om43w0os0nqcff.png";
import appleImg from "../images/21502362885rmhziap3wm5w0jogfdubr1fgyzuycu5rqkam39wjhh7yhmcncxka3vxq3xglitq4iwze8v0gpi1wmolyrtqkts57kit8ibyd2apb.png";
import gapImg from "../images/purepng.com-gap-logologobrand-logoiconslogos-251519940319xyfff.png";
import f1Img from "../images/purepng.com-formula-1-logoformula-1logonew2018-21529676510t61kq.png";
import "./Partnerships.scss";

function Partnerships() {
  const allImages = [
    { image: whatsAppImg },
    { image: wholeFoodsImg },
    { image: dreamworksImg },
    { image: burgerKing },
    { image: instagramImg },
    { image: appleImg },
    { image: gapImg },
    { image: f1Img },
  ];

  const [runTicker, setRunTicker] = useState(true);

  return (
    <div>
      <br />
      <hr
        style={{
          width: "80%",
          textAlign: "center",
          borderColor: "black",
          borderWidth: 5,
          margin: "0 auto",
        }}
      ></hr>
      <br />
      <div
        className="ticker"
        style={{
          width: "80%",
          justifyContent: "center",
          margin: "0 auto",
          // height: 120,
        }}
        onMouseEnter={() => {
          setRunTicker(false);
        }}
        onMouseLeave={() => {
          setRunTicker(true);
        }}
      >
        <Ticker style={{ height: 270 }} offset="run-in" move={runTicker}>
          {() => (
            <div>
              {allImages.map((value) => {
                return (
                  <img
                    key={value.image}
                    className="ticker_content"
                    style={{ width: 100 }}
                    src={value.image}
                  />
                );
              })}
            </div>
          )}
        </Ticker>
      </div>
    </div>
  );
}

export default Partnerships;
