import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import style from './CouponCard5.module.scss';

function CouponCard2(props) {
  return (
    <Container
      fluid
      className={`${style.ticketContent} d-flex flex-column justify-content-center my-1`}
      style={{
        height: props.height,
      }}
    >
      <Row
        className={`text-nowrap align-items-center justify-content-center text-center`}
      >
        <Col className={`col-7 col-xl-5 `}>
          <h3 className={`my-auto `}>{props.title}</h3>
        </Col>
        <Col className={`col-4`}>
          <h4 className={`chicofgo_brown_font`}>有效期限:</h4>
          <h5 className={`chicofgo_green_font`}>{props.deadline}</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default CouponCard2;
