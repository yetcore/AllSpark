import React from "react";
import "./ImageOverlay.css";
import ditu from "../assets/imgs/ditu.png";
import wenzi from "../assets/imgs/wenzi.png";

function ImageOverlay() {
  // useEffect(() => {
  //   images.forEach((src) => {
  //     const img = new Image();
  //     img.src = src;
  //   });
  // }, []);
  return (
    <div className="image-container">
      <img src={ditu} alt="ditu" className="pic1" loading="lazy" />
      <div className="transparent-overlay"></div>
      <img src={wenzi} alt="wenzi" className=" pic3" loading="lazy" />
    </div>
  );
}

export default ImageOverlay;
