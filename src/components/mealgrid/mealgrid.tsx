import styled from "styled-components";
// import { BiBowlRice, BiSolidBowlRice } from "react-icons/bi";
import { BiBowlRice } from "react-icons/bi";
import { TfiCommentAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { Recipe } from "./type";

interface MealGridProps {
  meals: Recipe[];
}

const MealGrid: React.FC<MealGridProps> = ({ meals = [] }) => {
  return (
    <MealgridWrapper>
      {meals.map((item) => (
        <MealItem key={item.id}>
          <StyledLink key={item.id} to={`/detailPost/${item.id}`}>
            <div>
              <ThumbnailWrapper>
                <Thumbnail src={item.thumbnail} alt="Thumbnail" />
                <IconWrapper>
                  <StyledFavoriteIconFilled isFavorite={item.is_favorite} />
                </IconWrapper>
              </ThumbnailWrapper>
              <Title>{item.title}</Title>
              <UserInfo>
                <UserInfoWrapper>
                  {item.user ? (
                    <UserId>{item.user.nickname}</UserId>
                  ) : (
                    <UserId>Unknown User</UserId>
                  )}
                </UserInfoWrapper>
                <IconText>
                  <IconContent>
                    <BiBowlRice /> {item.favorites_count}
                  </IconContent>
                  <IconContent>
                    <TfiCommentAlt /> {item.comments_count}
                  </IconContent>
                </IconText>
              </UserInfo>
            </div>
          </StyledLink>
        </MealItem>
      ))}
    </MealgridWrapper>
  );
};

const MealgridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 40px;
  gap: 28px;
  border: 0;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// interface IconWrapperProps {
//   isFavorite: boolean;
// }

const IconWrapper = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.7);

  border-radius: 10px;
`;

// const StyledFavoriteIconFilled = styled(BiSolidBowlRice)`
//   position: absolute;
//   top: 10px;
//   right: 11px;
//   color: #f97066;
//   font-size: 24px;
// `;

// const StyledFavoriteIconOutlined = styled(BiBowlRice)`
//   position: absolute;
//   top: 10px;
//   right: 11px;
//   color: grey;
//   font-size: 24px;
// `;
interface StyledFavoriteIconProps {
  isFavorite: boolean;
}

const StyledFavoriteIconFilled = styled(
  ({ isFavorite, ...props }: StyledFavoriteIconProps) => (
    <BiBowlRice {...props} />
  ),
)<StyledFavoriteIconProps>`
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

export default MealGrid;

// import React from "react";
// import styled from "styled-components";
// import { BiBowlRice } from "react-icons/bi";
// import { TfiCommentAlt } from "react-icons/tfi";
// import { Link } from "react-router-dom";
// import { Recipe } from "./type";

// interface MealGridProps {
//   recipe: Recipe;
// }

// const MealGrid: React.FC<MealGridProps> = ({ recipe }) => {
//   return (
//     <MealgridWrapper>
//       <MealItem>
//         <StyledLink to={`/detailPost/${recipe.id}`}>
//           <div>
//             <ThumbnailWrapper>
//               <Thumbnail src={recipe.thumbnail} alt="Thumbnail" />
//               <IconWrapper>
//                 <StyledFavoriteIconFilled isFavorite={recipe.is_favorite} />
//               </IconWrapper>
//             </ThumbnailWrapper>
//             <Title>{recipe.title}</Title>
//             <UserInfo>
//               <UserInfoWrapper>
//                 {recipe.user ? (
//                   <UserId>{recipe.user.nickname}</UserId>
//                 ) : (
//                   <UserId>Unknown User</UserId>
//                 )}
//               </UserInfoWrapper>
//               <IconText>
//                 <IconContent>
//                   <BiBowlRice /> {recipe.favorites_count}
//                 </IconContent>
//                 <IconContent>
//                   <TfiCommentAlt /> {recipe.comments_count}
//                 </IconContent>
//               </IconText>
//             </UserInfo>
//           </div>
//         </StyledLink>
//       </MealItem>
//     </MealgridWrapper>
//   );
// };

// const MealgridWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   max-width: 1280px;
//   margin: 0 auto;
//   margin-bottom: 20px;
//   padding: 0 40px;
//   gap: 28px;
//   border: 0;
// `;

// const ThumbnailWrapper = styled.div`
//   position: relative;
//   width: 100%;
// `;

// const IconWrapper = styled.div`
//   position: absolute;
//   top: 3px;
//   right: 3px;
//   width: 48px;
//   height: 48px;
//   background-color: rgba(255, 255, 255, 0.7);
//   border-radius: 10px;
// `;

// interface StyledFavoriteIconProps {
//   isFavorite: boolean;
// }

// const StyledFavoriteIconFilled = styled(
//   ({ isFavorite, ...props }: StyledFavoriteIconProps) => (
//     <BiBowlRice {...props} />
//   ),
// )<StyledFavoriteIconProps>`
//   position: absolute;
//   top: 10px;
//   right: 11px;
//   color: ${({ isFavorite }) => (isFavorite ? "#f97066" : "grey")};
//   font-size: 24px;
// `;

// const MealItem = styled.div`
//   width: 277px;
//   height: 263px;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 0;
// `;

// const Thumbnail = styled.img`
//   max-width: 277px;
//   max-height: 200px;
//   width: 100%;
//   height: auto;
//   border-radius: 10px;
// `;

// const Title = styled.p`
//   margin: 10px 0;
//   font-size: 16px;
// `;

// const UserId = styled.p`
//   font-size: 12px;
// `;

// const IconText = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   font-size: 12px;
// `;

// const IconContent = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 4px;
// `;

// const UserInfoWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: inherit;
//   cursor: pointer;
// `;

// export default MealGrid;
