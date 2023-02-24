import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link, useAsyncError } from 'react-router-dom';
import axios from 'axios';

function BusinessReviewList(props) {
  const [Review, setReview] = useState([]);

  useEffect(() => {
    async function getreview() {
      let response = await axios.get(
        'http://localhost:3001/api/business/review'
      );
      setReview(response.data);
    }
    getreview();
  }, []);
  console.log(Review);
  //取得陣列資料放進products

  return (
    <Row className="text-center border-bottom align-items-center py-1 mt-1 d-flex">
      <Col sm={4} className="my-1">
        123
      </Col>
      <Col sm={4} className="my-1">
        123
      </Col>
      <Col sm={4} className="my-1">
        123
      </Col>
    </Row>
  );
}

export default BusinessReviewList;
