import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {MealsType, MealDateType} from "./types";
import axiosApi from "./axiosApi";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";

function App() {
  const location = useLocation();
  const [meals, setMeals] = useState<MealDateType []>([]);
  const [loading, setLoading] = useState(false);



  const fetchMeals = useCallback(async () => {
    setLoading(true);
    const mealsResponse = await axiosApi.get<MealsType | null>("/meals.json");
    const meals =mealsResponse.data;

    let mealsFromApi: MealDateType [] = [];

    if (meals) {
      mealsFromApi = Object.keys(meals).map(id => {
        const meal = meals[id];
        return {
          ...meal,
          id,
          date: new Date(meal.date)
        }
      });
      mealsFromApi.sort((meal1, meal2) => meal1.date.getTime() - meal2.date.getTime());
    }

    setMeals(mealsFromApi);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchMeals().catch(console.error);
  }, [location ,fetchMeals]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={(
          <Home meals={meals} fetchMeals={fetchMeals} isLoading={loading}/>
        )}/>
        <Route path="/new_meal" element={(
          <NewMeal/>
        )}/>
        <Route path="/edit_meal/:id" element={(
          <EditMeal/>
        )}/>
      </Routes>
    </Layout>
  );
}

export default App;
