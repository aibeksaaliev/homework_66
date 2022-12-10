import React, {useCallback, useEffect, useState} from 'react';
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import {Route, Routes, useLocation} from "react-router-dom";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";
import {MealsType, MealType} from "./types";
import axiosApi from "./axiosApi";


function App() {
  const location = useLocation();
  const [meals, setMeals] = useState<MealType []>([]);

  const fetchMeals = useCallback(async () => {
    const mealsResponse = await axiosApi.get<MealsType | null>("/meals.json");
    const meals =mealsResponse.data;

    let mealsFromApi: MealType [] = [];

    if (meals) {
      mealsFromApi = Object.keys(meals).map(id => {
        const meal = meals[id];
        return {
          ...meal,
          id
        }
      });
    }

    setMeals(mealsFromApi);
  }, []);

  useEffect(() => {
    void fetchMeals().catch(console.error);
  }, [location ,fetchMeals]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={(
          <Home meals={meals} fetchMeals={fetchMeals}/>
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
