interface FoodingredientType {
  id: number;
  name: string;
  img: string;
}

export const FoodIngredient: FoodingredientType[] = [
  { id: 1, img: "s3/aws.com/images/밑반찬.png", name: "전체" },
  { id: 2, img: "s3/aws.com/images/밑반찬.png", name: "육류" },
  { id: 3, img: "s3/aws.com/images/밑반찬.png", name: "채소류" },
  { id: 4, img: "s3/aws.com/images/밑반찬.png", name: "해물류" },
  { id: 5, img: "s3/aws.com/images/밑반찬.png", name: "달걀/유제품" },
  { id: 6, img: "s3/aws.com/images/밑반찬.png", name: "가공식품류" },
  { id: 7, img: "s3/aws.com/images/밑반찬.png", name: "버섯류" },
  { id: 8, img: "s3/aws.com/images/밑반찬.png", name: "쌀/밀가루" },
  { id: 9, img: "s3/aws.com/images/밑반찬.png", name: "과일류" },
  { id: 10, img: "s3/aws.com/images/밑반찬.png", name: "기타" },
];

export default FoodIngredient;
