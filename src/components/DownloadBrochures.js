import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import IconButton from "@material-ui/core/IconButton";
import SaveAltRoundedIcon from "@material-ui/icons/SaveAltRounded";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import FileSaver from "file-saver";
import { useMediaQuery } from "react-responsive";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1366 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
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

function DownloadBrochures() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1366 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isMobileDevice = useMediaQuery({ maxDeviceWidth: 767 }); //change back to 767
  const isTabletDevice = useMediaQuery({
    minDeviceWidth: 768, //change back to 768
    maxDeviceWidth: 1224,
  });

  const [brochureFilesData, setBrochureFilesData] = useState([]);
  const [thingsToDo, setThingsToDo] = useState([]);

  useEffect(() => {
    const fetchBrochuresData = async () => {
      const response = await axios.get("http://localhost:1337/brochures");
      // console.log(response.data.brochureFiles);
      setBrochureFilesData(response.data.brochureFiles);
    };
    fetchBrochuresData();

    const fetchThingsToDo = async () => {
      const response = await axios.get("http://localhost:1337/things-to-do");
      // console.log(response.data);
      // console.log(response.data.ThingsToDo);
      setThingsToDo(response.data.ThingsToDo);
    };
    fetchThingsToDo();
  }, []);

  const downloadPdf = async (pdfFile) => {
    try {
      await FileSaver.saveAs(pdfFile.name, `${pdfFile.caption}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff381" }}>
      <div>
        <hr
          style={{
            width: "50%",
            textAlign: "center",
            borderColor: "black",
            borderWidth: 5,
          }}
        ></hr>
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
          DOWNLOAD BROCHURES
        </h1>
      </div>
      <br />
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
        //   itemClass="carousel-item-padding-40-px"
      >
        {thingsToDo.map((pdfFile) => {
          return (
            <div
              key={pdfFile.id}
              className="d-flex justify-content-center align-items-center"
            >
              {/* <Col
                  style={{
                    marginLeft: 100,
                  }}
                > */}
              <List key={pdfFile.id}>
                <ListItem
                  alignItems="center"
                  style={
                    {
                      // padding: 10,
                      // margin: 10,
                      // textAlign: "center",
                      // alignSelf: "center",
                      //   margin: "0 auto",
                      //   marginLeft: 60,
                    }
                  }
                >
                  <ListItemAvatar>
                    <Avatar style={{ width: 110, height: 70 }} variant="square">
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ marginLeft: 20 }}
                    primary={
                      <h4 style={{ fontWeight: 600 }}>{pdfFile.caption}</h4>
                    }
                    secondary={
                      <Button
                        style={{
                          fontWeight: 600,
                          backgroundColor: "#ffe500",
                          color: "black",
                          //   border: "none",
                          borderColor: "black",
                        }}
                        onClick={() => downloadPdf(pdfFile)}
                        // onClick={() => fileDownloader(pdfFile)}
                      >
                        DOWNLOAD <GetAppRoundedIcon />
                      </Button>
                    }
                  />
                </ListItem>
              </List>
              {/* </Col> */}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default DownloadBrochures;
