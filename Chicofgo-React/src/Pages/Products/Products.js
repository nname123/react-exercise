import React from 'react';
import List from './List';
import './Products.scss';
import { Button, Nav, Image, Col, Row, Container } from 'react-bootstrap';

const Products = () => {
  return (
    <Container>
      <Row>
        <Col>Search</Col>
      </Row>
      <Row>
        <Col className="col-3">篩選</Col>
        <Col className="col-9">
          <List />
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
