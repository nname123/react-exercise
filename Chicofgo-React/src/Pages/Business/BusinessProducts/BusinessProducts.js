import { useState, useEffect } from 'react';
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
import ProductsList from './Components/ProductsList';
import axios from 'axios';
import style from './BusinessProducts.module.scss';

function BusinessProducts() {
  const [searchName, setSearchName] = useState('');
  const [searchPackage, setSearchPackage] = useState('');
  const [searchType, setSearchType] = useState('');
  const [type, setType] = useState([]);
  const [boxing, setBoxing] = useState([]);

  const handleChangeName = (e) => {
    setSearchName(e.target.value);
  };

  const handleChangeType = (e) => {
    setSearchType(e.target.value);
  };

  const handleChangePackage = (e) => {
    setSearchPackage(e.target.value);
  };

  //類別
  useEffect(() => {
    async function gettype() {
      let response = await axios.get(
        `http://localhost:3001/api/business/products/type`
      );
      setType(response.data);
    }
    gettype();
  }, []);
  // console.log(type);
  console.log(searchType);
  console.log(searchPackage);

  //包裝
  useEffect(() => {
    async function getpackage() {
      let response = await axios.get(
        `http://localhost:3001/api/business/products/package`
      );
      setBoxing(response.data);
    }
    getpackage();
  }, []);
  // console.log(boxing);

  return (
    <div className="chicofgo_white">
      <Container className="pt-5">
        <Row>
          <BusinessSiderbar />
          <Col>
            <Row className="bg-white">
              <Col sm={12} className="text-center pt-2">
                <h4>商品管理</h4>
              </Col>
              <Col sm={6} className="my-2">
                <InputGroup className="mb-3">
                  <div className="d-flex align-items-center mx-2">商品名稱</div>
                  <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    placeholder="請輸入商品名稱"
                    value={searchName}
                    onChange={handleChangeName}
                  />
                </InputGroup>
              </Col>
              <Col sm={6}></Col>
              <InputGroup className="align-items-center pb-2 ms-2">
                商品類別
                <Col sm={3} className="my-2 mx-2">
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    className=""
                    name="singleType"
                    value={type.type}
                    onChange={handleChangeType}
                  >
                    <option>類別</option>
                    {type.map((type) => {
                      return (
                        <option value={type.type} key={type.type}>
                          {type.type}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col sm={3} className="my-2">
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    className="me-2"
                    name="singlePackage"
                    value={boxing.package}
                    onChange={handleChangePackage}
                  >
                    <option>包裝</option>
                    {boxing.map((boxing) => {
                      return (
                        <option value={boxing.package} key={boxing.package}>
                          {boxing.package}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </InputGroup>
              <div className="chicofgo_gray d-flex text-center py-2">
                <Col className={`${style.option}`}>商品名稱</Col>
                <Col className={`${style.option}`}>商品類別</Col>
                <Col className={`${style.option}`}>商品包裝</Col>
                <Col className={`${style.option}`}>價錢</Col>
                <Col className={`${style.option}`}>商品數量</Col>
                <Col className={`${style.option}`}>狀態</Col>
              </div>
            </Row>
            <ProductsList
              searchName={searchName}
              searchType={searchType}
              searchPackage={searchPackage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BusinessProducts;
