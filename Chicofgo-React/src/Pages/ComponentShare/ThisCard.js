import style from './ThisCard.module.scss';
import { v4 } from 'uuid';
import { FaShoppingCart, FaBookmark } from 'react-icons/fa';
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Modal,
  Placeholder,
  Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

function ThisCard(props) {
  const { isLoggedIn, userid } = useAuth();
  const { product_id, goToUrl } = props;
  const redirectTo = goToUrl || '';
  const [backendData, setBackendData] = useState([]);
  const [title, setTitle] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductData() {
      try {
        let response = await axios.get(
          `http://localhost:3001/api/products/productData/${product_id}`
        );
        // console.log(response.data[0]);
        setBackendData(response.data[0]);
        if (response.data[0].name.length > 10) {
          let chunkSize = 10;
          let inputString = response.data[0].name;
          for (let i = 0; i < inputString.length; i += chunkSize) {
            let chunk = inputString.substr(i, chunkSize);
            if (title.length >= 2) {
              chunk += '...';
              title.push(chunk);
              break;
            }
            title.push(chunk);
          }
          setTitle(title);
        }
      } catch (e) {
        if (e.response.status === 400) {
          console.log('????????????');
        }
      }
    }
    getProductData();
  }, []);

  //???????????????
  async function sendCart() {
    if (isLoggedIn) {
      try {
        let response = await axios.post(
          'http://localhost:3001/api/products/sendCart',
          {
            cartProductId: backendData.product_id,
            cartUserId: userid,
            cartPrice: backendData.price,
            cartQuantity: 1,
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
        console.log(response.data);
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
        setShowTF(true);
        // ????????????
        if (redirectTo) {
          setShowTFMsg({ title: '????????????', msg: '????????????,1????????????' });
          const timeoutId = setTimeout(() => {
            navigate(redirectTo);
          }, 1000);
        } else {
          setShowTFMsg({ title: '????????????', msg: '????????????' });
        }
      }
    } catch (e) {
      console.log('????????????');
      setShowTFMsg({ title: '????????????', msg: '????????????' });
      setShowTF(true);
      console.log(e.response.data.errors);
    }
  }
  return (
    <Card className={`${style.thisCard} m-0 mx-auto`}>
      <Link
        className={`${style.LinkHover} text-decoration-none chicofgo_dark_font chicofgo-font`}
        to={`/products/product_detail/${product_id}`}
      >
        {product_id ? (
          <Card.Img
            variant="top"
            src={`http://localhost:3001/api/images/productImg/coffee_${product_id}/coffee_${product_id}-1.png`}
          />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '150px' }}
          >
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="dark" />
          </div>
        )}

        <Card.Body className={`text-center  p-0 ${style.textOverFlowBody}`}>
          {title[0] ? (
            <Card.Text className={`text-center`}>
              {title[0] || ''}
              <br />
              {title[1] || ''}
              <br />
              {title[2] || ''}
            </Card.Text>
          ) : (
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={3} />{' '}
              <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
              <Placeholder xs={8} />
            </Placeholder>
          )}
        </Card.Body>
        <Card.Body className={`text-center py-1`}>
          {new Array(backendData.rating).fill().map((star) => {
            return <span key={star}>???</span>;
          })}
        </Card.Body>
      </Link>
      <Card.Footer className={` fs-4 py-1`}>
        <Row className={`justify-content-between text-center`}>
          <Col className={`col-6`}>
            <span className={`chicofgo-font-700 text-nowrap`}>
              ${backendData.price}
            </span>
          </Col>
          <Col className={`col-3`}>
            <div className={`${style.useFinger}`} onClick={sendCollect}>
              <span className={`chicofgo_brown_font`}>
                <FaBookmark />
              </span>
            </div>
          </Col>
          <Col className={`col-3`}>
            <div className={`${style.useFinger}`} onClick={sendCart}>
              <span className={`chicofgo_brown_font`}>
                <FaShoppingCart />
              </span>
            </div>
          </Col>
        </Row>
      </Card.Footer>
      {/* ????????????-??????????????? */}
      <Modal show={isShow} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>???????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>
          {isLoggedIn ? showMsg : '????????????,????????????????????????!'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-chicofgo-brown" onClick={handleClose}>
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
      <Modal show={isShowC} onHide={handleCloseC} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>
          {isLoggedIn ? showMsgC : '????????????,????????????????????????!'}
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row className={`justify-content-between`}>
              {askDelectShowC ? (
                <Col className={`p-0 col-auto`}>
                  <Button variant="danger" onClick={handleDeleteCollect}>
                    ????????????
                  </Button>
                </Col>
              ) : (
                ''
              )}
              <Col></Col>

              <Col className={`p-0 col-auto`}>
                <Button variant="outline-chicofgo-brown" onClick={handleCloseC}>
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
      <Modal show={showTF} onHide={handleCloseTF} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>{showTFMsg.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>{showTFMsg.msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-chicofgo-brown" onClick={handleCloseTF}>
            ??????
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ThisCard;
