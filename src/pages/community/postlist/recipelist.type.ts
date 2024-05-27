export interface User {
  id: number;
  email: string;
  nickname: string;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface FoodType {
  id: number;
  food_type_name: string;
  food_type_image: string;
}

export interface FoodIngredient {
  id: number;
  food_ingredient_name: string;
  food_ingredient_image: string;
}

export interface Recipe {
  id: number;
  user: User;
  food_type: FoodType;
  food_ingredient: FoodIngredient;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  thumbnail: string;
  level: string;
  favorites: number;
  comment_count: number;
}

export interface RecipeResponse {
  count: number;
  results: Recipe[];
}
