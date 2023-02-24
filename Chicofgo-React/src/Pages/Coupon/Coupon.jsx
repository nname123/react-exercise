import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './Coupon.module.scss';
import CouponCard from './Component/CouponCard';
import CouponCard2 from './Component/CouponCard2';
// import CouponCard3 from './Component/CouponCard3';

function Coupon() {
  return (
    <Container fluid className={`${style.couponContainer}`}>
      <Row className={`justify-content-center  ${style.borderBottom}`}>
        <Col className={`${style.mainPage}`} xs={11} md={8} xl={6} xxl={5}>
          <Row className={`${style.oneAreaTitle} my-3`}>
            <h1 className={`my-3`}>早鳥辦年貨馬上領券! 下單更優惠!</h1>
          </Row>
          <Row className={`${style.oneArea}`}>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/25 商城$199免運"
                height="130px"
                id={1}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="1/1 商城$399免運"
                height="130px"
                id={2}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="1/11 商城$299免運"
                height="130px"
                id={3}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="2/2 商城$99免運"
                height="130px"
                id={4}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="2/14 商城$199免運"
                height="130px"
                id={5}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="2/28 商城$199免運"
                height="130px"
                id={6}
              ></CouponCard>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        className={`justify-content-center ${style.borderBottom} ${style.lightBg}`}
      >
        <Col className={`${style.mainPage}`} xs={11} md={8} xl={6} xxl={4}>
          <Row className={`${style.oneAreaTitle} `}>
            <h1 className={`my-3`}>新春限定優惠券</h1>
          </Row>
          <Row className={`${style.twoArea}`}>
            <Col className={`col-12 col-md-6 p-0 p-md-1`}>
              <CouponCard2
                title="2/1 商城全日$99免運"
                height="80px"
                id={11}
              ></CouponCard2>
              <CouponCard2
                title="2/2 商城全日$199免運"
                height="80px"
                id={12}
              ></CouponCard2>
              <CouponCard2
                title="2/3 商城全日$299免運"
                height="80px"
                id={13}
              ></CouponCard2>
            </Col>
            <Col className={`col-12 col-md-6 p-0 p-md-1`}>
              <CouponCard2
                title="2/4 商城全日$99免運"
                height="80px"
                id={14}
              ></CouponCard2>
              <CouponCard2
                title="2/5 商城全日$199免運"
                height="80px"
                id={15}
              ></CouponCard2>
              <CouponCard2
                title="2/6 商城全日$299免運"
                height="80px"
                id={16}
              ></CouponCard2>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className={`justify-content-center  ${style.borderBottom}`}>
        <Col className={`${style.mainPage}`} xs={11} md={8} xl={6} xxl={5}>
          <Row className={`${style.oneAreaTitle} my-3`}>
            <h1 className={`my-3`}>聖誕優惠券</h1>
          </Row>
          <Row className={`${style.oneArea}`}>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/23 $100折抵券"
                height="130px"
                id={21}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/24 $200折抵券"
                height="130px"
                id={22}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/25 $150折抵券"
                height="130px"
                id={23}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/25 $200折抵券"
                height="130px"
                id={24}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/26 $50折抵券"
                height="130px"
                id={25}
              ></CouponCard>
            </Col>
            <Col className={`col-6 col-md-4 p-0 p-md-1`}>
              <CouponCard
                title="12/26 $50折抵券"
                height="130px"
                id={26}
              ></CouponCard>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        className={`justify-content-center ${style.borderBottom} ${style.lightBg}`}
      >
        <Col className={`${style.mainPage}`} xs={11} md={8} xl={6} xxl={4}>
          <Row className={`${style.oneAreaTitle} `}>
            <h1 className={`my-3`}>指定商城優惠券</h1>
          </Row>
          <Row className={`${style.twoArea}`}>
            <Col className={`col-12 col-md-6 p-0 p-md-1`}>
              <CouponCard2
                title="雀巢 滿千折百"
                height="80px"
                id={31}
              ></CouponCard2>
              <CouponCard2
                title="UCC 指定商品買五送一"
                height="80px"
                id={32}
              ></CouponCard2>
              <CouponCard2
                title="伯朗 指定商品買三送一"
                height="80px"
                id={33}
              ></CouponCard2>
            </Col>
            <Col className={`col-12 col-md-6 p-0 p-md-1`}>
              <CouponCard2
                title="星巴克 滿兩千折百"
                height="80px"
                id={34}
              ></CouponCard2>
              <CouponCard2
                title="西雅圖 滿千折百"
                height="80px"
                id={35}
              ></CouponCard2>
              <CouponCard2
                title="貝納頌 指定商品買六送一"
                height="80px"
                id={36}
              ></CouponCard2>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Coupon;
