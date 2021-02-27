import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardDeck, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1366 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1366, min: 564 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 564, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function ThingsToDo() {
  const [thingsToDo, setThingsToDo] = useState([]);

  useEffect(() => {
    const fetchThingsToDo = async () => {
      const response = await axios.get("http://localhost:1337/things-to-do");
      // console.log(response.data.ThingsToDo);
      setThingsToDo(response.data.ThingsToDo);
    };
    fetchThingsToDo();
  }, []);

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1366 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 767 }); //change back to 767
  const isTabletDevice = useMediaQuery({
    minDeviceWidth: 768, //change back to 768
    maxDeviceWidth: 1224,
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: -20 }}>
        <hr
          style={{
            width: "50%",
            textAlign: "center",
            borderColor: "black",
            borderWidth: 5,
          }}
        ></hr>
        <h1 style={{ fontWeight: "bold" }}>THINGS TO DO</h1>
      </div>
      <br />
      <div>
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
          {thingsToDo.map((item) => {
            return (
              <div
                key={item.id}
                className="row justify-content-center"
                // style={{ alignItems: "center", margin: "0 auto" }}
              >
                <Card
                  style={{
                    width: "18rem",
                    height: 400,
                    // paddingLeft: 30,
                    // paddingRight: 30,
                    borderStyle: "none",
                    // spaceBetween: 10,
                    // margin: 50,
                  }}
                >
                  <Card.Img
                    style={{ height: 400 }}
                    variant="top"
                    src={item.name}
                  />
                  <Card.Body>
                    <Card.ImgOverlay>
                      {/* <Card.Text> */}
                      <h2 style={{ fontWeight: "bold", color: "white" }}>
                        {item.caption}
                      </h2>
                      {/* </Card.Text> */}
                    </Card.ImgOverlay>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </div>
    </React.Fragment>
  );
}

export default ThingsToDo;
