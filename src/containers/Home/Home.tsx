import React from 'react';
import {Link} from "react-router-dom";
import MealCard from "../../components/MealCard/MealCard";

const Home = () => {
  return (
    <>
      <div className="p-2 d-flex justify-content-between">
        <span>Total calories: 0</span>
        <Link to="/add-new-meal" className="btn btn-dark">Add new meal</Link>
      </div>
      <div>
        <MealCard/>
      </div>
    </>
  );
};

export default Home;