import { useState, useEffect } from "react";
import "./direction.css";
import axios from "axios";
const baisisUrl = "http://9tz24a.natappfree.cc";
// 获取图片
function useImages() {
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  useEffect(() => {
    const loadImages = async () => {
      const imageNames = ["backend-l.png", "frontend-l.png", "product-l.png"];
      const results = await Promise.allSettled(
        imageNames.map((name) => axios.get(`${baisisUrl}/api/img/${name}`))
      );
      const loadedImages = [];
      const errors = [];
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          loadedImages[index] = result.value.data.data;
        } else {
          errors.push(`Image ${index + 1} failed to load`);
        }
      });
      setImages(loadedImages);
      setImageErrors(errors);
    };
    loadImages();
  }, []);
  return { images, imageErrors };
}
// 获取文字
function useText() {
  const [text, setText] = useState({});
  const [textError, setTextError] = useState("");
  useEffect(() => {
    const loadText = async () => {
      try {
        const res = await axios.get(`${baisisUrl}/api/json/directions.json`);
        setText(JSON.parse(res.data.data));
      } catch (error) {
        setTextError("Failed to load text resources");
      }
    };
    loadText();
  }, []);
  return { text, textError };
}

export default function Direction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { images, imageErrors } = useImages();
  const { text, textError } = useText();
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };
  const titleList = [
    { En: "backend", Cn: "后端研发" },
    { En: "frontend", Cn: "前端研发" },
    { En: "product", Cn: "产品经理" },
    ,
  ];
  return (
    <>
      {/* 这里是标题！！！！！！！！！！   需要加样式 */}
      <div>工作室方向</div>
      <div className="image-row">
        {/* 错误展示 */}
        {imageErrors.length > 0 && (
          <div className="error-messages">
            {imageErrors.map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>
        )}
        {textError && (
          <div className="error-messages">
            <p style={{ color: "red" }}>{textError}</p>
          </div>
        )}
        {/* 内容展示 */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${
              activeIndex === index ? "active" : ""
            }`}
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
    </>
  );
}

// 已废弃代码
// const [images, setImages] = useState([]);
// const [text, setText] = useState({});

// const fetchImage = async (imageName) => {
//   try {
//     const res = await axios.get(baisisUrl + `/api/img/${imageName}`);
//     console.log(res.data);
//     const imgUrl = res.data.data;
//     // const imgUrl = URL.createObjectURL(res.data);
//     return imgUrl;
//   } catch (error) {
//     console.error("Error fetching image:", error);
//   }
// };
// const fetchText = async (fileName) => {
//   try {
//     const res = await axios.get(baisisUrl + `/api/json/${fileName}`);
//     const text = JSON.parse(res.data.data); // 解析 JSON 字符串
//     console.log(text);
//     return text;
//   } catch (error) {
//     console.error("Error fetching image:", error);
//   }
// };
// useEffect(() => {
//   const loadResource = async () => {

//     //并行加载
//     const [largeImage1, largeImage2, largeImage3, Text] = await Promise.allSettled([
//       fetchImage("backend-l.png"),
//       fetchImage("frontend-l.png"),
//       fetchImage("product-l.png"),
//       fetchText("directions.json"),
//     ]);
//     setImages([largeImage1, largeImage2, largeImage3]);
//     setText(Text);
//   };
//   loadResource();
// }, []);
