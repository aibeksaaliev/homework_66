import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const MealCard = () => {
  return (
    <Card className="d-flex flex-row">
      <Card.Body>
        <Card.Title>Meal</Card.Title>
        <Card.Text>Description</Card.Text>
        <Card.Text>0 kcal</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-column justify-content-between">
        <Link to="/add-new-meal" className="btn btn-dark">Edit</Link>
        <Button className="btn btn-dark">Delete</Button>
      </Card.Footer>
    </Card>
  );
};

export default MealCard;