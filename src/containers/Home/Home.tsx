import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MealCard from "../../components/MealCard/MealCard";
import {MealType} from "../../types";
import axiosApi from "../../axiosApi";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";

interface HomeProps {
  meals: MealType [];
  fetchMeals: () => void;
  isLoading: boolean;
}

const Home: React.FC<HomeProps> = ({meals, fetchMeals, isLoading}) => {
  const totalCalories = meals.reduce((acc, meal) => {
    return acc + parseInt(meal.calories);
  }, 0);

  const deleteMeal = async (id: string) => {
    await axiosApi.delete("/meals/" + id + ".json");
    await fetchMeals();
  }

  return (
    <>
      <div className="p-2 d-flex justify-content-between">
        <span className="bg-dark text-white rounded-2 px-2 pt-2">{isLoading ? <ButtonSpinner/> : `Total calories: ${totalCalories}`}</span>
        <Link to="/new_meal" className="btn btn-dark"><i className="bi bi-plus-circle"></i></Link>
      </div>
      {isLoading ? (
        <LoadSpinner/>
      ) : (
        <div className="p-2">
          {meals.map(meal => {
            return <MealCard key={meal.id} onDelete={deleteMeal} meal={meal}/>
          })}
        </div>
      )}
    </>
  );
};

export default Home;