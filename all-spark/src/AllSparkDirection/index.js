import { useState, useEffect } from "react";
import "./direction.css";
import axios from "axios";
// import largeImage1 from "../assets/imgs/dahouduan.png";
// import largeImage2 from "../assets/imgs/daqianduan.png";
// import largeImage3 from "../assets/imgs/dahouduan.png";
const baisisUrl = "http://dx98hf.natappfree.cc";
export default function Direction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [text, setText] = useState({});
  const titleList = [
    { En: "backend", Cn: "后端研发" },
    { En: "frontend", Cn: "前端研发" },
    { En: "product", Cn: "产品经理" },
    ,
  ];
  const fetchImage = async (imageName) => {
    try {
      const res = await axios.get(baisisUrl + `/api/img/${imageName}`);
      console.log(res.data);
      const imgUrl = res.data.data;
      // const imgUrl = URL.createObjectURL(res.data);
      return imgUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const fetchText = async (fileName) => {
    try {
      const res = await axios.get(baisisUrl + `/api/json/${fileName}`);
      const text = JSON.parse(res.data.data); // 解析 JSON 字符串
      console.log(text);
      return text;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  useEffect(() => {
    const loadResource = async () => {
      // const largeImage1 = await fetchImage("backend-l.png");
      // console.log(largeImage1);
      // const largeImage2 = await fetchImage("frontend-l.png");
      // const largeImage3 = await fetchImage("product-l.png");
      // const Text = await fetchText("directions.json");
      //并行加载
      const [largeImage1, largeImage2, largeImage3, Text] = await Promise.all([
        fetchImage("backend-l.png"),
        fetchImage("frontend-l.png"),
        fetchImage("product-l.png"),
        fetchText("directions.json"),
      ]);
      setImages([largeImage1, largeImage2, largeImage3]);
      setText(Text);
    };
    loadResource();
  }, []);
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="image-row">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-container ${activeIndex === index ? "active" : ""}`}
          onClick={() => handleImageClick(index)}
        >
          <div
            className={`transparent-overlay ${
              activeIndex === index ? "blue" : "black"
            }`}
          ></div>

          <img src={image} alt={`Image ${index + 1}`} />
          <div className="content">
            <h1>{titleList[index].Cn}</h1>
            {activeIndex === index && <p>{text[titleList[index].En]}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
