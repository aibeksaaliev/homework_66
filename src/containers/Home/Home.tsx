import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import MealCard from "../../components/MealCard/MealCard";
import {MealType} from "../../types";
import axiosApi from "../../axiosApi";

interface HomeProps {
  meals: MealType [];
  fetchMeals: () => void;
}

const Home: React.FC<HomeProps> = ({meals, fetchMeals}) => {
  const deleteMeal = async (id: string) => {
    await axiosApi.delete("/meals/" + id + ".json");
    await fetchMeals();
  }

  return (
    <>
      <div className="p-2 d-flex justify-content-between">
        <span className="bg-dark text-white rounded-2 px-2 pt-2">Total calories: 0</span>
        <Link to="/new_meal" className="btn btn-dark"><i className="bi bi-plus-circle"></i></Link>
      </div>
      <div className="p-2">
        {meals.map(meal => {
          return <MealCard key={meal.id} onDelete={deleteMeal} meal={meal}/>
        })}
      </div>
    </>
  );
};

export default Home;