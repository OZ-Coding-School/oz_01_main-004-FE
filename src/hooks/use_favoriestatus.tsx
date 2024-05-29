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
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
          setLoading(false);
          return;
        }

        const response = await instance.get("/favorite/list/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
