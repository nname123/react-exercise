import React, { useEffect, useState, useMemo, Fragment, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { cardDetail } from '../../../Config/ProductConfig';
import Path from '../../../Layout/Item/Path/Path';
// import axios from 'axios';
import { BsFillReplyFill } from 'react-icons/bs';
// import mainPic from '../../../Img/ProductsTest/test.jpg';
// import PicRender from './Component/PicRender';
import ShowPic from './Component/ShowPic';
// import ProductInfo from './Component/ProductInfo';
// import Specification from './Component/Specification';
// import OrtherWrap from './Component/OrtherSwiper';
// import EvaluateArea from './Component/EvaluateArea';
// import MessageArea from './Component/MessageArea';
import axios from 'axios';
import { useProduct } from '../../../Contexts/ProductProvider';
import { useMessage } from '../../../Contexts/MessageProvider';
import { useAuth } from '../../../Contexts/AuthContext';
import {
  Image,
  Row,
  Col,
  Button,
  Container,
  Modal,
  InputGroup,
  Form,
  Spinner,
} from 'react-bootstrap';
import style from './ProductDetail.module.scss';
import {
  BsFillBellFill,
  BsSuitHeartFill,
  BsFillPersonFill,
  BsFillCartFill,
} from 'react-icons/bs';
import MoreCard from '../../ComponentShare/MoreCard';

const ProductDetail = () => {
  const { isLoggedIn, userid } = useAuth();
  const [backendData, setBackendData] = useState([]);
  const [backendReview, setBackendReview] = useState([]);
  const [productAmount, setProductAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [showMsg, setShowMsg] = useState('');
  const handleClose = () => setIsShow(false);
  const [isShowC, setIsShowC] = useState(false);
  const [showMsgC, setShowMsgC] = useState('');
  const [askDelectShowC, setAskDelectShowC] = useState(false);
  const [showTF, setShowTF] = useState(false);
  const [showTFMsg, setShowTFMsg] = useState({ title: '', msg: '' });
  const handleCloseC = () => setIsShowC(false);
  const handleCloseTF = () => setShowTF(false);

  const location = useLocation();
  const urlArray = location.pathname.split('/');
  const product_id = parseInt(urlArray[urlArray.length - 1]);

  useEffect(() => {
    //?????????????????????
    const existingData =
      JSON.parse(localStorage.getItem('productsViewed')) || [];
    const currentUserId = userid;

    const currentUserDataIndex = existingData.findIndex(
      (item) => item.userId === currentUserId
    );

    if (currentUserDataIndex === -1) {
      localStorage.removeItem('productsViewed');
      if (product_id) {
        localStorage.setItem(
          'productsViewed',
          JSON.stringify([
            { userId: currentUserId, productsViewed: [product_id] },
          ])
        );
      } else {
        localStorage.setItem(
          'productsViewed',
          JSON.stringify([{ userId: currentUserId, productsViewed: [] }])
        );
      }
    } else {
      const currentUserData = existingData[currentUserDataIndex];

      const isExisting = currentUserData.productsViewed.includes(product_id);
      if (!isExisting && product_id != null) {
        if (currentUserData.productsViewed.length >= 10) {
          currentUserData.productsViewed.shift();
        }
        currentUserData.productsViewed.push(product_id);
      }
      existingData[currentUserDataIndex] = currentUserData;
      localStorage.setItem('productsViewed', JSON.stringify(existingData));
    }
    // ???????????????
    getProductData();
    // ???????????????
    getProductReview();
  }, []);

  // 0.5??????????????????spinner
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [isLoading]);

  // ????????????????????????
  useEffect(() => {
    setIsLoading(true);
    getProductData();
    getProductReview();
  }, [location]);

  // ???????????????
  function Rating({ value }) {
    const rating = Array.from({ length: value }, (_, index) => (
      <span key={index}>???</span>
    ));
    return <>{rating}</>;
  }
  // ?????????????????????
  function handleChange(event) {
    const newValue = event.target.value;
    const regex = /^[0-9\b]+$/;
    if (
      regex.test(newValue) &&
      parseInt(newValue) > 0 &&
      parseInt(newValue) < 1000
    ) {
      setProductAmount(parseInt(newValue));
    } else {
      setProductAmount(parseInt(productAmount));
    }
  }

  // ???????????????
  async function getProductData() {
    try {
      let response = await axios.get(
        `http://localhost:3001/api/products/productDetail/${product_id}`
      );
      console.log(response.data[0]);
      setBackendData(response.data[0]);
    } catch (e) {
      if (e.response.status === 400) {
        console.log('????????????');
      }
    }
  }
  // ???????????????
  async function getProductReview() {
    try {
      let response = await axios.get(
        `http://localhost:3001/api/products/productReview/${product_id}`
      );
      console.log(response.data.productReview);
      setBackendReview(response.data.productReview);
    } catch (e) {
      if (e.response.status === 400) {
        console.log('?????????');
      }
    }
  }

  //???????????????
  async function sendCart() {
    if (isLoggedIn) {
      try {
        let response = await axios.post(
          'http://localhost:3001/api/products/sendCart',
          {
            cartProductId: product_id,
            cartUserId: userid,
            cartPrice: backendData.price,
            cartQuantity: productAmount,
          }
        );
        if (response.data.result === 'ok') {
          setIsShow(true);
          setShowMsg('?????????????????????');
        } else if (response.data.result === 'been added') {
          setIsShow(true);
          setShowMsg('????????????????????????????????????????????????');
        } else {
          setIsShow(true);
          setShowMsg('????????????');
        }
        console.log('???????????????', response.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsShow(true);
    }
  }
  //????????????
  async function sendCollect() {
    if (isLoggedIn) {
      try {
        let response = await axios.post(
          'http://localhost:3001/api/members/sendUserCollect',
          {
            product_id: backendData.product_id,
            member_id: userid,
          }
        );
        if (
          response.data.result === 'ok' ||
          response.data.result === 'rejoin'
        ) {
          setAskDelectShowC(false);
          setIsShowC(true);
          setShowMsgC('??????????????????');
        } else if (response.data.result === 'been added') {
          setIsShowC(true);
          setAskDelectShowC(true);
          setShowMsgC('?????????????????????????????????????????????');
        } else {
          setAskDelectShowC(false);
          setIsShowC(true);
          setShowMsgC('????????????');
        }
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsShowC(true);
    }
  }
  // ????????????
  async function handleDeleteCollect() {
    try {
      let response = await axios.post(
        'http://localhost:3001/api/members/deleteCollect',
        { product_id: backendData.product_id },
        {
          // ?????????????????? cookie
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsShowC(false);
      if (response.status === 200) {
        console.log('????????????');
        setShowTFMsg({ title: '????????????', msg: '????????????' });
        setShowTF(true);
      }
    } catch (e) {
      console.log('????????????');
      setShowTFMsg({ title: '????????????', msg: '????????????' });
      setShowTF(true);
      console.log(e.response.data.errors);
    }
  }

  return (
    <>
      {/* {isLoading ? (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </>
      ) : ( */}
      <Container>
        <Row className={`justify-content-center`}>
          <Col className="col-10 mb-5">
            <Row className={`justify-content-between`}>
              <Col className={`col-auto`}>
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center text-center fs-6"
                    style={{ marginTop: '70px' }}
                  >
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                  </div>
                ) : (
                  <Path
                    pathObj={{
                      path: [
                        '????????????',
                        `${
                          backendData.name
                            ? backendData.name.length < 40
                              ? backendData.name
                              : backendData.name.substr(0, 40) + '...'
                            : ''
                        }`,
                      ],
                    }}
                    url={['/products']}
                  />
                )}
              </Col>
              <Col className={`col-auto align-self-end`}>
                <Button
                  variant="chicofgo-brown"
                  className={`d-flex align-items-center chicofgo_white_font`}
                  as={Link}
                  to="/products"
                >
                  <BsFillReplyFill />
                  ???????????????
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className={`chicofgo_gray p-4 mt-2 rounded-4 shadow`}>
                  <Col className={`col-6`}>
                    <div
                      style={{ position: 'sticky', top: '100px' }}
                      className={`mb-2`}
                    >
                      {isLoading ? (
                        <div
                          class="d-flex justify-content-center align-items-center rounded-4"
                          style={{
                            height: '530px',
                            backgroundColor: 'rgb(254,254,254)',
                          }}
                        >
                          <Spinner animation="border" variant="secondary" />
                        </div>
                      ) : (
                        <ShowPic product_id={product_id} />
                      )}
                    </div>
                  </Col>
                  <Col className={`${style.textArea} col-6 chicofgo-font px-4`}>
                    {isLoading ? (
                      <div
                        class="d-flex justify-content-center align-items-center"
                        style={{ height: '530px' }}
                      >
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    ) : (
                      <>
                        <Row>
                          <h3 className={`chicofgo-font-700 `}>
                            {backendData.name}
                          </h3>
                        </Row>
                        <Row>
                          <h5 style={{ whiteSpace: 'pre-wrap' }}>
                            {backendData.introduction
                              ? backendData.introduction.replace(
                                  /<br\s*\/?>/gm,
                                  '\n'
                                )
                              : ''}
                          </h5>
                        </Row>
                        <Row className={`my-3`}>
                          <Col className={`col-auto`}>
                            <p>??????:</p>
                          </Col>
                          <Col>
                            <span
                              className={`chicofgo_green_font chicofgo-font-700`}
                            >
                              $ {backendData.price}
                            </span>
                          </Col>
                        </Row>
                        <Row className={`my-3`}>
                          <Col className={`col-auto`}>
                            <p>??????:</p>
                          </Col>
                          <Col>
                            <span
                              className={`${style.productSpec}  align-middle rounded-3 px-2 py-1`}
                            >
                              {backendData.product_package
                                ? backendData.product_package
                                : '????????????'}
                            </span>
                          </Col>
                        </Row>
                        <Row className={`my-3`}>
                          <Col className={`col-auto`}>
                            <p>??????:</p>
                          </Col>
                          <Col className={`col-3`}>
                            {/* <span>{backendData.price}</span> */}
                            <span>
                              <InputGroup
                                size="sm"
                                className="m-0 p-0 overflow-visible"
                              >
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => {
                                    setProductAmount(
                                      parseInt(productAmount) - 1
                                    );
                                    if (productAmount <= 1) {
                                      setProductAmount(1);
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <Form.Control
                                  type="text"
                                  defaultValue="1"
                                  className={`text-center p-0`}
                                  value={productAmount}
                                  onChange={handleChange}
                                />
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => {
                                    setProductAmount(
                                      parseInt(productAmount) + 1
                                    );
                                    if (productAmount >= 999) {
                                      setProductAmount(999);
                                    }
                                  }}
                                >
                                  +
                                </Button>
                              </InputGroup>
                            </span>
                          </Col>
                        </Row>
                        <Row className={`justify-content-evenly my-3 `}>
                          <Col className={`d-grid`}>
                            <Button
                              variant="chicofgo-dark"
                              className={`d-flex align-items-center justify-content-center chicofgo_white_font`}
                              onClick={sendCollect}
                            >
                              <BsSuitHeartFill />
                              &ensp;????????????
                            </Button>
                          </Col>
                          <Col className={`d-grid`}>
                            <Button
                              variant="chicofgo-green"
                              className={`d-flex align-items-center justify-content-center chicofgo_white_font`}
                              onClick={sendCart}
                            >
                              <BsFillCartFill />
                              &ensp;???????????????
                            </Button>
                          </Col>
                        </Row>

                        <Row>
                          <h4>??????????????????:</h4>
                          <h5 style={{ whiteSpace: 'pre-wrap' }}>
                            {backendData.detail
                              ? backendData.detail.replace(/<br\s*\/?>/gm, '\n')
                              : backendData.introduction
                              ? backendData.introduction.replace(
                                  /<br\s*\/?>/gm,
                                  '\n'
                                )
                              : ''}
                          </h5>
                        </Row>
                        <Row>
                          <h4>????????????:</h4>
                          <h5>
                            ?????????????????????????????????????????????????????????
                            <br />
                            ???????????????(02)7355-6087 #520 ?????????????????????~??????
                            9:00~18:00
                          </h5>
                        </Row>
                      </>
                    )}
                    {/* ????????????-??????????????? */}
                    <Modal
                      show={isShow}
                      onHide={handleClose}
                      centered
                      size="sm"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className={`fs-5 mx-1`}>
                          ???????????????
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`mx-1`}>
                        {isLoggedIn ? showMsg : '????????????,????????????????????????!'}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="outline-chicofgo-brown"
                          onClick={handleClose}
                        >
                          ??????
                        </Button>
                        {isLoggedIn ? (
                          ''
                        ) : (
                          <Button
                            as={Link}
                            to="/login"
                            variant="outline-chicofgo-green"
                            onClick={handleClose}
                          >
                            ????????????
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>
                    {/* ????????????-???????????? */}
                    <Modal
                      show={isShowC}
                      onHide={handleCloseC}
                      centered
                      size="sm"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className={`fs-5 mx-1`}>
                          ????????????
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`mx-1`}>
                        {isLoggedIn ? showMsgC : '????????????,????????????????????????!'}
                      </Modal.Body>
                      <Modal.Footer>
                        <Container>
                          <Row className={`justify-content-between`}>
                            {askDelectShowC ? (
                              <Col className={`p-0 col-auto`}>
                                <Button
                                  variant="danger"
                                  onClick={handleDeleteCollect}
                                >
                                  ????????????
                                </Button>
                              </Col>
                            ) : (
                              ''
                            )}
                            <Col></Col>

                            <Col className={`p-0 col-auto`}>
                              <Button
                                variant="outline-chicofgo-brown"
                                onClick={handleCloseC}
                              >
                                ??????
                              </Button>
                            </Col>

                            {isLoggedIn ? (
                              ''
                            ) : (
                              <Col className={`pe-0 col-auto`}>
                                <Button
                                  as={Link}
                                  to="/login"
                                  variant="outline-chicofgo-green"
                                  onClick={handleCloseC}
                                >
                                  ????????????
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </Container>
                      </Modal.Footer>
                    </Modal>
                    {/* ????????????-???????????? */}
                    <Modal
                      show={showTF}
                      onHide={handleCloseTF}
                      centered
                      size="sm"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className={`fs-5 mx-1`}>
                          {showTFMsg.title}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`mx-1`}>
                        {showTFMsg.msg}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="outline-chicofgo-brown"
                          onClick={handleCloseTF}
                        >
                          ??????
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={`chicofgo_gray pt-4 px-2 mt-5 rounded-4 shadow`}>
              <Col
                className={`text-center ${style.subTitle} chicofgo_brown_font chicofgo-font-700`}
              >
                ????????????
              </Col>
              <Col
                className={`d-flex justify-content-center flex-wrap mx-0 mt-3 mb-5`}
              >
                <MoreCard amount={12} />
                {/* <MoreCard amount={12} product_id={[9, 11, 15, 18, 22]} /> */}
              </Col>
            </Row>

            <Row
              className={`chicofgo_gray pt-4 px-2 my-5 rounded-4 d-flex flex-column justify-content-center shadow`}
            >
              <Col
                className={`text-center ${style.subTitle} chicofgo_brown_font chicofgo-font-700`}
              >
                ????????????
              </Col>
              <Col className={`p-4 pt-3`}>
                {backendReview.length <= 0 ? (
                  <Row>
                    <h5
                      className={`py-5 chicofgo_white rounded-5 chicofgo-font-700 chicofgo_green_font text-center`}
                    >
                      ?????????????????????
                    </h5>
                  </Row>
                ) : (
                  backendReview.map((review) => {
                    return (
                      <>
                        <Row className={`justify-content-center px-3 my-4`}>
                          <Col className={`text-center col-3`}>
                            <Image
                              alt=""
                              width={100}
                              height={100}
                              // src={require('../../../Img/messagedefultimg.png')}
                              src={
                                review.img
                                  ? `http://localhost:3001/api/images/member/${review.img}`
                                  : require('../../../Img/messagedefultimg.png')
                              }
                              className={`border border-3 rounded-circle my-2`}
                            />
                            <h4 className={`fs-6 mb-1`}>{review.name}</h4>
                            <span className={`m-0`}>
                              <Rating value={parseInt(review.message_rating)} />
                            </span>
                          </Col>
                          <Col
                            className={`col-9 chicofgo_white rounded-4 p-3 d-flex flex-column justify-content-between`}
                          >
                            <p>{review.speak}</p>
                            <span className="">
                              {new Date(review.message_time).toLocaleString(
                                'zh-TW',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </Col>
                        </Row>
                      </>
                    );
                  })
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
