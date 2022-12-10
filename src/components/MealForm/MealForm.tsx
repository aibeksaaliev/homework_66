import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {MealApiType} from "../../types";
import axiosApi from "../../axiosApi";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const MealForm = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [mealInfo, setMealInfo] = useState<MealApiType>({
    mealTime: "",
    dishDescription: "",
    calories: ""
  });

  const fetchMealInfo = useCallback(async () => {
    const mealInfoResponse = await axiosApi.get<MealApiType>("/meals/" + id + ".json");
    setMealInfo(mealInfoResponse.data);
  }, [id]);

  useEffect(() => {
    if (id) {
      void fetchMealInfo().catch(console.error);
    }
  }, [id ,fetchMealInfo]);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMealInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMealInfo(prevState => ({
      ...prevState,
        [name]: value
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosApi.post("/meals.json", mealInfo);
    navigate("/");
  }

  return (
    <Form
      className="w-50 m-auto text-center"
      onSubmit={onFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Meal</Form.Label>
        <Form.Select name="mealTime" value={mealInfo.mealTime} onChange={onSelectChange}>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Meal Description</Form.Label>
        <Form.Control
          type="text"
          name="dishDescription"
          placeholder="Type a dish description"
          value={mealInfo.dishDescription}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Meal Calories</Form.Label>
        <Form.Control
          type="number"
          name="calories"
          placeholder="Enter calories"
          value={mealInfo.calories}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button type="submit" variant={"dark"}><i className="bi bi-save"></i></Button>
      </Form.Group>
    </Form>
  );
};

export default MealForm;