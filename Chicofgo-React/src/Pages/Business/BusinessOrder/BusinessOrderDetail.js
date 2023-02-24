import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { Link } from 'react-router-dom';
import axios from 'axios';
import BusinessSiderbar from '../Components/BusinessSiderbar';

function BusinessOrder() {
  const { orderId } = useParams();
  const { memberId } = useParams();
  const { memberinfoId } = useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  // console.log('orderDetail', orderId);

  useEffect(() => {
    async function getproducts() {
      let response = await axios.get(
        `http://localhost:3001/api/business/order/${orderId}/${memberId}/${memberinfoId}`
      );
      setProducts(response.data.products);
      setOrder(response.data.orderDatas[0]);
    }
    getproducts();
  }, []);
  console.log('訂單詳細', products);
  console.log('訂單個人資料', order);
  //取得陣列資料放進data

  return (
    <div className="chicofgo_white">
      <Container className="pt-5">
        <Row>
          <BusinessSiderbar />
          <Col>
            <Row className="bg-white">
              <Col sm={12} className="text-center pt-2">
                <h4>訂單詳細</h4>
              </Col>
              <Col sm={12} className="py-4">
                <h5>訂單內容</h5>
              </Col>
              {products.map((product) => {
                return (
                  <Row className="text-center border-top ms-1 py-3 align-items-center">
                    <Col sm={3} className="align-middle">
                      {product.brand}
                    </Col>
                    <Col sm={3}>{product.name}</Col>
                    <Col sm={3}>x {product.quantity}</Col>
                    <Col sm={3}>{product.price}</Col>
                  </Row>
                );
              })}

              {/* <Col sm={12} className="text-end py-1">
                  小記：
                </Col>
                <Col sm={12} className="text-end py-1">
                  商品折抵
                </Col> */}
              {/* <Col sm={12} className="text-end py-1">
                  運費
                </Col> */}
              <Col sm={12} className="text-end py-1">
                總計：{order.price}
              </Col>
              <Col sm={12} className="pt-2 border-top border-bottom pt-4 pb-3">
                <h5>收件人資訊</h5>
              </Col>
              <Col sm={12} className="py-1">
                收件人：{order.name}
              </Col>
              <Col sm={12} className="py-1">
                收件人地址：{order.address}
              </Col>
              <Col sm={12} className="py-1">
                收件人電話：{order.phone}
              </Col>
              <Col sm={12} className="py-1">
                寄送資訊：{' '}
                {order.send_information == 1
                  ? '7-ELEVEN'
                  : order.send_information == 2
                  ? '全家'
                  : order.send_information == 3
                  ? '萊爾富'
                  : order.send_information == 4
                  ? 'OK'
                  : order.send_information == 5
                  ? '宅配'
                  : '未使用'}
              </Col>
              <Col sm={12} className="py-1">
                付款方式：
                {order.pay === 1
                  ? '貨到付款'
                  : order.pay === 2
                  ? '信用卡/金融卡'
                  : order.pay === 3
                  ? '銀行轉帳'
                  : '沒付錢'}
              </Col>
              <Col sm={12} className="py-1 text-end">
                <Link to={`/businessOrder`}>
                  <Button variant="chicofgo-brown text-white">返回</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BusinessOrder;
