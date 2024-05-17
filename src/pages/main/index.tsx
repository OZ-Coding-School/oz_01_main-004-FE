import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Mealgrid from "../../components/mealgrid/mealgrid";
import { Link } from "react-router-dom";

import mainpage_1 from "/images/mainpage_1.png";
import mainpage_2 from "/images/mainpage_2.png";
import mainpage_3 from "/images/mainpage_3.png";
import mainpage_4 from "/images/mainpage_4.jpeg";
import mainpage_5 from "/images/mainpage_5.jpeg";

const images = [
  { image: mainpage_1, alt: "연회색" },
  { image: mainpage_2, alt: "삽찐한회색" },
  { image: mainpage_3, alt: "더 찐한 그레이" },
  { image: mainpage_4, alt: "스마일 간장국수" },
  { image: mainpage_5, alt: "스파게티" },
];

const Main: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0,
      );
    }, 5000); // 5초마다 이미지 바꾸기

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
            <SlideImage
              key={index}
              src={image.image}
              alt={image.alt}
              active={index === currentImageIndex}
            />
          ))}
          <Button left onClick={prevSlide}>
            &#10094;
          </Button>
          <Button onClick={nextSlide}>&#10095;</Button>
          <Title>Cook Bap으로 요리를 하자</Title>
        </Slideshow>
      </Header>
      <Section>
        <FamousArticle>
          <Textinfo>
            <PopularRecipe>인기 많은 레시피</PopularRecipe>
            <MoreLink to="/community">더보기</MoreLink>
          </Textinfo>
          <Mealgrid sortBy="favorites" />
        </FamousArticle>

        <RecentArticle>
          <Textinfo>
            <RecentRecipe>최근 올라온 레시피</RecentRecipe>
            <RecentMoreLink to="/community">더보기</RecentMoreLink>
          </Textinfo>
          <Mealgrid sortBy="recent" />
        </RecentArticle>
      </Section>
    </>
  );
};

const Header = styled.header`
  display: flex;
  gap: 3rem;
  margin-left: -3rem;
  margin-right: -3rem;
`;

const Slideshow = styled.div`
  width: 100%;
  height: 418px;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f97066;
  z-index: 1;
`;

interface SlideImageProps {
  active: boolean;
}

const SlideImage = styled.img<SlideImageProps>`
  width: 100%;
  height: auto;
  display: ${({ active }) => (active ? "block" : "none")};
`;

interface ButtonProps {
  left?: boolean;
}

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
  ${({ left }) =>
    left
      ? `
    left: 50px;
  `
      : `
    right: 50px;
  `}
`;

const Section = styled.div`
  max-width: 1280px;
  margin: 100px auto;
  padding: 0 40px;
`;

const Textinfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
`;

const PopularRecipe = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const MoreLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: black;
`;
const RecentRecipe = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const RecentMoreLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: black;
`;

const RecentArticle = styled.article``;

const FamousArticle = styled.article``;

export default Main;
