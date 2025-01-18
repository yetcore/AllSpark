<<<<<<< Updated upstream
import MyCarousel from "./AllsparkCarousel";
import Direction from "./AllSparkDirection";
function App() {
  return (
    <div>
      <MyCarousel />
      <Direction />
=======
import AllsparkHow from "./AllsparkHow";
import AllsparkJoin from "./AllsparkJoin";
import AllSparWork from "./AllsparkWork";
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.content}>
      <AllSparWork />
      <AllsparkHow />
      <AllsparkJoin />
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
