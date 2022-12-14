import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {MealApiType} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import {format} from "date-fns";

const MealForm = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [mealInfo, setMealInfo] = useState<MealApiType>({
    mealTime: "",
    dishDescription: "",
    calories: "",
    date: format(new Date(),'yyyy-MM-dd'),
  });

  const fetchMealInfo = useCallback(async () => {
    setPageLoading(true);
    try {
      const mealInfoResponse = await axiosApi.get<MealApiType>("/meals/" + id + ".json");
      setMealInfo(mealInfoResponse.data);
    } finally {
      setPageLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      void fetchMealInfo().catch(console.error);
    }
  }, [id, fetchMealInfo]);

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
    setLoading(true);
    try {
      if (id) {
        await axiosApi.put("/meals/" + id + ".json", mealInfo);
      } else {
        if (mealInfo.mealTime) {
          await axiosApi.post("/meals.json", mealInfo);
          navigate("/");
        } else {
          alert("Choose a meal");
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const formContent = pageLoading ? <LoadSpinner/> : (
    <Form
      className="w-50 m-auto text-center"
      onSubmit={onFormSubmit}>
      <Form.Group>
        <Form.Label>Select Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={mealInfo.date}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Meal</Form.Label>
        <Form.Select name="mealTime" value={mealInfo.mealTime} onChange={onSelectChange}>
          <option hidden value="">Choose a meal</option>
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
          required
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
          required
          name="calories"
          placeholder="Enter calories"
          value={mealInfo.calories}
          onChange={onInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button
          type="submit"
          variant={"dark"}
          size="sm"
          disabled={loading}
        >
          {loading ? <ButtonSpinner/> : <i className="bi bi-save"></i>}
        </Button>
      </Form.Group>
    </Form>
  )

  return (
    <>
      {formContent}
    </>
  );
};

export default MealForm;