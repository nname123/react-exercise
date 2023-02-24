import React, { useState, useLayoutEffect } from 'react';
import Results from './Results';
import axios from 'axios';
import './CardForm.scss';
import 'react-credit-cards-2/es/styles-compiled.css';
import { Button, Collapse, Col, Form, InputGroup, Row } from 'react-bootstrap';
import PopupWindow from '../../../ComponentShare/PopupWindow';
import { useNavigate } from 'react-router-dom';

function CardForm() {

  const navigate = useNavigate();
  const [submittedData, setSubmittedData] = useState({});
  const [backendData, setBackendData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    cvcError: '',
    cvc: false,
    expiryError: '',
    expiry: false,
    nameError: '',
    name: false,
    cardNumberError: '',
    cardNumber: false,
  });
  useLayoutEffect(() => {
    async function getAccountData() {
      let response = await axios.get(
        'http://localhost:3001/api/members/mycreditcard',
        {
          withCredentials: true,
        }
      );
      setBackendData(response.data);
    }
    getAccountData();
  }, []);

  function handleChange(e) {
    // 輸入框偵測
    let newData = { ...submittedData };
    newData[e.target.name] = e.target.value;
    setSubmittedData(newData);
    console.log(newData);
    // console.log(errors);
  }

  async function handleSubmit(e) {
    console.log('handleSubmit');
    e.preventDefault();
    // setSubmittedData({ name, cardNumber, expiry, cvc });
    try {
      let response = await axios.post(
        'http://localhost:3001/api/members/creditcardchange',
        submittedData,
        {
          // 為了跨源存取 cookie
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log('更新成功');
        setShowModal(true);
        setErrors({
          cvcError: '',
          cvc: false,
          expiryError: '',
          expiry: false,
          nameError: '',
          name: false,
          cardNumberError: '',
          cardNumber: false,
        });
      }
    } catch (e) {
      if (e.response.status === 401) {
        let allErrors = e.response.data.errors;
        console.log('更新失敗');
        console.log(allErrors);
        let newErrors = {
          cvcError: '',
          cvc: false,
          expiryError: '',
          expiry: false,
          nameError: '',
          name: false,
          cardNumberError: '',
          cardNumber: false,
        };
        allErrors.forEach((thisError) => {
          newErrors[thisError.param] = true;
          newErrors[thisError.param + 'Error'] = thisError.msg;
        });
        setErrors(newErrors);
        console.log(errors);
      }
    }
  }
  return (
    <Form className={`cardForm chicofgo-font`} Validate>
      {/* // <form className={`cardForm chicofgo-font`}> */}
      <h2 className={`text-center chicofgo-font-700 chicofgo_brown_font pb-3`}>
        信用卡修改
      </h2>
      {/* <hr /> */}
      <div className={` ${open ? 'd-none' : 'd-inline'}`}>
        <Results data={backendData} />
      </div>
      <div className={` ${open ? 'd-inline' : 'd-none'}`}>
        <Results data={submittedData} />
      </div>

      <hr />
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="outline-chicofgo-green"
      >
        編輯信用卡
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Row className="my-2">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              {/* <Form.Label>First name</Form.Label> */}
              <Form.Control
                required
                type="text"
                placeholder="持卡人姓名"
                maxLength={25}
                name="name"
                value={submittedData.name}
                onChange={handleChange}
                isInvalid={errors.nameError}
                // onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nameError}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-2">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                placeholder="卡號"
                value={submittedData.cardNumber}
                name="cardNumber"
                maxLength={16}
                // onChange={(e) => setCardNumber(e.target.value)}
                onChange={handleChange}
                isInvalid={errors.cardNumberError}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumberError}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-2">
            <Form.Group as={Col} md="8" controlId="validationCustom03">
              <Form.Control
                type="text"
                placeholder="MM/YY"
                required
                value={submittedData.expiry}
                name="expiry"
                maxLength={4}
                // onChange={(e) => setExpiry(e.target.value)}
                onChange={handleChange}
                isInvalid={errors.expiry}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiryError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Control
                type="text"
                placeholder="CVC"
                value={submittedData.cvc}
                name="cvc"
                maxLength={3}
                // onChange={(e) => setCvc(e.target.value)}
                onChange={handleChange}
                required
                isInvalid={errors.cvc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvcError}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button
            type="submit"
            variant="chicofgo-green"
            className={`mt-2`}
            onClick={handleSubmit}
          >
            送出
          </Button>
          <PopupWindow
            show={showModal}
            // onclose={() => setShowModal(false)}
            onclose={() => navigate('/member')}
            title="修改結果"
            content="成功修改!"
            btnContent="回到會員中心"
          />

          {/* <button
            type="submit"
            className={`btn btn-chicofgo-green btn-block mt-2`}
            onClick={handleSubmit}
          >
            送出
          </button> */}
        </div>
      </Collapse>
      {/* </form> */}
    </Form>
  );
}

export default CardForm;
