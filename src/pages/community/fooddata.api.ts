import instance from "../../api/axios";

export const FoodTypes = async () => {
  try {
    const response = await instance.get("foods/types/");
    const foodTypeList = response.data.food_type_list.results.map(
      (item: any) => ({
        id: item.id,
        name: item.food_type_name,
        img: item.food_type_image,
      }),
    );
    return foodTypeList;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const FoodIngredients = async () => {
  try {
    const response = await instance.get("foods/ingredients/");
    const foodIngredientList = response.data.food_ingredient_list.results.map(
      (item: any) => ({
        id: item.id,
        name: item.food_ingredient_name,
        img: item.food_ingredient_image,
      }),
    );
    return foodIngredientList;
  } catch (error) {
    console.error("Error:", error);
  }
};
