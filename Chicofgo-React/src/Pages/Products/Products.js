import React from 'react';
import List from './List';
import ProductFilter from './ProductFilter';
import './Products.scss';
import { Button, Form, InputGroup, Col, Row, Container } from 'react-bootstrap';

const Products = () => {
  return (
    <Container fluid>
      <Row className="justify-content-between">
        <Col className="col-auto bg-light bg-gradient shadow-sm">
          <ProductFilter />
        </Col>
        <Col className="col-10">
          <List />
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
