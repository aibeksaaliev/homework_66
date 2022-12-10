import React from 'react';
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import {Route, Routes} from "react-router-dom";
import MealForm from "./components/MealForm/MealForm";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={(
          <Home/>
        )}/>
        <Route path="/add-new-meal" element={(
          <MealForm/>
        )}/>
      </Routes>
    </Layout>
  );
}

export default App;
