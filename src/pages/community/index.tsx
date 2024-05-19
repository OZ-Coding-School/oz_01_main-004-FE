import { useParams } from "react-router-dom";
import styles from "./index.module.css";

export default function Community() {
  let { search, type, ingredient, level, page } = useParams();
  // "/community/:search/:type/:ingredient/:page"
  return (
    <div className={styles.CommunityContainer}>
      <div>커뮤니티 페이지</div>
      <div>
        search: {search} , 푸드타입: {type} , 재료: {ingredient} ,level: {level}{" "}
        , 페이지:
        {page}
      </div>
    </div>
  );
}
