import React from 'react';
import MealForm from "../../components/MealForm/MealForm";

const NewMeal = () => {
  return (
    <>
      <h3 className="text-center text-uppercase pt-3">Add new meal</h3>
      <MealForm />
    </>
  );
};

export default NewMeal;