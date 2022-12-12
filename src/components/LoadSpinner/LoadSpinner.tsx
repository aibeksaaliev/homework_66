import React from 'react';
import {Container ,Spinner} from "react-bootstrap";

const LoadSpinner = () => {
  return (
    <Container className="text-center">
      <Spinner animation="grow"/>
    </Container>
  );
};

export default LoadSpinner;