import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiBowlRice, BiSolidBowlRice } from "react-icons/bi";
import { TfiCommentAlt } from "react-icons/tfi";

export interface FakeData {
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
  sortBy?: "favorites" | "recent" | "myFavorites";
  columns?: number | string;
  row?: number | string;
  limit?: number;
}

export const fetchAllRecipes = (): Promise<FakeData[]> => {
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

export const fetchFavoriteRecipes = (): Promise<FakeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const favoriteRecipes: FakeData[] = [
        {
          id: 8,
          user_id: { id: 8, nickname: "스와니" },
          thumbnail: "/images/mainpage_5.jpeg",
          title: "맛있는 파스타, 4월29일 생성",
          favorites: 13,
          comment_count: 1,
          created_at: new Date("2024-05-06T12:34:56"),
        },
        {
          id: 5,
          user_id: { id: 5, nickname: "스와니" },
          thumbnail: "/images/mainpage_5.jpeg",
          title: "맛있는 파스타, 5월1일 생성",
          favorites: 2,
          comment_count: 1,
          created_at: new Date("2024-05-01T12:34:56"),
        },
        {
          id: 6,
          user_id: { id: 6, nickname: "스와니" },
          thumbnail: "/images/mainpage_5.jpeg",
          title: "맛있는 파스타, 5월2일 생성",
          favorites: 3,
          comment_count: 1,
          created_at: new Date("2024-05-02T12:34:56"),
        },
        {
          id: 7,
          user_id: { id: 7, nickname: "스와니" },
          thumbnail: "/images/mainpage_5.jpeg",
          title: "맛있는 파스타, 5월3일 생성",
          favorites: 4,
          comment_count: 1,
          created_at: new Date("2024-05-03T12:34:56"),
        },
      ];
      resolve(favoriteRecipes);
    }, 1000);
  });
};

const Mealgrid: React.FC<MealgridProps> = ({
  sortedData,
  sortBy,
  columns = 1,
  row = 1,
  limit,
}) => {
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
        let allRecipes: FakeData[] = [];
        let favoriteRecipes: FakeData[] = [];

        if (sortBy === "myFavorites") {
          // 내가 찜한 목록만 가져오는 경우
          favoriteRecipes = await fetchFavoriteRecipes();
          // 찜한 목록 레시피의 id 배열 생성
          const favoriteIds = favoriteRecipes.map((recipe) => recipe.id);
          setFavoriteIds(favoriteIds);
        } else {
          // 전체 레시피 데이터 가져오기
          allRecipes = await fetchAllRecipes();
          // 찜한 목록 레시피 데이터 가져오기
          favoriteRecipes = await fetchFavoriteRecipes();
          // 찜한 목록 레시피의 id 배열 생성
          const favoriteIds = favoriteRecipes.map((recipe) => recipe.id);
          setFavoriteIds(favoriteIds);
        }

        // 전체 레시피 데이터에서 찜한 레시피를 제외한 데이터만 가져와서 병합
        const mergedData = allRecipes.filter(
          (recipe) => !favoriteIds.includes(recipe.id),
        );

        // favorites나 recent를 선택한 경우 정렬
        let sortedData: FakeData[] = [];
        if (sortBy === "favorites" || sortBy === "recent") {
          sortedData = sortData([...mergedData, ...favoriteRecipes], sortBy);
        } else {
          // myFavorites를 선택한 경우 찜한 목록 레시피만 출력
          sortedData = favoriteRecipes;
        }

        if (limit) {
          sortedData = sortedData.slice(0, limit);
        }

        setSortedDataState(sortedData);
      } catch (error) {
        console.error("에러:", error);
      }
    };

    fetchData();
  }, [sortBy, limit]);

  return (
    <MealgridWrapper columns={columns} row={row}>
      {(sortedData || sortedDataState).map((item) => (
        <MealItem key={item.id}>
          <ThumbnailWrapper>
            <Thumbnail src={item.thumbnail} alt="Thumbnail" />
            {/* <IconWrapper>
              <FavoriteIcon isfavorite={favoriteIds.includes(item.id)}>
                {favoriteIds.includes(item.id) ? (
                  <BiSolidBowlRice />
                ) : (
                  <BiBowlRice />
                )}
              </FavoriteIcon>
            </IconWrapper> */}

            <IconWrapper>
              {favoriteIds.includes(item.id) ? (
                <StyledFavoriteIconFilled />
              ) : (
                <StyledFavoriteIconOutlined />
              )}
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
    </MealgridWrapper>
  );
};

const MealgridWrapper = styled.div<MealgridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
  grid-template-rows: repeat(${(props) => props.row || "auto"}, auto);
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

const StyledFavoriteIconFilled = styled(BiSolidBowlRice)`
  position: absolute;
  top: 10px;
  right: 11px;
  color: #f97066;
  font-size: 24px;
`;

const StyledFavoriteIconOutlined = styled(BiBowlRice)`
  position: absolute;
  top: 10px;
  right: 11px;
  color: grey;
  font-size: 24px;
`;

// const FavoriteIcon = styled.div<FavoriteIconProps>`
//   position: absolute;
//   top: 10px;
//   right: 11px;
//   color: ${({ isfavorite }) => (isfavorite ? "#f97066" : "grey")};
//   font-size: 24px;
// `;
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
