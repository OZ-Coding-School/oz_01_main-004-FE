import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiBowlRice, BiSolidBowlRice } from "react-icons/bi";
import { TfiCommentAlt } from "react-icons/tfi";

interface FakeData {
  id: number;
  user_id: {
    id: number;
    nickname: string;
  };
  thumbnail: string;
  title: string;
  favorites: number;
  comment_count: number;
  created_at: Date;
}

interface MealgridProps {
  sortedData?: FakeData[];
  sortBy: "favorites" | "recent";
}

const fetchAllRecipes = (): Promise<FakeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allRecipes: FakeData[] = [
        {
          id: 1,
          user_id: { id: 1, nickname: "나는현지" },
          thumbnail: "/images/mainpage_4.jpeg",
          title: "스마일 계란 국수, 5월 7일 생성",
          favorites: 15,
          comment_count: 3,
          created_at: new Date("2024-05-07T12:34:56"),
        },
        {
          id: 2,
          user_id: { id: 2, nickname: "스와니" },
          thumbnail: "/images/mainpage_5.jpeg",
          title: "맛있는 파스타, 5월6일 생성",
          favorites: 12,
          comment_count: 1,
          created_at: new Date("2024-05-06T12:34:56"),
        },
        {
          id: 3,
          user_id: { id: 3, nickname: "스와니" },
          thumbnail: "/images/nopicture.png",
          title: "맛있는 간장계란 밥~, 5월5일 생성",
          favorites: 24,
          comment_count: 3,
          created_at: new Date("2024-05-05T12:34:56"),
        },
        {
          id: 4,
          user_id: { id: 4, nickname: "스와" },
          thumbnail: "/images/nopicture.png",
          title: "맛있는 케이크~, 5월4일 생성",
          favorites: 19,
          comment_count: 1,
          created_at: new Date("2024-05-04T12:34:56"),
        },
      ];
      resolve(allRecipes);
    }, 1000);
  });
};

const fetchFavoriteRecipes = (): Promise<FakeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const favoriteRecipes: FakeData[] = [
        {
          id: 2,
          user_id: { id: 2, nickname: "스와니" },
          thumbnail: "/images/mainpage_5.jpeg",
          title: "맛있는 파스타, 5월6일 생성",
          favorites: 12,
          comment_count: 1,
          created_at: new Date("2024-05-06T12:34:56"),
        },
      ];
      resolve(favoriteRecipes);
    }, 1000);
  });
};

const Mealgrid: React.FC<MealgridProps> = ({ sortedData, sortBy }) => {
  const [sortedDataState, setSortedDataState] = useState<FakeData[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const sortData = (
    data: FakeData[],
    sortBy: "favorites" | "recent",
  ): FakeData[] => {
    if (sortBy === "favorites") {
      return [...data].sort((a, b) => b.favorites - a.favorites);
    } else {
      return [...data].sort(
        (a, b) => b.created_at.getTime() - a.created_at.getTime(),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRecipes = await fetchAllRecipes();

        const favoriteRecipes = await fetchFavoriteRecipes();

        const favoriteIds = favoriteRecipes.map((recipe) => recipe.id);
        setFavoriteIds(favoriteIds);

        // 전체 레시피 데이터에서 찜한 레시피를 제외한 데이터만 가져와서 병합
        const mergedData = allRecipes.filter(
          (recipe) => !favoriteIds.includes(recipe.id),
        );
        const sortedData = sortData(
          [...mergedData, ...favoriteRecipes],
          sortBy,
        );
        setSortedDataState(sortedData);
      } catch (error) {
        console.error("에러:", error);
      }
    };

    fetchData();
  }, [sortBy]);

  return (
    <Container>
      {(sortedData || sortedDataState).map((item) => (
        <MealItem key={item.id}>
          <ThumbnailWrapper>
            <Thumbnail src={item.thumbnail} alt="Thumbnail" />
            <IconWrapper>
              <FavoriteIcon isFavorite={favoriteIds.includes(item.id)}>
                {favoriteIds.includes(item.id) ? (
                  <BiSolidBowlRice />
                ) : (
                  <BiBowlRice />
                )}
              </FavoriteIcon>
            </IconWrapper>
          </ThumbnailWrapper>
          <Title>{item.title}</Title>
          <UserInfo>
            <UserInfoWrapper>
              <UserId>{item.user_id.nickname}</UserId>
            </UserInfoWrapper>
            <IconText>
              <IconContent>
                <BiBowlRice /> {item.favorites}
              </IconContent>
              <IconContent>
                <TfiCommentAlt /> {item.comment_count}
              </IconContent>
            </IconText>
          </UserInfo>
        </MealItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  max-width: 1280px;
  margin: 0;
  margin-bottom: 50px;
  padding: 0 40px;
  gap: 28px;
  border: 0;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
`;

const FavoriteIcon = styled.div<{ isFavorite: boolean }>`
  position: absolute;
  top: 10px;
  right: 11px;
  color: ${({ isFavorite }) => (isFavorite ? "#f97066" : "grey")};
  font-size: 24px;
`;

const MealItem = styled.div`
  width: 277px;
  height: 263px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
`;

const Thumbnail = styled.img`
  max-width: 277px;
  max-height: 200px;
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Title = styled.p`
  margin: 10px 0;
  font-size: 16px;
`;

const UserId = styled.p`
  font-size: 12px;
`;

const IconText = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
`;

const IconContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Mealgrid;
