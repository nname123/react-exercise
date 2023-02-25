import React from 'react';
import List from './List';
import ProductFilter from './ProductFilter';
import './Products.scss';
import { Button, Form, InputGroup, Col, Row, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Products = () => {
  const [checkedList, setCheckedList] = useState({
    brands: [],
    cates: [],
    items: [],
    origins: [],
  });

  function handleFilterValue(newValue) {
    console.log('拿到資料囉!', newValue);
    setCheckedList(newValue);
  }
  return (
    <Container fluid>
      <Row>
        <Col className="my-3"></Col>
      </Row>
      <Row>
        <Col className="col-3 ">
          <ProductFilter onFilterChange={handleFilterValue} />
        </Col>
        <Col className="col-9">
          <List />
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
