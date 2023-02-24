import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import yourImg from './coupon-card-bg.svg'
import style from './CouponCard.module.scss';
// import styled from 'styled-components'

function CouponCard(props) {
  const [btnText, setBtnText] = useState('領取');
  useEffect(() => {
    const targetItem = props.id; // 要檢查的項目
    // 讀取並檢查某一值是否在陣列中
    const myCoupon = JSON.parse(localStorage.getItem('MyCoupon')) || []; // 先讀取已存在的資料，如果不存在則初始化為空陣列
    const isExist = myCoupon.includes(targetItem); // 檢查該項目是否在陣列中
    console.log(isExist); // 如果該項目在陣列中，則輸出 true，否則輸出 false
    if (isExist) {
      setBtnText('已領取');
    } else {
      setBtnText('領取');
    }
  }, []);

  return (
    <Container
      fluid
      className={`${style.ticketContent} d-flex flex-column`}
      style={{
        minHeight: props.height,
      }}
    >
      <Row className={`mx-auto mt-auto text-center`}>
        <Col>
          <h3>{props.title}</h3>
        </Col>
      </Row>
      <Row className={`mx-auto mb-auto`}>
        <Col>
          <Button
            variant="chicofgo-green"
            className={`p-1 px-4 `}
            size="sm"
            // color="light"
            type="button"
            onClick={() => {
              setBtnText('已領取');
              // 寫入
              const newItem = props.id; // 要新增的項目
              const myCoupon =
                JSON.parse(localStorage.getItem('MyCoupon')) || []; // 先讀取已存在的資料，如果不存在則初始化為空陣列
              if (!myCoupon.includes(newItem)) {
                // 檢查陣列中是否已存在該項目
                myCoupon.push(newItem); // 如果不存在，則新增該項目
                localStorage.setItem('MyCoupon', JSON.stringify(myCoupon)); // 存入 localStorage
              }
            }}
          >
            {btnText}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CouponCard;
