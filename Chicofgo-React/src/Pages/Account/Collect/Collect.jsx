import { Row, Col, Form, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';
// import { Link, NavLink } from 'react-router-dom';
import ChContainer from '../../ComponentShare/ChContainer';
import style from './Collect.module.scss';
// import CollectItem from './Component/CollectItem';
function Collect() {
  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'我的收藏'}
    >
      <Col>
        <Row>
          <Col>
            <h1
              className={`${style.collectTitle} text-center pt-3 pb-2 py-md-5  `}
            >
              我的收藏
            </h1>
          </Col>
        </Row>
        {/* <Row
          className={`chicofgo_gray justify-content-center text-center px-4 pt-2 mb-3`}
        >
          <Col className={`col-4`}>
            <Row>
              <Col className={`col `}>
                商家
                <Nav
                  variant="tabs"
                  defaultActiveKey="/member/collect/items"
                  className={`justify-content-evenly`}
                >
                  <Nav.Item>
                    <Nav.Link as={NavLink} to="/member/collect/shop">
                      <p className={`px-3 py-0 my-0 chicofgo_dark_font`}>
                        商家
                      </p>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={NavLink} to="/member/collect/items">
                      <p className={`px-3 py-0 my-0 chicofgo_dark_font`}>
                        商品
                      </p>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className={`col `}>商品</Col>
            </Row>
          </Col>
        </Row> */}
        <Row
          className={`${style.collectAreaHeight} mb-5 justify-content-center`}
        >
          {/* <CollectItem /> */}
          <Outlet />
        </Row>
      </Col>
    </ChContainer>
  );
}

export default Collect;
