import { useRef } from "react";
import MyCarousel from "./AllsparkCarousel";
import Direction from "./AllSparkDirection";
import AllsparkHow from "./AllsparkHow";
import AllsparkJoin from "./AllsparkJoin";
import AllSparWork from "./AllsparkWork";
import styles from "./App.module.scss";

function App() {
  // 点击轮播图的箭头，跳转到加入我们
  // 只有点击，才可以获取ref绑定的元素。让浏览器将被绑定元素带到可视区域
  const joinRef = useRef(null);
  const scrollToJoin = () => {
    joinRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.content}>
      <MyCarousel onClickBox={scrollToJoin} />
      <Direction />
      <AllSparWork />
      <AllsparkHow />
      <div ref={joinRef}>
        <AllsparkJoin />
      </div>
    </div>
  );
}

export default App;
