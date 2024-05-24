import { BiBowlRice } from "react-icons/bi";
import { PiChatTextBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import Favorite from "./favorite/favorite";
import styles from "./postcard.module.css";
// import { Recipe } from "../../pages/community/postlist/recipelist.type";

const Postcard = ({ recipe }: any) => {
  const defaultImg = "../public/defaultimg/defaultimg.png";

  const handleFavoriteClick = (isFavorite: boolean) => {
    console.log(`Favorite status: ${isFavorite}`);
    // 추가적으로 로직 구현가능
  };

  return (
    <div>
      <div className={styles.postcard}>
        <div className={styles.topBox}>
          <Link to={`/detailPost/${recipe.id}`} className={styles.topBox}>
            <img
              src={recipe.thumbnail ? recipe.thumbnail : defaultImg}
              alt={recipe.title}
            />
          </Link>
          <div className={styles.favoriteBtn}>
            <Favorite onClick={handleFavoriteClick} />
          </div>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.title}>{recipe.title}</div>
          <div className={styles.data}>
            <p>{recipe.user.nickname}</p>
            <div className={styles.dataNumber}>
              <div className={styles.pick}>
                <BiBowlRice />
                <p>{recipe.favorites_count}</p>
              </div>
              <div className={styles.comment}>
                <PiChatTextBold />
                <p>{recipe.comments_count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
