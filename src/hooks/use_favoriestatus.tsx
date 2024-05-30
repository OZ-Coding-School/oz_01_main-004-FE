import { AxiosError } from "axios";
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

        if (response.data && response.data.results) {
          const favoriteStates = response.data.results.reduce(
            (acc: { [key: number]: boolean }, item: any) => {
              acc[item.recipe.id] = item.recipe.is_favorite;
              return acc;
            },
            {},
          );
          setFavoriteStates(favoriteStates);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(
          "찜 상태 가져오기 실패",
          axiosError.response ? axiosError.response.data : axiosError.message,
        );
      } finally {
        setLoading(false);
      }
    };

    FavoriteStatus();
  }, []);

  return { favoriteStates, loading };
};

export default useFavoriteStatus;
