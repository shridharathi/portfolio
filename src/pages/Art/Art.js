import React from "react";
import Masonry from "@mui/lab/Masonry";

import ART from "../../assets/art";

export default function Art() {
  return (
    <div className="fixed bottom-0 right-0 top-[calc(2vh+101px)] overflow-auto pr-[3vh] max-md:pr-[1.5vh]">
      <br />
      <Masonry columns={3} spacing={2} className="!hidden md:!block">
        {ART.map((item, index) => (
          <div key={index}>
            <img
              src={`art/${item.img}?w=162&auto=format`}
              srcSet={`art/${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              className="block w-full"
            />
          </div>
        ))}
      </Masonry>
      <Masonry columns={1} spacing={2} className="!block md:!hidden">
        {ART.map((item, index) => (
          <div key={index}>
            <img
              src={`art/${item.img}?w=162&auto=format`}
              srcSet={`art/${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              className="block w-full"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
