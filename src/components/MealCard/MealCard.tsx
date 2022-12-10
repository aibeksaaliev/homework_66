import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MealType} from "../../types";

interface MealCardProps {
  meal: MealType;
  onDelete: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({meal, onDelete}) => {
  return (
    <Card className="d-flex flex-row mb-2">
      <Card.Body>
        <Card.Title>{meal.mealTime}</Card.Title>
        <Card.Text>{meal.dishDescription}</Card.Text>
        <Card.Text>{meal.calories}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-column justify-content-around p-0 bg-white border-0 rounded-2 px-2">
        <Link to={"/edit_meal/" + meal.id} className="btn btn-dark rounded-2"><i className="bi bi-pencil"></i></Link>
        <Button onClick={() => onDelete(meal.id)} className="btn btn-dark rounded-2"><i className="bi bi-x-circle"></i></Button>
      </Card.Footer>
    </Card>
  );
};

export default MealCard;