import { BiBowlRice } from "react-icons/bi";
import { PiChatTextBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Favorite from "./favorite/favorite_toggle";
import styles from "./postcard.module.css";
// import { Recipe } from "../../pages/community/postlist/recipelist.type";

const Postcard = ({ recipe, isFavorite }: any) => {
  const defaultImg = "../public/defaultimg/defaultimg.png";
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("로그인하고 오세요~");
      navigate("/login");
    }
  };

  const userImage = recipe.user.profile_image;
  const profileImg = "../public/mypage/basicProfile.jpg";

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
            <Favorite
              id={recipe.id}
              isFavoriteInitially={isFavorite}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.title}>{recipe.title}</div>
          <div className={styles.data}>
            <div className={styles.ingredient}>
              <img
                className={styles.profile}
                src={userImage ? userImage : profileImg}
                alt="profile"
              />
              <p>{recipe.user.nickname}</p>
            </div>
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
