import React from 'react';
import {Button, Form} from "react-bootstrap";

const MealForm = () => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Meal</Form.Label>
        <Form.Select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Meal Description</Form.Label>
        <Form.Control
          type="text"
          name="meal"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Meal Calories</Form.Label>
        <Form.Control
          type="text"
          name="meal"
        />
      </Form.Group>
      <Form.Group>
        <Button>Save</Button>
      </Form.Group>
    </Form>
  );
};

export default MealForm;