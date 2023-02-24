import { useState } from 'react';
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
import BusinessOrderList from './Components/BusinessOrderList';
import style from './BusinessOrder.module.scss';

function BusinessOrder() {
  const [search, setSearch] = useState('');

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedStatus(e.target.value);
  };
  // console.log(search);
  console.log(selectedStatus);

  return (
    <div className="chicofgo_white">
      <Container className="pt-5">
        <Row>
          <BusinessSiderbar />
          <Col>
            <Row className="bg-white btn-group">
              <Col sm={12} className="text-center pt-2 pb-3">
                <h4>訂單管理</h4>
              </Col>
              <Col className="col-2"></Col>
              <Col className={`text-center col-2 ${style.button}`}>
                <Button
                  variant="chicofgo-brown text-white"
                  value={''}
                  onClick={handleSelect}
                >
                  全部
                </Button>
              </Col>
              <Col className="text-center col-2">
                <Button
                  variant="chicofgo-brown text-white"
                  value="1"
                  onClick={handleSelect}
                >
                  待出貨
                </Button>
              </Col>
              <Col className="text-center col-2">
                <Button
                  variant="chicofgo-brown text-white"
                  value="2"
                  onClick={handleSelect}
                >
                  運送中
                </Button>
              </Col>
              <Col className="text-center col-2">
                <Button
                  variant="chicofgo-brown text-white"
                  value="已完成"
                  onClick={handleSelect}
                >
                  已完成
                </Button>
              </Col>

              <Col className="col-2"></Col>

              <Col sm={6} className="my-3">
                <InputGroup className="mb-3">
                  <div className="d-flex align-items-center mx-2">商品名稱</div>
                  <Form.Control
                    type="text"
                    class="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="請輸入買家姓名"
                    value={search}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
              {/* <Col sm={10} className="my-4">
                <div className="input-group">
                  <Col sm={2}>
                    <div className="d-flex align-items-center">商品名稱</div>
                  </Col>
                  <Col>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with dropdown button"
                      placeholder="請輸入買家姓名"
                      value={search}
                      onChange={handleChange}
                    />
                  </Col>
                </div>
              </Col> */}
              {/* <Col sm={2} className="my-4">
                <Button className="px-5" variant="chicofgo-brown text-white">
                  查詢
                </Button>
              </Col> */}
              {/* <Col sm={12}>查詢結果</Col> */}
              <div className="chicofgo_gray d-flex text-center py-2">
                <Col>日期</Col>
                <Col>編號</Col>
                <Col>購買人</Col>
                <Col>狀態</Col>
                <Col className={`${style.control}`}>操作</Col>
              </div>
            </Row>
            <Col>
              <BusinessOrderList
                search={search}
                selectedStatus={selectedStatus}
              />
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BusinessOrder;
