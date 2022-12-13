export interface MealType {
  mealTime: string;
  dishDescription: string;
  calories: string;
  id: string;
  date: string;
}
export interface MealDateType {
  mealTime: string;
  dishDescription: string;
  calories: string;
  id: string;
  date: Date;
}

export type MealApiType = Omit<MealType, "id">;

export interface MealsType {
  [id: string]: MealApiType;
}

declare module "react-datepicker";