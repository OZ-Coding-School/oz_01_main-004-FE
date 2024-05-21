interface FoodType {
  id: number;
  name: string;
  img: string;
}

const FoodType: FoodType[] = [
  { id: 1, img: "s3/aws.com/images/밑반찬.png", name: "전체" },
  { id: 2, img: "s3/aws.com/images/밑반찬.png", name: "반찬" },
  { id: 3, img: "s3/aws.com/images/밑반찬.png", name: "국/탕/찌개" },
  { id: 4, img: "s3/aws.com/images/밑반찬.png", name: "밥/죽/떡" },
  { id: 5, img: "s3/aws.com/images/밑반찬.png", name: "고기/구이" },
  { id: 6, img: "s3/aws.com/images/밑반찬.png", name: "분식/면" },
  { id: 7, img: "s3/aws.com/images/밑반찬.png", name: "양식" },
  { id: 8, img: "s3/aws.com/images/밑반찬.png", name: "다이어트/샐러드" },
  { id: 9, img: "s3/aws.com/images/밑반찬.png", name: "디저트" },
  { id: 10, img: "s3/aws.com/images/밑반찬.png", name: "기타" },
];

export default FoodType;
