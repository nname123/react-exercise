import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Dropdown,
  DropdownButton,
  InputGroup,
} from 'react-bootstrap';
import BusinessSiderbar from '../Components/BusinessSiderbar';
import CouponCard5 from '../../Account/Coupons/Component/CouponCard5';

function BusinessCoupon() {
  return (
    <div className="chicofgo_white">
      <Container className="pt-5">
        <Row>
          <BusinessSiderbar />
          <Col>
            <Row className="bg-white">
              <Col sm={12} className="text-center pt-2 my-2">
                <h4>優惠券</h4>
              </Col>
              <Form>
                {['checkbox'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Row className="text-center">
                      <Col sm={2}></Col>
                      <Col sm={2}>
                        <Form.Check
                          inline
                          label="全部"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                        />
                      </Col>
                      <Col sm={2}>
                        <Form.Check
                          inline
                          label="有效票券"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                        />
                      </Col>
                      <Col sm={2}>
                        <Form.Check
                          inline
                          label="已過期票券"
                          name="group1"
                          type={type}
                          id={`inline-${type}-3`}
                        />
                      </Col>
                      <Col sm={2}>
                        <InputGroup className="mb-3">
                          <Form.Control
                            size="sm"
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>
                      </Col>
                      <Col sm={2}></Col>
                    </Row>
                  </div>
                ))}
              </Form>
            </Row>
            <Row className="justify-content-between mt-4">
              <Col sm={2}>查詢結果</Col>

              <Col sm={2}>
                <Button className="" variant="chicofgo-brown text-white">
                  ＋新增優惠券
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={6}>
                <CouponCard5
                  title="優惠券名稱"
                  height="100px"
                  deadline="2023/8/7"
                ></CouponCard5>
              </Col>
              <Col sm={6}>
                <CouponCard5
                  title="優惠券名稱"
                  height="100px"
                  deadline="2023/8/7"
                ></CouponCard5>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BusinessCoupon;
