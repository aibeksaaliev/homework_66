export interface MealType {
  mealTime: string;
  dishDescription: string;
  calories: string;
  id: string;
}

export type MealApiType = Omit<MealType, "id">;

export interface MealsType {
  [id: string]: MealApiType;
}