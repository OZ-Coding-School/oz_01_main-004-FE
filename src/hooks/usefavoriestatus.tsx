import { useEffect, useState } from "react";
import instance from "../api/axios";

const useFavoriteStatus = () => {
  const [favoriteStates, setFavoriteStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FavoriteStatus = async () => {
      try {
        const response = await instance.get("/favorite/list/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        if (response.data && response.data.favorite_list) {
          const favoriteStates = response.data.favorite_list.reduce(
            (acc: { [key: number]: boolean }, item: any) => {
              acc[item.recipe.id] = true;
              return acc;
            },
            {},
          );
          setFavoriteStates(favoriteStates);
          console.log(favoriteStates);
        }
      } catch (error) {
        console.error("찜 상태 가져오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    FavoriteStatus();
  }, []);

  return { favoriteStates, loading };
};

export default useFavoriteStatus;
