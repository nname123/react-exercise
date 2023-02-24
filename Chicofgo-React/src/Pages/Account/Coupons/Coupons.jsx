import { Row, Col, Form } from 'react-bootstrap';
import ChContainer from '../../ComponentShare/ChContainer';
import style from './Coupons.module.scss';
import CouponCard5 from './Component/CouponCard5';
function Coupons() {
  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'我的優惠券'}
    >
      <Col>
        <Row>
          <Col>
            <h1 className={`${style.couponsTitle} text-center pt-5 py-4`}>
              我的優惠券
            </h1>
          </Col>
        </Row>
        <Row
          className={`chicofgo_gray justify-content-center text-center px-4 py-3 mb-3`}
        >
          <Col className={`col-3 `}>
            <Form className={`px-4 mx-2 chicofgo_brown_font`}>
              <Form.Check type="switch" id="custom-switch" label="全部顯示" />
            </Form>
          </Col>
          <Col className={`col-6`}>
            <Row>
              <Col className={`col`}>折扣券</Col>
              <Col className={`col`}>折抵券</Col>
              <Col className={`col`}>即將到期</Col>
            </Row>
          </Col>
          <Col className={`col-3`}></Col>
        </Row>
        <Row className={`${style.couponsAreaHeight} mb-5`}>
          <Col className={`col-6`}>
            <CouponCard5
              title="優惠券名稱"
              height="100px"
              deadline="2023/8/7"
            ></CouponCard5>
          </Col>
          <Col className={`col-6`}>
            <CouponCard5
              title="優惠券名稱"
              height="100px"
              deadline="2023/8/7"
            ></CouponCard5>
          </Col>
          <Col className={`col-6`}>
            <CouponCard5
              title="優惠券名稱"
              height="100px"
              deadline="2023/8/7"
            ></CouponCard5>
          </Col>
          <Col className={`col-6`}>
            <CouponCard5
              title="優惠券名稱"
              height="100px"
              deadline="2023/8/7"
            ></CouponCard5>
          </Col>
          <Col className={`col-6`}>
            <CouponCard5
              title="優惠券名稱"
              height="100px"
              deadline="2023/8/7"
            ></CouponCard5>
          </Col>
          <Col className={`col-6`}>
            <CouponCard5
              title="優惠券名稱"
              height="100px"
              deadline="2023/8/7"
            ></CouponCard5>
          </Col>
        </Row>
      </Col>
    </ChContainer>
  );
}

export default Coupons;
