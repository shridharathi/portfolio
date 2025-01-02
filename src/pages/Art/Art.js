import React from "react";
import Masonry from "@mui/lab/Masonry";

import "./Art.css";
import ART from "../../assets/art";

export default function Art() {
  return (
    <div className="about play-container">
      <br />
      <Masonry columns={3} spacing={2}>
        {ART.map((item, index) => (
          <div key={index} className="play-gallery">
            <img
              src={`art/${item.img}?w=162&auto=format`}
              srcSet={`art/${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
      <Masonry columns={1} spacing={2}>
        {ART.map((item, index) => (
          <div key={index} className="play-gallery-mobile">
            <img
              src={`art/${item.img}?w=162&auto=format`}
              srcSet={`art/${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}