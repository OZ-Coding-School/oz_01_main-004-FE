import styles from "./likelist.module.css";
import Mealgrid from "../../../components/mealgrid/mealgrid";
// import { FakeData } from "../../../components/mealgrid/mealgrid";

const LikeList: React.FC = () => {
  // const defaultFetchFavoriteRecipes = async (): Promise<FakeData[]> => {
  //   return [];
  // };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Mealgrid sortBy="myFavorites" columns={3} />
      </div>
    </div>
  );
};

export default LikeList;

// export default function LikeList() {
//   return (
//     <div className={styles.container}>
//       <div></div>
//     </div>
//   );
// }
