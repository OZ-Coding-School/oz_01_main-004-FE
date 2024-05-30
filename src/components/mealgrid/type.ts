// User 타입 정의
export type User = {
  id: number;
  email: string;
  nickname: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
};

// FoodType 타입 정의
export type FoodType = {
  id: number;
  food_type_name: string;
  food_type_image: string;
};

// FoodIngredient 타입 정의
export type FoodIngredient = {
  id: number;
  food_ingredient_name: string;
  food_ingredient_image: string;
};

// Recipe 타입 정의
export type Recipe = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  user: User;
  food_type: FoodType;
  food_ingredient: FoodIngredient;
  level: string;
  is_favorite: boolean;
  favorites_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
};
