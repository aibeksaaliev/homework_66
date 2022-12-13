import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MealDateType} from "../../types";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";

interface MealCardProps {
  meal: MealDateType;
  onDelete: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({meal, onDelete}) => {
  const [loading, setLoading] = useState(false);

  const setSpinner = async (id: string) => {
    setLoading(true);
    await onDelete(id);
    setLoading(false);
  };


  return (
    <Card className="d-flex flex-row mb-2">
      <Card.Body>
        <Card.Title className="text-capitalize">{meal.mealTime}</Card.Title>
        <Card.Text className="text-capitalize">{meal.date.toISOString().split('T')[0]}</Card.Text>
        <Card.Text className="text-capitalize">{meal.dishDescription}</Card.Text>
        <Card.Text>{meal.calories}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-column justify-content-around p-0 bg-white border-0 rounded-2 px-2">
        <Link to={"/edit_meal/" + meal.id} className="btn btn-dark rounded-2"><i className="bi bi-pencil"></i></Link>
        <Button onClick={() => setSpinner(meal.id)} className="btn btn-dark rounded-2">
          {loading ? <ButtonSpinner/> : <i className="bi bi-x-circle"></i>}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default MealCard;