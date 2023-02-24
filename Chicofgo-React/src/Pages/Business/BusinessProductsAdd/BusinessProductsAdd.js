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
  Modal,
} from 'react-bootstrap';
import BusinessSiderbar from '../Components/BusinessSiderbar';
import { Link, useAsyncError } from 'react-router-dom';
import axios from 'axios';

function BusinessProductsAdd() {
  const [placeOfOrigin, setPlaceOfOrigin] = useState([]);
  const [type, setType] = useState([]);
  const [boxing, setBoxing] = useState([]);
  //彈跳視窗
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //物件寫法
  const [addProduct, setAddProduct] = useState({
    brand: '',
    name: '',
    singlePlace: '',
    singleType: '',
    singlePackage: '',
    amount: '',
    price: '',
    detail: '',
    introduction: '',
    photo: '',
  });

  function handleChange(e) {
    let newAddProduct = { ...addProduct };
    newAddProduct[e.target.name] = e.target.value;
    setAddProduct(newAddProduct);
  }

  function handleUpload(e) {
    // 值存在files
    setAddProduct({ ...addProduct, photo: e.target.files });
  }
  //產地
  useEffect(() => {
    async function getplaceOfOrigin() {
      let response = await axios.get(
        `http://localhost:3001/api/business/products/place`
      );
      setPlaceOfOrigin(response.data);
    }
    getplaceOfOrigin();
  }, []);
  console.log(placeOfOrigin);

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
  console.log(type);

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
  console.log(boxing);

  //上架，點擊按鈕把資料送到後端
  async function handleSubmitOn(e) {
    let formData = new FormData();
    formData.append('brand', addProduct.brand);
    formData.append('name', addProduct.name);
    formData.append('singlePlace', addProduct.singlePlace);
    formData.append('singleType', addProduct.singleType);
    formData.append('singlePackage', addProduct.singlePackage);
    formData.append('amount', addProduct.amount);
    formData.append('price', addProduct.price);
    formData.append('detail', addProduct.detail);
    formData.append('introduction', addProduct.introduction);
    // formData.append('photo', addProduct.photo);

    for (let i = 0; i < addProduct.photo.length; i++) {
      formData.append('photo', addProduct.photo[i]);
    }

    let response = await axios.post(
      'http://localhost:3001/api/business/productOn',
      formData
    );

    console.log(response.data);
    //清空表單
    setAddProduct({
      brand: '',
      name: '',
      singlePlace: '',
      singleType: '',
      singlePackage: '',
      amount: '',
      price: '',
      detail: '',
      introduction: '',
      photo: '',
    });
    //彈跳出視窗
    setShow(true);
  }
  //新增並下架
  async function handleSubmitOff(e) {
    //有檔案的表單
    let formData = new FormData();
    formData.append('brand', addProduct.brand);
    formData.append('name', addProduct.name);
    formData.append('singlePlace', addProduct.singlePlace);
    formData.append('singleType', addProduct.singleType);
    formData.append('singlePackage', addProduct.singlePackage);
    formData.append('amount', addProduct.amount);
    formData.append('price', addProduct.price);
    formData.append('detail', addProduct.detail);
    formData.append('introduction', addProduct.introduction);
    formData.append('price', addProduct.price);
    formData.append('photo', addProduct.photo);

    let response = await axios.post(
      'http://localhost:3001/api/business/productOff',
      formData
    );
    console.log(response.data);
    //清空表單
    setAddProduct({
      brand: '',
      name: '',
      singlePlace: '',
      singleType: '',
      singlePackage: '',
      amount: '',
      price: '',
      detail: '',
      introduction: '',
      photo: '',
    });
    //彈跳出視窗
    setShow(true);
  }

  return (
    <div className="chicofgo_white">
      <Container className="pt-5">
        <Row>
          <BusinessSiderbar />
          <Col>
            <Row className="bg-white">
              <Col sm={12} className="text-center pt-2">
                <h4>新增商品</h4>
              </Col>
              <Col sm={10} className="my-2">
                <div className="pb-3">商品圖片：</div>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Control
                    type="file"
                    id="photo"
                    name="photo"
                    multiple
                    onChange={handleUpload}
                  />
                </Form.Group>
              </Col>
              <Col sm={10} className="my-2">
                <InputGroup className="align-items-center pb-2">
                  品牌：
                  <Form.Control
                    size="sm"
                    type="text"
                    id="brand"
                    name="brand"
                    value={addProduct.brand}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={10} className="my-2">
                <InputGroup className="align-items-center pb-2">
                  商品名稱：
                  <Form.Control
                    size="sm"
                    type="text"
                    id="name"
                    name="name"
                    value={addProduct.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={10} className="my-2">
                <InputGroup className="align-items-center pb-2">
                  商品類別：
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    name="singlePlace"
                    className="me-2"
                    value={addProduct.singlePlace}
                    onChange={handleChange}
                  >
                    <option>產地</option>
                    {placeOfOrigin.map((origin) => {
                      return (
                        <option key={origin.oid} value={origin.oid}>
                          {origin.place}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    className="me-2"
                    name="singleType"
                    value={addProduct.singleType}
                    onChange={handleChange}
                  >
                    <option>類別</option>
                    {type.map((type) => {
                      return (
                        <option value={type.tid} key={type.tid}>
                          {type.type}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    className="me-2"
                    name="singlePackage"
                    value={addProduct.singlePackage}
                    onChange={handleChange}
                  >
                    <option>包裝</option>
                    {boxing.map((boxing) => {
                      return (
                        <option value={boxing.pid} key={boxing.pid}>
                          {boxing.package}
                        </option>
                      );
                    })}
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col sm={10} className="my-2">
                <InputGroup className="align-items-center pb-2">
                  商品數量：
                  <Form.Control
                    size="sm"
                    type="text"
                    id="amount"
                    name="amount"
                    value={addProduct.amount}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={10} className="my-2">
                <InputGroup className="align-items-center pb-2">
                  商品價格：
                  <Form.Control
                    size="sm"
                    type="text"
                    id="price"
                    name="price"
                    value={addProduct.price}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
              <Col sm={10} className="my-2">
                <Form.Label>商品細節</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  id="detail"
                  name="detail"
                  value={addProduct.detail}
                  onChange={handleChange}
                />
              </Col>
              <Col sm={10} className="my-2">
                <Form.Label>商品描述</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  id="introduction"
                  name="introduction"
                  value={addProduct.introduction}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col sm={5}>
                <Button
                  className="ms-1 me-2"
                  variant="chicofgo-brown text-white"
                  onClick={handleSubmitOn}
                >
                  儲存並上架
                </Button>
                <Button
                  variant="chicofgo-khaki text-white"
                  onClick={handleSubmitOff}
                >
                  儲存不上架
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>上傳成功</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="chicofgo-brown text-white" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BusinessProductsAdd;
