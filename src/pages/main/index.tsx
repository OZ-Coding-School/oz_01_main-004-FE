// postcard;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import MealGrid from "../../components/mealgrid/mealgrid";
import { Link } from "react-router-dom";
import instance from "../../api/axios";
import { Recipe } from "../../components/mealgrid/type";
import Postcard from "../../components/postcard/postcard";
import useFavoriteStatus from "../../hooks/use_favoriestatus";
// import { Recipe } from "../community/postlist/recipelist.type";

interface SlideImageProps {
  $active: string;
}

interface ButtonProps {
  $left?: string;
}

const images = [
  {
    alt: "배너1",
    url: "https://cookbap-bucket.s3.ap-northeast-2.amazonaws.com/cookbap/main/banner1.png",
    bgColor: "#F6F1EC",
  },
  {
    alt: "배너2",
    url: "https://cookbap-bucket.s3.ap-northeast-2.amazonaws.com/cookbap/main/banner2.png",
    bgColor: "#FFF9DB",
  },
  {
    alt: "배너3",
    url: "https://cookbap-bucket.s3.ap-northeast-2.amazonaws.com/cookbap/main/banner3.png",
    bgColor: "#FFF9F8",
  },
];
const Main: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recentMeals, setRecentMeals] = useState<Recipe[]>([]);
  const [popularMeals, setPopularMeals] = useState<Recipe[]>([]);
  const { favoriteStates } = useFavoriteStatus();
  useEffect(() => {
    const fetchLatestMeals = async () => {
      try {
        const token = localStorage.getItem("access");
        let headers = {};

        if (token) {
          headers = {
            Authorization: `Bearer ${token}`,
          };
        }

        const response = await instance.get("recipes/main/", { headers });

        if (response.data && response.data.recently_recipe_list) {
          const recentRecipes = response.data.recently_recipe_list;
          let recipes = recentRecipes;

          if (token && response.data.favorite_recipes) {
            const favoriteRecipesIds: number[] =
              response.data.favorite_recipes.map(
                (recipe: { id: number }) => recipe.id,
              );

            recipes = recentRecipes.map((recipe: Recipe) => ({
              ...recipe,
              is_favorite: favoriteRecipesIds.includes(recipe.id),
            }));
          }

          setRecentMeals(recipes);
        } else {
          console.error(
            "Unexpected response structure for latest meals:",
            response.data,
          );
        }
      } catch (error) {
        console.error("Error fetching latest recipes:", error);
      }
    };

    const fetchAndSetPopularMeals = async () => {
      try {
        const token = localStorage.getItem("access");
        let headers = {};

        if (token) {
          headers = {
            Authorization: `Bearer ${token}`,
          };
        }

        const response = await instance.get("/recipes/main/", { headers });

        if (response.data && response.data.popular_recipe_list) {
          const popularRecipes = response.data.popular_recipe_list;
          let recipes: Recipe[] = popularRecipes;

          if (token && response.data.favorite_recipes) {
            const favoriteRecipesIds: number[] =
              response.data.favorite_recipes.map(
                (recipe: { id: number }) => recipe.id,
              );

            recipes = popularRecipes.map((recipe: Recipe) => ({
              ...recipe,
              is_favorite: favoriteRecipesIds.includes(recipe.id),
            }));
          }

          setPopularMeals(recipes);
        } else {
          console.error(
            "Unexpected response structure for popular meals:",
            response.data,
          );
        }
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      }
    };

    fetchLatestMeals();
    fetchAndSetPopularMeals();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1,
    );
  };

  return (
    <>
      <Header>
        <Slideshow>
          {images.map((image, index) => (
            <ImageDiv key={index} $bgColor={image.bgColor}>
              <SlideImage
                key={index}
                src={image.url}
                alt={image.alt}
                $active={index === currentImageIndex ? "true" : "false"}
              />
            </ImageDiv>
          ))}
          <Button $left={"true"} onClick={prevSlide}>
            &#10094;
          </Button>
          <Button onClick={nextSlide}>&#10095;</Button>
        </Slideshow>
      </Header>
      <Section>
        <FamousArticle>
          <Textinfo>
            <PopularRecipe>인기 많은 레시피</PopularRecipe>
            <MoreLink to="/community">더보기</MoreLink>
          </Textinfo>
          <PostGrid>
            {popularMeals.map((recipe) => (
              <Postcard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteStates[recipe.id] || false}
              />
            ))}
          </PostGrid>
        </FamousArticle>

        <RecentArticle>
          <Textinfo>
            <RecentRecipe>최근 올라온 레시피</RecentRecipe>
            <RecentMoreLink to="/community">더보기</RecentMoreLink>
          </Textinfo>
          <PostGrid>
            {recentMeals.map((recipe) => (
              <Postcard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteStates[recipe.id] || false}
              />
            ))}
          </PostGrid>
        </RecentArticle>
      </Section>
    </>
  );
};

const PostGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const Header = styled.header`
  display: flex;
  padding-top: 77px;
`;

const Slideshow = styled.div`
  width: 100%;
  height: 325px;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const ImageDiv = styled.div<{ $bgColor: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $bgColor }) => $bgColor};
`;

const SlideImage = styled.img<SlideImageProps>`
  width: 700px;
  height: auto;
  display: ${({ $active }) => ($active === "true" ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  padding: 16px;
  color: #020202;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  user-select: none;
  background-color: transparent;
  border: none;
  z-index: 2;
  ${({ $left }) => ($left ? "left:  50px;" : "right:  50px;")}// 수정된 부분
`;

const Section = styled.div`
  max-width: 1280px;
  margin: 70px auto;
  padding: 0 40px;
`;

const Textinfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopularRecipe = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const MoreLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #303030;
`;
const RecentRecipe = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const RecentMoreLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #303030;
`;

const RecentArticle = styled.article`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const FamousArticle = styled.article``;

export default Main;
